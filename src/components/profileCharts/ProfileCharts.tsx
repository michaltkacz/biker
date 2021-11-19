import React, { useEffect, useState } from 'react';
import { Card, Result, Typography } from 'antd';
import { AreaChartOutlined } from '@ant-design/icons';

import {
  FlexibleWidthXYPlot,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesPoint,
  VerticalGridLines,
  XAxis,
  YAxis,
} from 'react-vis';

import './profileCharts.less';

import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

import {
  Activity,
  ActivityCategoryTypes,
  ActivitySportTypes,
  RatingTypes,
} from '../../database/schema';
import { useMediaQuery } from 'react-responsive';

export type ProfileChartsProps = {
  activities: Activity[];
  loading: boolean;
  error: boolean;
};

const ProfileCharts: React.FC<ProfileChartsProps> = ({
  activities,
  loading,
  error,
}) => {
  const rotateLabels = useMediaQuery({
    query: '(max-width: 1400px)',
  });

  const [parsing, setParsing] = useState<boolean>(true);

  const [ratingsData, setRatingsData] = useState<Array<VerticalBarSeriesPoint>>(
    []
  );
  const [sportsData, setSportsData] = useState<Array<VerticalBarSeriesPoint>>(
    []
  );
  const [categoriesData, setCategoriesData] = useState<
    Array<VerticalBarSeriesPoint>
  >([]);

  const [tagsData, setTagsData] = useState<Array<VerticalBarSeriesPoint>>([]);

  const parseData = async () => {
    const ratingStatistics: { [key in RatingTypes]: number } = {
      terrible: 0,
      poor: 0,
      fair: 0,
      good: 0,
      excellent: 0,
    };

    const sportStatistics: { [key in ActivitySportTypes]: number } = {
      touring: 0,
      mtb: 0,
      enduro: 0,
      downhill: 0,
      gravel: 0,
      road: 0,
      bmx: 0,
      tandem: 0,
      cyclocross: 0,
      track: 0,
      speedway: 0,
      other: 0,
    };

    const categoryStatistics: { [key in ActivityCategoryTypes]: number } = {
      commute: 0,
      casual: 0,
      training: 0,
      race: 0,
      bikepacking: 0,
      other: 0,
    };

    const tagsStatistics: { [field: string]: number } = {};

    activities.forEach((a) => {
      if (a.rating) ratingStatistics[a.rating] += 1;
      if (a.sport) sportStatistics[a.sport] += 1;
      if (a.category) categoryStatistics[a.category] += 1;

      if (a.tags) {
        a.tags.forEach((tag) => {
          if (tag in tagsStatistics) {
            tagsStatistics[tag] += 1;
          } else {
            tagsStatistics[tag] = 1;
          }
        });
      }
    });

    setTagsData(
      Object.entries(tagsStatistics)
        .map(([key, value]) => {
          return { x: key, y: value };
        })
        .sort((a, b) => b.y - a.y)
    );

    setRatingsData(
      Object.entries(ratingStatistics)
        .map(([key, value]) => {
          return { x: key, y: value };
        })
        .sort((a, b) => b.y - a.y)
    );

    setSportsData(
      Object.entries(sportStatistics)
        .map(([key, value]) => {
          return { x: key, y: value };
        })
        .sort((a, b) => b.y - a.y)
    );

    setCategoriesData(
      Object.entries(categoryStatistics)
        .map(([key, value]) => {
          return { x: key, y: value };
        })
        .sort((a, b) => b.y - a.y)
    );
  };

  useEffect(() => {
    if (activities.length === 0) {
      return;
    }

    parseData().then(() => {
      setParsing(false);
    });
  }, [activities]);

  if (loading || parsing) {
    return <Result status='error' title='Something is wrong' />;
  }

  if (error) {
    return <LoadingSpinner />;
  }

  return (
    <Card
      size='small'
      title={
        <Typography.Title className='' level={5}>
          Charts <AreaChartOutlined />
        </Typography.Title>
      }
    >
      <FlexibleWidthXYPlot height={200} xType='ordinal'>
        <HorizontalGridLines />
        <XAxis title='Sport' tickLabelAngle={rotateLabels ? -70 : 0} />
        <YAxis
          title='Frequency'
          tickFormat={(value) => (Math.round(value) === value ? value : '')}
        />
        <VerticalBarSeries
          fill='#36cfc999'
          stroke='#36cfc9aa'
          barWidth={1.0}
          data={sportsData}
        />
      </FlexibleWidthXYPlot>
      <FlexibleWidthXYPlot height={200} xType='ordinal'>
        <HorizontalGridLines />
        <XAxis title='Category' tickLabelAngle={rotateLabels ? -70 : 0} />
        <YAxis
          title='Frequency'
          tickFormat={(value) => (Math.round(value) === value ? value : '')}
        />
        <VerticalBarSeries
          fill='#597ef799'
          stroke='#597ef7aa'
          barWidth={1.0}
          data={categoriesData}
        />
      </FlexibleWidthXYPlot>
      <FlexibleWidthXYPlot height={200} xType='ordinal'>
        <HorizontalGridLines />
        <XAxis title='Rating' tickLabelAngle={rotateLabels ? -70 : 0} />
        <YAxis
          title='Frequency'
          tickFormat={(value) => (Math.round(value) === value ? value : '')}
        />
        <VerticalBarSeries
          fill='#9254de99'
          stroke='#9254deaa'
          barWidth={1.0}
          data={ratingsData}
        />
      </FlexibleWidthXYPlot>
      <FlexibleWidthXYPlot height={200} xType='ordinal'>
        <HorizontalGridLines />
        <XAxis title='Tag' tickLabelAngle={rotateLabels ? -70 : 0} />
        <YAxis
          title='Frequency'
          tickFormat={(value) => (Math.round(value) === value ? value : '')}
        />
        <VerticalBarSeries
          fill='#f759ab99'
          stroke='#f759abaa'
          barWidth={1.0}
          data={tagsData}
        />
      </FlexibleWidthXYPlot>
    </Card>
  );
};

export default ProfileCharts;

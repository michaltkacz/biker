import React, { useEffect, useState } from 'react';
import { Card, Result, Typography } from 'antd';
import { AreaChartOutlined } from '@ant-design/icons';

import {
  FlexibleWidthXYPlot,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesPoint,
  HorizontalBarSeries,
  HorizontalBarSeriesPoint,
  XAxis,
  YAxis,
  DiscreteColorLegend,
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
  const [dates, setDates] = useState<Array<string>>([]);

  const [sportsData, setSportsData] = useState<Array<VerticalBarSeriesPoint>>(
    []
  );
  const [categoriesData, setCategoriesData] = useState<
    Array<VerticalBarSeriesPoint>
  >([]);
  const [ratingsData, setRatingsData] = useState<Array<VerticalBarSeriesPoint>>(
    []
  );

  const [tagsData, setTagsData] = useState<Array<VerticalBarSeriesPoint>>([]);

  const [loopsData, setLoopsData] = useState<Array<HorizontalBarSeriesPoint>>(
    []
  );

  const [distanceData, setDistanceData] = useState<
    Array<VerticalBarSeriesPoint>
  >([]);

  const [inMotionDurationData, setInMotionDurationData] = useState<
    Array<VerticalBarSeriesPoint>
  >([]);

  const [totalDurationData, setTotalDurationData] = useState<
    Array<VerticalBarSeriesPoint>
  >([]);

  const [elevationUpData, setElevationUpData] = useState<
    Array<VerticalBarSeriesPoint>
  >([]);

  const [elevationDownData, setElevationDownData] = useState<
    Array<VerticalBarSeriesPoint>
  >([]);

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
    const distanceStatistics: { [field: string]: number } = {};
    const inMotionDurationStatistics: { [field: string]: number } = {};
    const totalDurationStatistics: { [field: string]: number } = {};
    const elevaitonUpStatistics: { [field: string]: number } = {};
    const elevaitonDownStatistics: { [field: string]: number } = {};

    const newDates: Array<string> = [];
    for (let i = 0; i < 31; i++) {
      const date = Date.now() - i * 24 * 60 * 60 * 1000;
      const dateString = new Date(date).toDateString().substr(0, 15);
      newDates.push(dateString);
      distanceStatistics[dateString] = 0;
      inMotionDurationStatistics[dateString] = 0;
      totalDurationStatistics[dateString] = 0;
      elevaitonUpStatistics[dateString] = 0;
      elevaitonDownStatistics[dateString] = 0;
    }

    setDates(newDates);

    const shapeStatistics: {
      isLoop: number;
      isNotLoop: number;
    } = {
      isLoop: 0,
      isNotLoop: 0,
    };

    activities.forEach((a) => {
      if (a.rating) ratingStatistics[a.rating] += 1;

      sportStatistics[a.sport] += 1;
      categoryStatistics[a.category] += 1;

      a.shape.isLoop
        ? (shapeStatistics.isLoop += 1)
        : (shapeStatistics.isNotLoop += 1);

      if (a.tags) {
        a.tags.forEach((tag) => {
          if (tag in tagsStatistics) {
            tagsStatistics[tag] += 1;
          } else {
            tagsStatistics[tag] = 1;
          }
        });
      }

      const aDate = new Date(a.createdAt).toDateString().substr(0, 15);
      const aStats = a.statistics;

      if (aStats.totalDistance && aDate in distanceStatistics) {
        distanceStatistics[aDate] += aStats.totalDistance;
      }

      if (aStats.inMotionDuration && aDate in inMotionDurationStatistics) {
        inMotionDurationStatistics[aDate] += aStats.inMotionDuration;
      }

      if (aStats.totalDuration && aDate in totalDurationStatistics) {
        totalDurationStatistics[aDate] += aStats.totalDuration;
      }

      if (aStats.elevationUp && aDate in elevaitonUpStatistics) {
        elevaitonUpStatistics[aDate] += aStats.elevationUp;
      }
      if (aStats.elevationDown && aDate in elevaitonDownStatistics) {
        elevaitonDownStatistics[aDate] += aStats.elevationDown;
      }
    });

    setDistanceData(
      Object.entries(distanceStatistics).map(([key, value]) => {
        return { x: key, y: value };
      })
    );

    setInMotionDurationData(
      Object.entries(inMotionDurationStatistics).map(([key, value]) => {
        return { x: key, y: value };
      })
    );

    setTotalDurationData(
      Object.entries(totalDurationStatistics).map(([key, value]) => {
        return { x: key, y: value };
      })
    );

    setElevationUpData(
      Object.entries(elevaitonUpStatistics).map(([key, value]) => {
        return { x: key, y: value };
      })
    );

    setElevationDownData(
      Object.entries(elevaitonDownStatistics).map(([key, value]) => {
        return { x: key, y: value };
      })
    );

    setLoopsData([
      { y: 'loop', x: shapeStatistics.isLoop },
      { y: 'way', x: shapeStatistics.isNotLoop },
    ]);

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
        <Typography.Title level={5}>
          Charts <AreaChartOutlined />
        </Typography.Title>
      }
    >
      <Typography.Title level={3}>Last Month</Typography.Title>
      <Typography.Title level={4}>Daily Distance</Typography.Title>
      <FlexibleWidthXYPlot
        height={300}
        margin={{ bottom: 100 }}
        xType='ordinal'
      >
        <HorizontalGridLines />
        <XAxis
          tickLabelAngle={-70}
          tickFormat={(value: string) => {
            const index = dates.indexOf(value);
            if (index % 3 === 0) {
              return value;
            }
            return '';
          }}
        />
        <YAxis
          title='Distance [km]'
          tickFormat={(value) => {
            return (value / 1000).toFixed(0).toString();
          }}
        />
        <VerticalBarSeries
          fill='#a0d91199'
          stroke='#a0d911aa'
          barWidth={0.95}
          data={distanceData}
        />
      </FlexibleWidthXYPlot>
      <Typography.Title level={4}>Daily Duration</Typography.Title>
      <DiscreteColorLegend
        items={[
          { title: 'Total Duraiton', color: '#fa541c' },
          { title: 'In Motion Duraiton', color: '#fa8c16' },
        ]}
        orientation='horizontal'
      />
      <FlexibleWidthXYPlot
        height={300}
        margin={{ bottom: 100 }}
        xType='ordinal'
      >
        <HorizontalGridLines />
        <XAxis
          tickLabelAngle={-70}
          tickFormat={(value: string) => {
            const index = dates.indexOf(value);
            if (index % 3 === 0) {
              return value;
            }
            return '';
          }}
        />
        <YAxis
          title='Duration [h]'
          tickFormat={(value) => {
            const hours = value / 1000 / 60 / 60;
            return hours.toFixed(2).toString();
          }}
        />
        <VerticalBarSeries
          fill='#fa541c99'
          stroke='#fa541caa'
          barWidth={0.95}
          data={totalDurationData}
        />
        <VerticalBarSeries
          fill='#fa8c1699'
          stroke='#fa8c16aa'
          barWidth={0.95}
          data={inMotionDurationData}
        />
      </FlexibleWidthXYPlot>
      <Typography.Title level={4}>Daily Elevation</Typography.Title>
      <DiscreteColorLegend
        items={[
          { title: 'Elevation Up', color: '#faad14' },
          { title: 'Elevation Down', color: '#fadb14' },
        ]}
        orientation='horizontal'
      />
      <FlexibleWidthXYPlot
        height={300}
        margin={{ bottom: 100 }}
        xType='ordinal'
      >
        <HorizontalGridLines />
        <XAxis
          tickLabelAngle={-70}
          tickFormat={(value: string) => {
            const index = dates.indexOf(value);
            if (index % 3 === 0) {
              return value;
            }
            return '';
          }}
        />
        <YAxis title='Elevation [m]' />

        <VerticalBarSeries
          fill='#faad1499'
          stroke='#faad14aa'
          barWidth={0.95}
          data={elevationUpData}
        />
        <VerticalBarSeries
          fill='#fadb1499'
          stroke='#fadb14aa'
          barWidth={0.95}
          data={elevationDownData}
        />
      </FlexibleWidthXYPlot>
      <Typography.Title level={3}>General</Typography.Title>
      <Typography.Title level={4}>Favourite Sports</Typography.Title>
      <FlexibleWidthXYPlot
        height={300}
        margin={{ bottom: 100 }}
        xType='ordinal'
      >
        <HorizontalGridLines />
        <XAxis tickLabelAngle={rotateLabels ? -70 : 0} />
        <YAxis
          tickFormat={(value) => (Math.round(value) === value ? value : '')}
        />
        <VerticalBarSeries
          fill='#13c2c299'
          stroke='#13c2c2aa'
          barWidth={0.95}
          data={sportsData}
        />
      </FlexibleWidthXYPlot>
      <Typography.Title level={4}>Favourite Categories</Typography.Title>
      <FlexibleWidthXYPlot
        height={300}
        margin={{ bottom: 100 }}
        xType='ordinal'
      >
        <HorizontalGridLines />
        <XAxis tickLabelAngle={rotateLabels ? -70 : 0} />
        <YAxis
          tickFormat={(value) => (Math.round(value) === value ? value : '')}
        />
        <VerticalBarSeries
          fill='#1890ff99'
          stroke='#1890ffaa'
          barWidth={0.95}
          data={categoriesData}
        />
      </FlexibleWidthXYPlot>
      <Typography.Title level={4}>Activities Ratings</Typography.Title>
      <FlexibleWidthXYPlot
        height={300}
        margin={{ bottom: 100 }}
        xType='ordinal'
      >
        <HorizontalGridLines />
        <XAxis tickLabelAngle={rotateLabels ? -70 : 0} />
        <YAxis
          tickFormat={(value) => (Math.round(value) === value ? value : '')}
        />
        <VerticalBarSeries
          fill='#2f54eb99'
          stroke='#2f54ebaa'
          barWidth={0.95}
          data={ratingsData}
        />
      </FlexibleWidthXYPlot>
      <Typography.Title level={4}>Most Used Tags</Typography.Title>
      <FlexibleWidthXYPlot
        height={300}
        margin={{ bottom: 100 }}
        xType='ordinal'
      >
        <HorizontalGridLines />
        <XAxis tickLabelAngle={rotateLabels ? -70 : 0} />
        <YAxis
          tickFormat={(value) => (Math.round(value) === value ? value : '')}
        />
        <VerticalBarSeries
          fill='#722ed199'
          stroke='#722ed1aa'
          barWidth={0.95}
          data={tagsData}
        />
      </FlexibleWidthXYPlot>
      <Typography.Title level={4}>Activities Shapes</Typography.Title>
      <FlexibleWidthXYPlot
        height={300}
        margin={{ bottom: 100 }}
        yType='ordinal'
      >
        <HorizontalGridLines />
        <XAxis
          tickFormat={(value) => (Math.round(value) === value ? value : '')}
        />
        <YAxis />
        <HorizontalBarSeries
          fill='#eb2f9699'
          stroke='#eb2f96aa'
          barWidth={0.5}
          data={loopsData}
        />
      </FlexibleWidthXYPlot>
    </Card>
  );
};

export default ProfileCharts;

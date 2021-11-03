import { Card, Col, Row, Tag, Typography, Popconfirm, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';

import {
  ArrowRightOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  DoubleRightOutlined,
  FallOutlined,
  HistoryOutlined,
  RiseOutlined,
  StockOutlined,
  SwapOutlined,
  VerticalLeftOutlined,
} from '@ant-design/icons';

import './activity.less';

import {
  formatAverageSpeedValue,
  formatDateValue,
  formatDistanceValue,
  formatDurationValue,
  formatSpeedValue,
  validateValue,
} from '../../global/statisiticsFormatters';

import {
  Activity as ActivityType,
  ActivityCategoryTypes,
  ActivityShape,
  ActivitySportTypes,
  RatingTypes,
} from '../../database/schema';

import Map from '../map/Map';
import MapCanvas from '../mapCanvas/MapCanvas';

import useActivityStatistics from '../../hooks/useActivityStatistics';

export type ActivityProps = {
  activity: ActivityType;
};

const Activity: React.FC<ActivityProps> = ({ activity }) => {
  const statistics = useActivityStatistics(activity.track);

  const [name, setName] = useState<string>(activity.name);
  const [lastModifiedAt, setLastModifiedAt] = useState(activity.lastModifiedAt);
  const [sport, setSport] = useState<ActivitySportTypes | null>(activity.sport);
  const [category, setCategory] = useState<ActivityCategoryTypes | null>(
    activity.category
  );
  const [shape, setShape] = useState<ActivityShape | null>(activity.shape);
  const [rating, setRating] = useState<RatingTypes | null>(activity.rating);
  const [tags, setTags] = useState<Array<string> | null>(activity.tags);

  // useEffect(() => {
  //   console.log(activity);
  // }, [activity]);

  const deleteActivity = () => {
    //todo delete this...
  };

  return (
    <Card
      className='activity'
      title={
        <div>
          <div className='header-tags'>
            {tags?.map((tag, index) => (
              <Tag
                closable
                onClose={() => {
                  const newTags = [...tags];
                  newTags.splice(index, 0);
                  setTags(newTags);
                }}
              >
                {tag}
              </Tag>
            ))}
          </div>
          <Typography.Title
            level={4}
            className='header-name'
            editable={{
              onChange: setName,
            }}
          >
            {name}
          </Typography.Title>
          <Typography.Paragraph type='secondary' className='header-date'>
            <CalendarOutlined />
            {` ${formatDateValue(activity.createdAt)}`}
          </Typography.Paragraph>
        </div>
      }
      extra={
        <Popconfirm
          placement='bottomRight'
          title='Do you want to delete this activity?'
          onConfirm={deleteActivity}
          okText='Yes'
          cancelText='No'
        >
          <DeleteOutlined style={{ fontSize: '1.5em' }} />
        </Popconfirm>
      }
    >
      <Row gutter={[{ xs: 4, sm: 8, md: 16, lg: 24 }, 16]}>
        <Col xs={24} lg={16} style={{ minHeight: 400 }}>
          <MapCanvas
            render={(height) => (
              <Map
                height={height}
                track={activity.track}
                position={{
                  lat: activity.track[0][0].lat,
                  lon: activity.track[0][0].lon,
                }}
                followPosition={false}
                panToPosition={true}
              />
            )}
          />
        </Col>
        <Col xs={24} lg={8}>
          <Statistic
            title='Distance'
            value={formatDistanceValue(statistics.totalDistance)}
            prefix={<ArrowRightOutlined />}
            suffix='km'
            precision={1}
          />
          <Statistic
            title='In Motion Time'
            value={formatDurationValue(statistics.inMotionDuration)}
            prefix={<HistoryOutlined />}
          />
          <Statistic
            title='Total Time'
            value={formatDurationValue(statistics.totalDuration)}
            prefix={<ClockCircleOutlined />}
          />
          <Statistic
            title='Average Speed'
            value={formatAverageSpeedValue(
              statistics.totalDistance,
              statistics.inMotionDuration
            )}
            prefix={<SwapOutlined />}
            suffix='km/h'
            precision={1}
          />
          <Statistic
            title='Max Speed'
            value={formatSpeedValue(statistics.maxSpeed)}
            prefix={<VerticalLeftOutlined />}
            suffix='km/h'
            precision={1}
          />
          <Statistic
            title='Elevation Up'
            value={validateValue(statistics.elevationUp)}
            prefix={<RiseOutlined />}
            suffix='m'
            precision={0}
          />
          <Statistic
            title='Elevation Down'
            value={validateValue(statistics.elevationDown)}
            prefix={<FallOutlined />}
            suffix='m'
            precision={0}
          />
          <Statistic
            title='Last Modified'
            value={formatDateValue(lastModifiedAt)}
            prefix={<CalendarOutlined />}
          />
        </Col>
        <Col xs={24}></Col>
      </Row>
    </Card>
  );
};

export default Activity;

import React, { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Row,
  Tag,
  Typography,
  Popconfirm,
  Statistic,
  Rate,
  Switch,
  Select,
} from 'antd';

import { v4 as uuidv4 } from 'uuid';

import {
  ArrowRightOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  FallOutlined,
  HistoryOutlined,
  RiseOutlined,
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
  const [sport, setSport] = useState<ActivitySportTypes>(
    activity.sport || ActivitySportTypes.Other
  );
  const [category, setCategory] = useState<ActivityCategoryTypes>(
    activity.category || ActivityCategoryTypes.Casual
  );
  const [shape, setShape] = useState<ActivityShape>(
    activity.shape || { isLoop: false, from: 'unknown', to: 'unknown' }
  );
  const [rating, setRating] = useState<RatingTypes | null>(activity.rating);
  const [tags, setTags] = useState<Array<string> | null>(activity.tags);

  const [lastModifiedAt, setLastModifiedAt] = useState(activity.lastModifiedAt);

  useEffect(() => {
    setLastModifiedAt(Date.now());
  }, [name, sport, category, shape, rating, tags]);

  const deleteActivity = () => {
    //todo delete this...
  };

  return (
    <Card
      className='activity'
      title={
        <div className='header'>
          <div>
            <div className='header-tags'>
              {tags?.map((tag, index) => (
                <Tag
                  key={uuidv4()}
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
            <Rate
              tooltips={Object.values(RatingTypes)}
              onChange={(value) => {
                value === 0
                  ? setRating(null)
                  : setRating(Object.values(RatingTypes)[value]);
              }}
              style={{ display: 'block' }}
            />
            <Typography.Text type='secondary'>Sport</Typography.Text>
            <Select
              defaultValue={sport}
              style={{ width: '100%', maxWidth: 120 }}
              onChange={(value) => setSport(value)}
            >
              {Object.values(ActivitySportTypes).map((type) => (
                <Select.Option key={uuidv4()} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
            <Typography.Text type='secondary'>Category</Typography.Text>
            <Select
              defaultValue={category}
              style={{ width: '100%', maxWidth: 120 }}
              onChange={(value) => setCategory(value)}
            >
              {Object.values(ActivityCategoryTypes).map((type) => (
                <Select.Option key={uuidv4()} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div>
            <Typography.Text type='secondary'>Loop </Typography.Text>
            <Switch
              onChange={(checked) => setShape({ ...shape, isLoop: checked })}
            />
            <Row gutter={[4, 4]}>
              <Col xs={12}>
                <Typography.Text style={{ display: 'block' }} type='secondary'>
                  Start
                </Typography.Text>
                <Typography.Text
                  editable={{
                    onChange: (value) => setShape({ ...shape, from: value }),
                  }}
                >
                  {shape?.from || 'unknown'}
                </Typography.Text>
              </Col>
              {shape.isLoop && (
                <Col xs={12}>
                  <Typography.Text
                    style={{ display: 'block' }}
                    type='secondary'
                  >
                    End
                  </Typography.Text>
                  <Typography.Text
                    editable={{
                      maxLength: 100,
                      onChange: (value) => setShape({ ...shape, to: value }),
                    }}
                  >
                    {shape.to || 'unknown'}
                  </Typography.Text>
                </Col>
              )}
            </Row>
          </div>
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
        <Col xs={24} md={18} style={{ minHeight: 400 }}>
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
        <Col xs={24} md={6}>
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
            title='Average Speed (Motion Time)'
            value={formatAverageSpeedValue(
              statistics.totalDistance,
              statistics.inMotionDuration
            )}
            prefix={<SwapOutlined />}
            suffix='km/h'
            precision={1}
          />
          <Statistic
            title='Average Speed (Total Time)'
            value={formatAverageSpeedValue(
              statistics.totalDistance,
              statistics.totalDuration
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
      </Row>
    </Card>
  );
};

export default Activity;

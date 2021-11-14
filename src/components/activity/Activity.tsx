import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Rate, Popconfirm, Button, message } from 'antd';

import {
  CheckOutlined,
  ConsoleSqlOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import './activity.less';

import {
  Activity as ActivityType,
  ActivityCategoryTypes,
  ActivityShape,
  ActivitySportTypes,
  ActivityUpdate,
  RatingTypes,
} from '../../database/schema';

import Map from '../map/Map';
import MapCanvas from '../mapCanvas/MapCanvas';
import TagList from '../tagList/TagList';

import ActivityStatisticsDashboard from '../activityStatisticsDashboard/ActivityStatisticsDashboard';
import ActivityTitle from '../activityTitle/ActivityTitle';
import LabeledEnumSelect from '../labeledEnumSelect/LabeledEnumSelect';
import ActivityShaper from '../activityShaper/ActivityShaper';
import ActivityCharts from '../activityCharts/ActivityCharts';
import {
  useDeleteActivity,
  useUpdateActivity,
} from '../../firebase/hooks/useActivities';

export type ActivityProps = {
  activity: ActivityType;
};

const ActivityNotUpdated: ActivityUpdate = {
  name: false,
  sport: false,
  category: false,
  shape: false,
  rating: false,
  tags: false,
};

const Activity: React.FC<ActivityProps> = ({ activity }) => {
  const deleteActivity = useDeleteActivity();
  const updateActivity = useUpdateActivity();

  // const [firstRender, setFirstRender] = useState<boolean>(true);
  const [activityModified, setActivityModified] = useState<boolean>(false);

  const [name, setName] = useState<string>(activity.name);
  const [sport, setSport] = useState<ActivitySportTypes>(activity.sport);
  const [category, setCategory] = useState<ActivityCategoryTypes>(
    activity.category
  );
  const [shape, setShape] = useState<ActivityShape>(activity.shape);
  const [rating, setRating] = useState<RatingTypes | undefined>(
    activity.rating
  );
  const [tags, setTags] = useState<Array<string> | undefined>(activity.tags);

  const [updates, setUpdates] = useState<ActivityUpdate>(ActivityNotUpdated);

  useEffect(() => {
    const isModified = Object.values(updates).includes(true);
    setActivityModified(isModified);

    //   forEach((value) => {
    //   if (value) {
    //     setActivityModified(true);
    //     return;
    //   }
    // });
  }, [updates]);

  const onDeleteActivity = () => {
    deleteActivity(activity.activityId);
    message.success('Activity deleted');
  };

  const onEditActivity = () => {
    const payload: { [filed: string]: any } = {};
    payload['/lastModifiedAt'] = Date.now();

    updates.name && (payload['/name'] = name);
    updates.sport && (payload['/sport'] = sport);
    updates.category && (payload['/category'] = category);
    updates.shape && (payload['/shape'] = shape);
    updates.rating && (payload['/rating'] = rating || null);
    updates.tags && (payload['/tags'] = tags || null);

    updateActivity(activity.activityId, payload);
    message.success('Activity updated');

    setUpdates(ActivityNotUpdated);
    setActivityModified(false);
  };

  const ActivityHeader = (
    <div className='header'>
      <div className='first-row'>
        <Rate
          tooltips={Object.values(RatingTypes)}
          defaultValue={
            rating ? Object.values(RatingTypes).indexOf(rating) + 1 : 0
          }
          onChange={(value) => {
            console.log(value);
            value === 0
              ? setRating(undefined)
              : setRating(Object.values(RatingTypes)[value - 1]);
            setUpdates({ ...updates, rating: true });
          }}
          className='rating'
        />
        <TagList
          tags={tags}
          onTagsChange={(newTags) => {
            setTags(newTags);
            setUpdates({ ...updates, tags: true });
          }}
        />
        <ActivityTitle
          name={name}
          createdAt={activity.createdAt}
          lastModifiedAt={activity.lastModifiedAt}
          onNameChange={(newName) => {
            setName(newName);
            setUpdates({ ...updates, name: true });
          }}
        />
      </div>
      <div className='second-row'>
        <LabeledEnumSelect
          label='Sport'
          onChange={(value) => {
            setSport(value);
            setUpdates({ ...updates, sport: true });
          }}
          values={Object.values(ActivitySportTypes)}
          defaultValue={sport}
        />
        <LabeledEnumSelect
          label='Category'
          onChange={(value) => {
            setCategory(value);
            setUpdates({ ...updates, category: true });
          }}
          values={Object.values(ActivityCategoryTypes)}
          defaultValue={category}
        />
        <ActivityShaper
          shape={shape}
          onChange={(newShape) => {
            setShape(newShape);
            setUpdates({ ...updates, shape: true });
          }}
        />
      </div>
    </div>
  );

  const ActionConfirmEdit = (
    <Button
      block
      type='primary'
      disabled={!activityModified}
      onClick={onEditActivity}
      className='action-button'
    >
      Confirm Changes
      <CheckOutlined
        className='action-button-icon'
        style={{ marginLeft: '0.5em' }}
      />
    </Button>
  );

  const ActionDelete = (
    <Popconfirm
      title='Do you want to delete this activity?'
      onConfirm={onDeleteActivity}
      okText='Yes'
      cancelText='No'
    >
      <Button block danger type='primary' className='action-button'>
        Delete Activity
        <DeleteOutlined className='action-button-icon' />
      </Button>
    </Popconfirm>
  );

  return (
    <Card className='activity' title={ActivityHeader} size='small'>
      <Row gutter={[4, 4]}></Row>
      <Row gutter={[{ xs: 0, sm: 16 }, 16]}>
        <Col xs={12}>{ActionDelete}</Col>
        <Col xs={12}>{ActionConfirmEdit}</Col>
        <Col xs={24} md={16} xl={16} xxl={18} style={{ minHeight: 400 }}>
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
        <Col xs={24} md={8} xl={8} xxl={6}>
          <ActivityStatisticsDashboard {...activity.statistics} />
        </Col>
        <Col xs={24}>
          <ActivityCharts track={activity.track} />
        </Col>
      </Row>
    </Card>
  );
};

export default Activity;

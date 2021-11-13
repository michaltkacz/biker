import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Rate, Popconfirm, Button } from 'antd';

import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';

import './activity.less';

import {
  Activity as ActivityType,
  ActivityCategoryTypes,
  ActivityShape,
  ActivitySportTypes,
  RatingTypes,
} from '../../database/schema';

import Map from '../map/Map';
import MapCanvas from '../mapCanvas/MapCanvas';
import TagList from '../tagList/TagList';

import useActivityStatistics from '../../hooks/useActivityStatistics';
import ActivityStatisticsDashboard from '../activityStatisticsDashboard/ActivityStatisticsDashboard';
import ActivityTitle from '../activityTitle/ActivityTitle';
import LabeledEnumSelect from '../labeledEnumSelect/LabeledEnumSelect';
import ActivityShaper from '../activityShaper/ActivityShaper';
import ActivityCharts from '../activityCharts/ActivityCharts';
import {
  useDeleteActivity,
  useEditActivity,
} from '../../firebase/hooks/useActivities';

export type ActivityProps = {
  activity: ActivityType;
};

const Activity: React.FC<ActivityProps> = ({ activity }) => {
  const deleteActivity = useDeleteActivity();
  const statistics = useActivityStatistics(activity.track);

  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [activityModified, setActivityModified] = useState<boolean>(false);

  const [name, setName] = useState<string>(activity.name);
  const [sport, setSport] = useState<ActivitySportTypes>(
    activity.sport || ActivitySportTypes.Other
  );
  const [category, setCategory] = useState<ActivityCategoryTypes>(
    activity.category || ActivityCategoryTypes.Other
  );
  const [shape, setShape] = useState<ActivityShape>(
    activity.shape || { isLoop: false, from: 'unknown', to: 'unknown' }
  );
  const [rating, setRating] = useState<RatingTypes | undefined>(
    activity.rating
  );
  const [tags, setTags] = useState<Array<string> | undefined>(activity.tags);

  useEffect(() => {
    if (!firstRender) {
      setActivityModified(true);
    } else {
      setFirstRender(false);
    }
  }, [name, sport, category, shape, rating, tags]);

  const onDeleteActivity = () => {
    deleteActivity(activity.activityId);
  };

  const onEditActivity = () => {
    console.log('edit');
    setActivityModified(false);
    //todo edit this...
  };

  const ActivityHeader = (
    <div className='header'>
      <div className='first-row'>
        <Rate
          tooltips={Object.values(RatingTypes)}
          onChange={(value) => {
            value === 0
              ? setRating(undefined)
              : setRating(Object.values(RatingTypes)[value]);
          }}
          className='rating'
        />
        <TagList tags={tags} onTagsChange={(newTags) => setTags(newTags)} />
        <ActivityTitle
          name={name}
          createdAt={activity.createdAt}
          lastModifiedAt={activity.lastModifiedAt}
          onNameChange={(newName) => setName(newName)}
        />
      </div>
      <div className='second-row'>
        <LabeledEnumSelect
          label='Sport'
          onChange={(value) => {
            setSport(value);
          }}
          values={Object.values(ActivitySportTypes)}
          defaultValue={sport}
        />
        <LabeledEnumSelect
          label='Category'
          onChange={(value) => {
            setCategory(value);
          }}
          values={Object.values(ActivityCategoryTypes)}
          defaultValue={category}
        />
        <ActivityShaper
          shape={shape}
          onChange={(newShape) => setShape(newShape)}
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
          <ActivityStatisticsDashboard {...statistics} />
        </Col>
        <Col xs={24}>
          <ActivityCharts track={activity.track} />
        </Col>
      </Row>
    </Card>
  );
};

export default Activity;

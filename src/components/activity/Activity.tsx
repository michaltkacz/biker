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
import TagList from '../TagList/TagList';

import useActivityStatistics from '../../hooks/useActivityStatistics';
import ActivityStatisticsDashboard from '../activityStatisticsDashboard/ActivityStatisticsDashboard';
import ActivityTitle from '../activityTitle/ActivityTitle';
import LabeledEnumSelect from '../labeledEnumSelect/LabeledEnumSelect';
import { ActivityShaper } from '../activityShaper/ActivityShaper';

export type ActivityProps = {
  activity: ActivityType;
};

const Activity: React.FC<ActivityProps> = ({ activity }) => {
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
  const [rating, setRating] = useState<RatingTypes | null>(activity.rating);
  const [tags, setTags] = useState<Array<string> | null>(activity.tags);

  useEffect(() => {
    // setActivity({...activity, name, sport, category, shape, rating, tags, lastModifiedAt: Date.now()});
    if (!firstRender) {
      setActivityModified(true);
    } else {
      setFirstRender(false);
    }
  }, [name, sport, category, shape, rating, tags]);

  useEffect(() => {
    console.log(activityModified);
  }, [activityModified]);

  const onDeleteActivity = () => {
    console.log('delete');
    //todo delete this...
  };

  const onConfirmEdit = () => {
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
              ? setRating(null)
              : setRating(Object.values(RatingTypes)[value]);
          }}
          style={{ padding: '4px 8px 4px 0px' }}
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
    <Button block disabled={!activityModified} onClick={onConfirmEdit}>
      Confirm Changes
      <CheckOutlined style={{ marginLeft: '0.5em' }} />
    </Button>
  );

  const ActionDelete = (
    <Popconfirm
      title='Do you want to delete this activity?'
      onConfirm={onDeleteActivity}
      okText='Yes'
      cancelText='No'
    >
      <Button block danger>
        Delete Activity
        <DeleteOutlined style={{ marginLeft: '0.5em' }} />
      </Button>
    </Popconfirm>
  );

  return (
    <Card
      className='activity'
      title={ActivityHeader}
      size='small'
      actions={[ActionDelete, ActionConfirmEdit]}
    >
      <Row gutter={[{ xs: 0, sm: 16 }, 16]}>
        <Col xs={24} md={16} style={{ minHeight: 400 }}>
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
        <Col xs={24} md={8}>
          <ActivityStatisticsDashboard {...statistics} />
        </Col>
      </Row>
    </Card>
  );
};

export default Activity;

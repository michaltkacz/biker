import React, { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Row,
  Rate,
  Popconfirm,
  Button,
  message,
  Result,
} from 'antd';

import {
  CheckOutlined,
  DeleteOutlined,
  DownloadOutlined,
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

import ActivityDashboard from '../activityDashboard/ActivityDashboard';
import ActivityTitle from '../activityTitle/ActivityTitle';
import EnumSelect from '../enumSelect/EnumSelect';
import ActivityShaper from '../activityShaper/ActivityShaper';
import ActivityCharts from '../activityCharts/ActivityCharts';
import WithLabel from '../withLabel/WithLabel';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

import {
  useReadTrack,
  deleteActivityWithTrack,
  updateActivity,
} from '../../firebase/hooks/useDatabase';
import { useAuth } from '../../firebase/hooks/useAuth';
import { buildGpxAndSaveFile } from '../../global/gpxBuilder';

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
  const { currentUserId } = useAuth();
  const {
    track,
    loading: trackLoading,
    error: trackError,
  } = useReadTrack(currentUserId, activity.activityId);

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
  }, [updates]);

  const onDeleteActivity = () => {
    deleteActivityWithTrack(currentUserId, activity.activityId)
      .then(() => {
        message.success('Activity deleted');
      })
      .catch(() => {
        message.error("Activity coludn't be deleted");
      });
  };

  const onUpdateActivity = () => {
    const payload: { [filed: string]: any } = {};
    payload['/lastModifiedAt'] = Date.now();

    updates.name && (payload['/name'] = name);
    updates.sport && (payload['/sport'] = sport);
    updates.category && (payload['/category'] = category);
    updates.shape && (payload['/shape'] = shape);
    updates.rating && (payload['/rating'] = rating || null);
    updates.tags && (payload['/tags'] = tags || null);

    updateActivity(currentUserId, activity.activityId, payload)
      .then(() => {
        message.success('Activity updated');
      })
      .catch(() => {
        message.error("Activity coludn't be updated");
      });

    setUpdates(ActivityNotUpdated);
    setActivityModified(false);
  };

  const onExportActivity = () => {
    if (!track) {
      message.error("Activity coludn't be exported");
      return;
    }

    buildGpxAndSaveFile(track, activity.name);
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
        <WithLabel label='Sport'>
          <EnumSelect
            onChange={(value) => {
              setSport(value);
              setUpdates({ ...updates, sport: true });
            }}
            values={Object.values(ActivitySportTypes)}
            defaultValue={sport}
            editable
          />
        </WithLabel>
        <WithLabel label='Category'>
          <EnumSelect
            onChange={(value) => {
              setCategory(value);
              setUpdates({ ...updates, category: true });
            }}
            values={Object.values(ActivityCategoryTypes)}
            defaultValue={category}
            editable
          />
        </WithLabel>
        <ActivityShaper
          shape={shape}
          onChange={(newShape) => {
            setShape(newShape);
            setUpdates({ ...updates, shape: true });
          }}
        />
        <div className='action-buttons'>
          <Popconfirm
            title='Do you want to delete this activity?'
            onConfirm={onDeleteActivity}
            okText='Yes'
            cancelText='No'
          >
            <Button type='text' size='small'>
              Delete
              <DeleteOutlined />
            </Button>
          </Popconfirm>
          <Button type='text' size='small' onClick={onExportActivity}>
            Export GPX
            <DownloadOutlined />
          </Button>
          <Button
            type='primary'
            size='small'
            disabled={!activityModified}
            onClick={onUpdateActivity}
          >
            Update
            <CheckOutlined />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Card className='activity' title={ActivityHeader} size='small'>
      {trackLoading && <LoadingSpinner />}
      {trackError && <Result status='error' title='Something has gone wrong' />}
      <Row
        gutter={[
          { xs: 0, sm: 8, md: 16, lg: 24, xxl: 32 },
          { xs: 0, sm: 8, md: 16, lg: 24, xxl: 32 },
        ]}
      >
        {track && (
          <>
            <Col xs={24} lg={15} xxl={18} style={{ minHeight: 400 }}>
              <MapCanvas
                render={(height) => (
                  <Map
                    height={height}
                    track={track}
                    position={{
                      lat: track.segments[0][0].lat,
                      lon: track.segments[0][0].lon,
                    }}
                    followPosition={false}
                    panToPosition={true}
                  />
                )}
              />
            </Col>
            <Col xs={24} lg={9} xxl={6}>
              <ActivityDashboard
                {...activity.statistics}
                startTime={activity.startTime}
                endTime={activity.endTime}
              />
            </Col>
            <Col xs={24}>
              <ActivityCharts track={track} />
            </Col>
          </>
        )}
      </Row>
    </Card>
  );
};

export default Activity;

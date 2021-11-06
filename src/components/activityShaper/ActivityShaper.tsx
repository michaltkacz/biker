import React from 'react';
import { Switch, Typography } from 'antd';

import { ActivityShape } from '../../database/schema';

import './activityShaper.less';

export type ActivityShaperProps = {
  shape: ActivityShape;
  onChange: (newShape: ActivityShape) => void;
};

const ActivityShaper: React.FC<ActivityShaperProps> = ({ shape, onChange }) => {
  return (
    <div className='activity-shaper'>
      <div>
        <Typography.Text type='secondary'>Loop </Typography.Text>
        <Switch
          onChange={(checked) => onChange({ ...shape, isLoop: checked })}
        />
      </div>
      <div>
        <Typography.Text className='activity-shaper-label' type='secondary'>
          Start
        </Typography.Text>
        <Typography.Text
          editable={{
            onChange: (value) => onChange({ ...shape, from: value }),
          }}
        >
          {shape?.from || '---'}
        </Typography.Text>
      </div>
      {!shape.isLoop && (
        <div>
          <Typography.Text className='activity-shaper-label' type='secondary'>
            End
          </Typography.Text>
          <Typography.Text
            editable={{
              maxLength: 100,
              onChange: (value) => onChange({ ...shape, to: value }),
            }}
          >
            {shape.to || '---'}
          </Typography.Text>
        </div>
      )}
    </div>
  );
};

export default ActivityShaper;

import React from 'react';
import { Switch, Typography } from 'antd';

import { ActivityShape } from '../../database/schema';

import './activityShaper.less';

export type ActivityShaperProps = {
  shape: ActivityShape;
  onChange: (newShape: ActivityShape) => void;
};

export const ActivityShaper: React.FC<ActivityShaperProps> = ({
  shape,
  onChange,
}) => {
  return (
    <div className='activity-shaper'>
      <div>
        <Typography.Text type='secondary'>Loop </Typography.Text>
        <Switch
          onChange={(checked) => onChange({ ...shape, isLoop: checked })}
        />
      </div>
      <div>
        <Typography.Text style={{ display: 'block' }} type='secondary'>
          Start
        </Typography.Text>
        <Typography.Text
          editable={{
            onChange: (value) => onChange({ ...shape, from: value }),
          }}
        >
          {shape?.from || 'unknown'}
        </Typography.Text>
      </div>
      {!shape.isLoop && (
        <div>
          <Typography.Text style={{ display: 'block' }} type='secondary'>
            End
          </Typography.Text>
          <Typography.Text
            editable={{
              maxLength: 100,
              onChange: (value) => onChange({ ...shape, to: value }),
            }}
          >
            {shape.to || 'unknown'}
          </Typography.Text>
        </div>
      )}
    </div>
  );
};

export default ActivityShaperProps;

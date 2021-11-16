import React from 'react';
import { Switch, Typography } from 'antd';

import { ActivityShape } from '../../database/schema';

import './activityShaper.less';
import WithLabel from '../withLabel/WithLabel';

export type ActivityShaperProps = {
  shape: ActivityShape;
  onChange: (newShape: ActivityShape) => void;
};

const ActivityShaper: React.FC<ActivityShaperProps> = ({ shape, onChange }) => {
  return (
    <div className='activity-shaper'>
      <WithLabel label='Loop'>
        <Switch
          onChange={(checked) => onChange({ ...shape, isLoop: checked })}
        />
      </WithLabel>
      <WithLabel label='Start'>
        <Typography.Text
          editable={{
            onChange: (value) => onChange({ ...shape, from: value }),
          }}
        >
          {shape.from}
        </Typography.Text>
      </WithLabel>
      {!shape.isLoop && (
        <WithLabel label='End'>
          <Typography.Text
            editable={{
              maxLength: 100,
              onChange: (value) => onChange({ ...shape, to: value }),
            }}
          >
            {shape.to}
          </Typography.Text>
        </WithLabel>
      )}
    </div>
  );
};

export default ActivityShaper;

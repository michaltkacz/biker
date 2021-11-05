import React from 'react';
import { Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

import { formatDateValue } from '../../global/statisiticsFormatters';

import './activityTitle.less';

export type ActivityTitleProps = {
  name: string;
  createdAt: number;
  lastModifiedAt: number;
  onNameChange: (newName: string) => void;
};

const ActivityTitle: React.FC<ActivityTitleProps> = ({
  name,
  createdAt,
  lastModifiedAt,
  onNameChange,
}) => {
  return (
    <div className='activity-title'>
      <Typography.Title
        level={3}
        className='activity-title-name'
        editable={{
          onChange: onNameChange,
        }}
      >
        {name.length === 0 ? '[no-title]' : name}
      </Typography.Title>
      <div className='date-wrapper'>
        <CalendarOutlined />
        <Typography.Text italic className='activity-title-date'>
          {formatDateValue(createdAt)}
        </Typography.Text>
        <Typography.Text
          italic
          type='secondary'
          className='activity-title-date'
        >
          {`(Modified: ${formatDateValue(lastModifiedAt)})`}
        </Typography.Text>
      </div>
    </div>
  );
};

export default ActivityTitle;

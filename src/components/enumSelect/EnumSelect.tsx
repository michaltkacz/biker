import React, { useState } from 'react';
import { Typography, Select, Tooltip } from 'antd';

import { v4 as uuidv4 } from 'uuid';

import { EnumTypes } from '../../database/schema';

import './enumSelect.less';
import { EditOutlined } from '@ant-design/icons';

export type EnumSelectProps = {
  onChange: (value: any) => void;
  values: Array<EnumTypes>;
  defaultValue: EnumTypes;
  editable?: boolean;
};

const EnumSelect: React.FC<EnumSelectProps> = ({
  onChange,
  values,
  defaultValue,
  editable,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  console.log(editable);
  if (!editMode && editable) {
    return (
      <Typography.Paragraph>
        {defaultValue}{' '}
        <Tooltip title='Edit'>
          <EditOutlined
            onClick={() => setEditMode(true)}
            style={{ color: '#3F51B5' }}
          />
        </Tooltip>
      </Typography.Paragraph>
    );
  }

  return (
    <>
      <Select
        defaultValue={defaultValue}
        onChange={(value) => {
          onChange(value);
          setEditMode(false);
        }}
        className='select'
      >
        {values.map((type) => (
          <Select.Option key={uuidv4()} value={type}>
            {type}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};

export default EnumSelect;

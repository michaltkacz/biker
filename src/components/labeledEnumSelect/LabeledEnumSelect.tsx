import React from 'react';
import { Typography, Select } from 'antd';

import { v4 as uuidv4 } from 'uuid';

import { EnumTypes } from '../../database/schema';

import './labeledEnumSelect.less';

export type LabeledEnumSelectProps = {
  label: string;
  onChange: (value: any) => void;
  values: Array<EnumTypes>;
  defaultValue: EnumTypes;
};

const LabeledEnumSelect: React.FC<LabeledEnumSelectProps> = ({
  label,
  onChange,
  values,
  defaultValue,
}) => {
  return (
    <div className='labeled-enum-select'>
      <Typography.Text type='secondary' className='label'>
        {label}
      </Typography.Text>
      <Select
        defaultValue={defaultValue}
        onChange={(value) => onChange(value)}
        className='select'
      >
        {values.map((type) => (
          <Select.Option key={uuidv4()} value={type}>
            {type}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default LabeledEnumSelect;

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Avatar, AvatarProps, Button, Input, Tooltip } from 'antd';
import React, { useState } from 'react';

import './editableAvatar.less';

export type EditableAvatarProps = {
  url: string;
  onUrlChange: (newUrl: string) => void;
} & AvatarProps;

const EditableAvatar: React.FC<EditableAvatarProps> = ({
  url,
  onUrlChange,
  ...rest
}) => {
  const [internalUrl, setInternalUrl] = useState<string>(url);
  const [editUrl, setEditUrl] = useState<boolean>(false);

  const onConfirmClick = () => {
    onUrlChange(internalUrl);
    setEditUrl(false);
  };

  const onCancelClick = () => {
    setEditUrl(false);
  };

  return (
    <div className='editable-avatar'>
      <Tooltip title='Edit' placement='right'>
        <div
          onClick={() => {
            setEditUrl(true);
          }}
        >
          <Avatar {...rest} />
        </div>
      </Tooltip>
      {editUrl && (
        <Input.Group compact style={{ width: 'fit-content' }}>
          <Input
            style={{ width: 100 }}
            placeholder='URL'
            onChange={(e) => {
              setInternalUrl(e.target.value);
            }}
          />
          <Button icon={<CloseOutlined />} onClick={onCancelClick} />
          <Button
            type='primary'
            icon={<CheckOutlined />}
            onClick={onConfirmClick}
          />
        </Input.Group>
      )}
    </div>
  );
};

export default EditableAvatar;

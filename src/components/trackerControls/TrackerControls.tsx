import React from 'react';
import { message, Button as AntdButton, Popconfirm } from 'antd';

import './trackerControls.less';
import { useMediaQuery } from 'react-responsive';
import { screen } from '../../reactResponsive/options';

interface TrackerControlsProps {}

interface ButtonProps {
  text: string;
  messageText?: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface PopconfirmButtonProps {
  buttonText: string;
  popconfirmText: string;
  messageTextConfirm: string;
  messageTextCancel?: string;
  icon: React.ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
}

interface ToggleControlProps {
  toggled: boolean;
  primaryControl: React.ReactNode;
  secondaryControl: React.ReactNode;
}
interface ButtonTextProps {
  text: string;
}

const TrackerControls: React.FC<TrackerControlsProps> & {
  Button: React.FC<ButtonProps>;
  PopconfirmButton: React.FC<PopconfirmButtonProps>;
  ToggleControl: React.FC<ToggleControlProps>;
} = ({ children }) => {
  return <div className='tracker-controls'>{children}</div>;
};

const Button: React.FC<ButtonProps> = ({
  text,
  messageText,
  icon,
  onClick,
  children,
}) => {
  return (
    <AntdButton
      block
      type='primary'
      size='large'
      icon={icon}
      onClick={() => {
        onClick && onClick();
        message.info(messageText);
      }}
      className='button'
    >
      {children}
      <ButtonText text={text} />
    </AntdButton>
  );
};

const PopconfirmButton: React.FC<PopconfirmButtonProps> = ({
  buttonText,
  popconfirmText,
  messageTextConfirm,
  messageTextCancel,
  icon,
  onConfirm,
  onCancel,
  children,
}) => {
  return (
    <Popconfirm
      placement='top'
      title={popconfirmText}
      onConfirm={() => {
        onConfirm();
        message.success(messageTextConfirm);
      }}
      onCancel={() => {
        onCancel && onCancel();
        messageTextCancel && message.success(messageTextCancel);
      }}
      okText='Yes'
      cancelText='No'
    >
      <AntdButton
        block
        type='primary'
        size='large'
        icon={icon}
        className='button'
      >
        <ButtonText text={buttonText} />
      </AntdButton>
    </Popconfirm>
  );
};

const ToggleControl: React.FC<ToggleControlProps> = ({
  toggled,
  primaryControl,
  secondaryControl,
}) => {
  return <>{toggled ? secondaryControl : primaryControl}</>;
};

const ButtonText: React.FC<ButtonTextProps> = ({ text }) => {
  const isScreenMd = useMediaQuery(screen.md);

  return <span className='button-text'>{isScreenMd ? text : ' '}</span>;
};

TrackerControls.Button = Button;
TrackerControls.PopconfirmButton = PopconfirmButton;
TrackerControls.ToggleControl = ToggleControl;

export default TrackerControls;

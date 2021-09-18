import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { CardTabListType as ICardTabListType } from 'antd/lib/card';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const tabList: ICardTabListType[] = [
  {
    key: 'signin',
    tab: 'Sign In',
  },
  {
    key: 'signup',
    tab: 'Sign Up',
  },
];

interface IContentList {
  signin: JSX.Element;
  signup: JSX.Element;
}

const contentList: IContentList = {
  signin: <SignInForm />,
  signup: <SignUpForm />,
};

const EmailPasswordAuth: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>(tabList[0].key);

  const onTabChange = (newActiveKey: string) => {
    setActiveTabKey(newActiveKey);
  };

  return (
    <Card
      title='Welcome! Log in to your account'
      bordered={false}
      tabList={tabList}
      activeTabKey={activeTabKey}
      onTabChange={(newActiveKey) => {
        onTabChange(newActiveKey);
      }}
      style={{ minHeight: '31em' }}
    >
      {contentList[activeTabKey as keyof IContentList]}
    </Card>
  );
};

export default EmailPasswordAuth;

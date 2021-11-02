import React from 'react';
import Pages from '../../global/pages';

import './brand.less';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';

const Brand = () => {
  const history = useHistory();
  const location = useLocation();

  const handleClick = (): void => {
    if (location.pathname === `/${Pages.Authorize}`) {
      return;
    }
    history.push(Pages.Profile);
  };

  return <div className='brand' onClick={handleClick}></div>;
};

export default Brand;

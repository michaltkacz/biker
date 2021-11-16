import React, { useState } from 'react';
import { message, Typography } from 'antd';

import EnumSelect from '../enumSelect/EnumSelect';
import WithLabel from '../withLabel/WithLabel';

import { GenderTypes } from '../../database/schema';

import './profileData.less';

const DateRegExp = new RegExp(
  '(?:19|20)(?:[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:29|30))|(?:(?:0[13578]|1[02])-31))|(?:[13579][26]|[02468][048])-02-29)'
);

const ProfileData: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [gender, setGender] = useState<GenderTypes>(GenderTypes.Other);
  const [birthday, setBirthday] = useState<string>('YYYY-MM-DD');
  const [weight, setWeight] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [country, setCountry] = useState<string>('unknown');
  const [city, setCity] = useState<string>('unknown');

  const onDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
  };

  const onBirthdayChange = (newBirthday: string) => {
    const isValid = DateRegExp.test(newBirthday);
    if (isValid) {
      setBirthday(newBirthday);
      message.success('Birthday updated');
    } else {
      message.error('Birthday is invalid');
    }
  };

  const onGenderChange = (newGender: GenderTypes) => {
    setGender(newGender);
    // if (error) {
    // message.error("Name couldn't be updated");
    // } else {
    message.success('Birthday updated');
    // }
  };

  const onWeightChange = (newWeight: string) => {
    const weightNumber = parseFloat(newWeight);
    if (isNaN(weightNumber) || weightNumber < 0) {
      message.error('Weight is invalid');
    } else {
      const rounded = Math.round(weightNumber * 10) / 10;
      setWeight(rounded);
      message.success('Weight updated');
    }
  };

  const onHeightChange = (newHeight: string) => {
    const heightNumber = parseInt(newHeight);
    if (isNaN(heightNumber) || heightNumber < 0) {
      message.error('Height is invalid');
    } else {
      setHeight(heightNumber);
      message.success('Height updated');
    }
  };

  const onCountryChange = (newCountry: string) => {
    setCountry(newCountry);
  };

  const onCityChange = (newCity: string) => {
    setCity(newCity);
  };

  return (
    <div className='profile-data'>
      <WithLabel label='Description'>
        <Typography.Paragraph
          editable={{
            onChange: onDescriptionChange,
          }}
        >
          {description}
        </Typography.Paragraph>
      </WithLabel>
      <div className='profile-data-grid-area'>
        <WithLabel label='Gender'>
          <EnumSelect
            onChange={onGenderChange}
            values={Object.values(GenderTypes)}
            defaultValue={gender}
            editable
          />
        </WithLabel>
        <WithLabel label='Weight'>
          <Typography.Paragraph
            editable={{
              onChange: onWeightChange,
            }}
          >
            {weight || '-'}
            {' kg'}
          </Typography.Paragraph>
        </WithLabel>
        <WithLabel label='Country'>
          <Typography.Paragraph
            editable={{
              onChange: onCountryChange,
            }}
          >
            {country}
          </Typography.Paragraph>
        </WithLabel>
        <WithLabel label='Birthday'>
          <Typography.Paragraph
            editable={{
              onChange: onBirthdayChange,
            }}
          >
            {birthday}
          </Typography.Paragraph>
        </WithLabel>
        <WithLabel label='Height'>
          <Typography.Paragraph
            editable={{
              onChange: onHeightChange,
            }}
          >
            {height || '-'}
            {' cm'}
          </Typography.Paragraph>
        </WithLabel>
        <WithLabel label='City'>
          <Typography.Paragraph
            editable={{
              onChange: onCityChange,
            }}
          >
            {city}
          </Typography.Paragraph>
        </WithLabel>
      </div>
    </div>
  );
};
export default ProfileData;

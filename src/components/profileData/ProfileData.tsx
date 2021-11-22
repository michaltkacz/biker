import React, { useState } from 'react';
import { Card, message, Result, Typography } from 'antd';
import { SolutionOutlined } from '@ant-design/icons';

import './profileData.less';

import EnumSelect from '../enumSelect/EnumSelect';
import WithLabel from '../withLabel/WithLabel';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

import { GenderTypes, UserProfile } from '../../database/schema';

import { updateProfile } from '../../firebase/hooks/useDatabase';
import { useAuth } from '../../firebase/hooks/useAuth';

const DateRegExp = new RegExp(
  '(?:19|20)(?:[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:29|30))|(?:(?:0[13578]|1[02])-31))|(?:[13579][26]|[02468][048])-02-29)'
);

export type ProfileDataProps = {
  profile: UserProfile | null;
  loading: boolean;
  error: boolean;
};

const ProfileData: React.FC<ProfileDataProps> = ({
  profile,
  loading,
  error,
}) => {
  const { currentUserId } = useAuth();

  const [description, setDescription] = useState<string | undefined>(
    profile?.description
  );
  const [gender, setGender] = useState<GenderTypes | undefined>(
    profile?.gender
  );
  const [birthday, setBirthday] = useState<string | undefined>(
    profile?.birthday
  );
  const [weight, setWeight] = useState<number | undefined>(profile?.weight);
  const [height, setHeight] = useState<number | undefined>(profile?.height);
  const [country, setCountry] = useState<string | undefined>(profile?.country);
  const [city, setCity] = useState<string | undefined>(profile?.city);

  const onProfileUpdate = async (
    field: string,
    payload: { [filed: string]: any }
  ) => {
    updateProfile(currentUserId, payload)
      .then(() => {
        message.success(field + ' updated');
      })
      .catch(() => {
        message.error(field + " couldn't be updated");
      });
  };

  const onDescriptionChange = (newDescription: string) => {
    onProfileUpdate('Description', { description: newDescription }).then(() => {
      setDescription(newDescription);
    });
  };

  const onBirthdayChange = (newBirthday: string) => {
    const isValid = DateRegExp.test(newBirthday);
    if (isValid) {
      onProfileUpdate('Birthday', { birthday: newBirthday }).then(() => {
        setBirthday(newBirthday);
      });
    } else {
      message.error('Birthday is invalid');
    }
  };

  const onGenderChange = (newGender: GenderTypes) => {
    onProfileUpdate('Gender', { gender: newGender }).then(() => {
      setGender(newGender);
    });
  };

  const onWeightChange = (newWeight: string) => {
    const weightNumber = parseFloat(newWeight);
    if (isNaN(weightNumber) || weightNumber < 0) {
      message.error('Weight is invalid');
    } else {
      const roundedWeight = Math.round(weightNumber * 10) / 10;
      onProfileUpdate('Weight', { weight: roundedWeight }).then(() => {
        setWeight(roundedWeight);
      });
    }
  };

  const onHeightChange = (newHeight: string) => {
    const heightNumber = parseInt(newHeight);
    if (isNaN(heightNumber) || heightNumber < 0) {
      message.error('Height is invalid');
    } else {
      onProfileUpdate('Height', { height: heightNumber }).then(() => {
        setHeight(heightNumber);
      });
    }
  };

  const onCountryChange = (newCountry: string) => {
    onProfileUpdate('Country', { country: newCountry }).then(() => {
      setCountry(newCountry);
    });
  };

  const onCityChange = (newCity: string) => {
    onProfileUpdate('City', { city: newCity }).then(() => {
      setCity(newCity);
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Result status='error' title='Something has gone wrong' />;
  }

  return (
    <Card
      title={
        <Typography.Title className='' level={5}>
          Bio <SolutionOutlined />
        </Typography.Title>
      }
      size='small'
      className='profile-data'
    >
      <WithLabel label='Description'>
        <Typography.Paragraph
          editable={{
            onChange: onDescriptionChange,
          }}
        >
          {description || 'No description'}
        </Typography.Paragraph>
      </WithLabel>
      <div className='profile-data-grid-area'>
        <WithLabel label='Gender'>
          <EnumSelect
            onChange={onGenderChange}
            values={Object.values(GenderTypes)}
            defaultValue={gender || GenderTypes.Other}
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
            {country || '-'}
          </Typography.Paragraph>
        </WithLabel>
        <WithLabel label='Birthday'>
          <Typography.Paragraph
            editable={{
              onChange: onBirthdayChange,
            }}
          >
            {birthday || 'YYYY-MM-DD'}
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
            {city || '-'}
          </Typography.Paragraph>
        </WithLabel>
      </div>
    </Card>
  );
};
export default ProfileData;

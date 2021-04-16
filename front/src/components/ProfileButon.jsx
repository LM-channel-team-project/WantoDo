import React from 'react';
import Button from './Button';
import ProfileImage from './ProfileImage';

const ProfileButon = ({ imageURL, styleName, onClick }) => (
  <Button styleName={styleName} onClick={onClick}>
    <ProfileImage imageURL={imageURL} styleName={styleName} />
  </Button>
);

export default ProfileButon;

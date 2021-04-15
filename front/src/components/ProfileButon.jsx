import React from 'react';
import Button from './Button';
import styles from '../styles/ProfileButton.module.css';

const ProfileButon = ({ imageURL, styleName, onClick }) => (
  <Button styleName={styleName} onClick={onClick}>
    <img
      className={styles.image}
      src={
        imageURL instanceof String ||
        `${process.env.PUBLIC_URL}/assets/images/default_profile.png`
      }
      alt="기본 프로필"
    />
  </Button>
);

export default ProfileButon;

import React from 'react';
import styles from '../styles/ProfileImage.module.css';

const convertURL = (url) => {
  let imageURL = '';

  switch (String(url)) {
    case '':
    case '0':
      imageURL = `${process.env.PUBLIC_URL}/assets/images/default_profile.png`;
      break;
    case '1':
      imageURL = `${process.env.PUBLIC_URL}/assets/images/default_profile_1.png`;
      break;
    case '2':
      imageURL = `${process.env.PUBLIC_URL}/assets/images/default_profile_2.png`;
      break;
    default:
      imageURL = url;
      break;
  }

  return imageURL;
};

/**
 * 사용자 프로필 이미지 컴포넌트
 * @param {string} props.imageURL - 사용자의 프로필 이미지 URL
 * @param {string} props.styleName - 공통 스타일링에 대한 변형에 사용할 클래스명 문자열
 */
const ProfileImage = ({ imageURL, styleName }) => (
  <img
    className={`${styles.image} ${styles[styleName]}`}
    src={convertURL(imageURL)}
    alt="사용자 프로필"
    data-origin={imageURL}
  />
);

export default ProfileImage;

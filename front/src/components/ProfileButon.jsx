import React from 'react';
import Button from './Button';
import ProfileImage from './ProfileImage';

/**
 * 프로필 이미지 버튼
 * @param {string} imageURL - 사용자의 프로필 이미지 URL
 * @param {string} styleName - 공통 스타일링에 대한 변형에 사용할 클래스명 문자열, Button과 ProfileImage에서 적용
 * @param {Function} onClick - 클릭 이벤트를 핸들링할 함수
 */
const ProfileButon = ({ imageURL, styleName, onClick }) => (
  <Button styleName={styleName} onClick={onClick}>
    <ProfileImage imageURL={imageURL} styleName={styleName} />
  </Button>
);

export default ProfileButon;

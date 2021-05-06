import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { AiOutlineGoogle } from 'react-icons/ai';
import IconButton from './IconButton';
import accountManager from '../utils/account-manager';

const GoogleLoginButton = ({ onLogin }) => {
  const onSuccess = async (response) => {
    // 서버에 사용자 정보 전송, 가입 상태 및 프로필 정보 응답 받음
    const idToken = response.tokenObj.id_token;

    const { name, email } = response.profileObj;

    const defaultProfile = {
      userName: name.length > 10 ? name.slice(0, 10) : name,
      email,
    };

    const userData = await accountManager.getUserData(idToken);

    const profile = userData.isTutorial ? userData.profile : defaultProfile;

    onLogin(profile, userData.isTutorial);
  };

  const onFailure = () => {
    // 로그인 실패에 대한 처리
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onSuccess={onSuccess}
      onFailure={onFailure}
      // isSignedIn
      cookiePolicy="single_host_origin"
      render={(props) => (
        <IconButton Icon={AiOutlineGoogle} onClick={props.onClick}>
          구글 계정으로 시작하기
        </IconButton>
      )}
    />
  );
};

export default GoogleLoginButton;

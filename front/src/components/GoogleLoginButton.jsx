import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { AiOutlineGoogle } from 'react-icons/ai';
import IconButton from './IconButton';

const GoogleLoginButton = ({ onLogin }) => {
  const responseGoogle = (response) => {
    // 서버에 사용자 정보 전송, 가입 상태 응답 받음
    console.log(response);
    onLogin(false);
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
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

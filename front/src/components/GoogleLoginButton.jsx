import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { AiOutlineGoogle } from 'react-icons/ai';
import IconButton from './IconButton';

const GoogleLoginButton = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
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

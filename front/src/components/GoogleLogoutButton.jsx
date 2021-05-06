import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import Button from './Button';

const GoogleLogoutButton = ({ onLogout }) => {
  const history = useHistory();

  const responseGoogle = () => {
    history.push('/login');
  };

  return (
    <GoogleLogout
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onLogoutSuccess={responseGoogle}
      onFailure={responseGoogle}
      // isSignedIn
      cookiePolicy="single_host_origin"
      render={() => (
        <Button styleName="profileModal" onClick={onLogout}>
          로그아웃
        </Button>
      )}
    />
  );
};

export default GoogleLogoutButton;

import React from 'react';
import { connect } from 'react-redux';
import { useGoogleLogin } from 'react-google-login';
import accountManager from '../utils/account-manager';
import { actionCreators } from '../store/store';
import Layout from '../container/Layout';
import Navbar from '../container/Navbar';
import TaskModal from '../container/TaskModal';
import ProfileModal from '../components/ProfileModal';
import TasksContainer from '../container/TasksContainer';
import CalenderContainer from '../container/CalenderContainer';

const Main = ({ isProfileShow, isTaskFormShow, content, createProfile }) => {
  const onLoginSuccess = async ({ tokenObj }) => {
    const profile = await accountManager.getUserData(tokenObj.id_token);
    createProfile(profile.profile);
  };

  useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onSuccess: onLoginSuccess,
    // true로 설정 시 이미 로그인한 상태이면 onSuccess 호출, 로그아웃 상태면 호출 안함
    isSignedIn: true,
  });

  return (
    <>
      <Layout
        Side={() => <Navbar />}
        Left={() => <TasksContainer />}
        Right={() => <CalenderContainer />}
      >
        {isProfileShow && <ProfileModal />}
        {isTaskFormShow && <TaskModal content={content} />}
      </Layout>
    </>
  );
};

const mapStateToProps = ({ modal: { profile, taskForm } }) => {
  return {
    isProfileShow: profile,
    isTaskFormShow: taskForm.display,
    content: taskForm.content,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProfile: (profile) => dispatch(actionCreators.createProfile(profile)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useGoogleLogout } from 'react-google-login';
import { actionCreators } from '../store/store';
import { modals } from '../reducer/modal';
import Layout from '../container/Layout';
import Navbar from '../container/Navbar';
import TaskModal from '../container/TaskModal';
import ProfileModal from '../components/ProfileModal';
import TasksContainer from '../container/TasksContainer';
import CalendarContainer from '../container/CalendarContainer';
import SettingContainer from '../container/SettingContainer';
import TagModal from '../container/TagModal';

const Main = ({
  changeSignState,
  isProfileShow,
  isTaskFormShow,
  isTagShow,
  task,
  taskId,
  toggleModal,
}) => {
  const [left, setLeft] = useState('tasks'); // Left에 렌더링할 컴포넌트 이름

  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onLogoutSuccess: () => changeSignState(false),
    // 추후 로그아웃 실패 시 알림 모달 추가
    // onFailure: (e) => console.log(e),
  });

  return (
    <Layout
      Side={() => <Navbar changeLeft={setLeft} />}
      Left={() => (left === 'tasks' ? <TasksContainer /> : <SettingContainer />)}
      Right={() => <CalendarContainer />}
    >
      {isProfileShow && <ProfileModal signOut={signOut} />}
      {isTagShow && <TagModal toggleModal={() => toggleModal(modals.tags)} />}
      {isTaskFormShow && (
        <TaskModal taskId={taskId} task={task} toggleModal={() => toggleModal(modals.taskForm)} />
      )}
    </Layout>
  );
};

const mapStateToProps = ({ modal: { profile, taskForm, tags } }) => {
  return {
    isProfileShow: profile,
    isTagShow: tags,
    isTaskFormShow: taskForm.display,
    task: taskForm.task,
    taskId: taskForm.taskId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: (modal) =>
      dispatch(
        modal === modals.taskForm
          ? actionCreators.toggleTaskFormModal({ display: true })
          : actionCreators.toggleModal(modal),
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

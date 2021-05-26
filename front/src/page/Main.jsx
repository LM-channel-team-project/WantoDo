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
import WithdrawalModal from '../container/WithdrawalModal';
import accountManager from '../utils/account-manager';
import DailyContainer from '../container/DailyContainer';

const Main = ({
  changeSignState,
  isWithdrawalShow,
  isProfileShow,
  isTaskFormShow,
  isTagShow,
  token,
  task,
  taskId,
  toggleModal,
}) => {
  const [left, setLeft] = useState('tasks'); // Left에 렌더링할 컴포넌트 이름
  const [full, setFull] = useState('');

  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onLogoutSuccess: () => changeSignState(false),
    // 추후 로그아웃 실패 시 알림 모달 추가
    // onFailure: (e) => console.log(e),
  });

  const removeAccount = () => {
    accountManager.deleteAccount(token);
    signOut();
  };

  return (
    <Layout
      Side={() => (
        <Navbar
          changeLeft={(name) => {
            setLeft(name);
            setFull(undefined);
          }}
          changeFull={setFull}
        />
      )}
      Left={() =>
        left === 'tasks' ? (
          <TasksContainer />
        ) : (
          <SettingContainer toggleModal={() => toggleModal(modals.withdrawal)} />
        )
      }
      Right={() => <CalendarContainer />}
      Full={full && (() => <DailyContainer />)}
    >
      {isWithdrawalShow && (
        <WithdrawalModal
          toggleModal={() => toggleModal(modals.withdrawal)}
          removeAccount={removeAccount}
        />
      )}
      {isProfileShow && (
        <ProfileModal signOut={signOut} toggleModal={() => toggleModal(modals.profile)} />
      )}
      {isTagShow && <TagModal toggleModal={() => toggleModal(modals.tags)} />}
      {isTaskFormShow && (
        <TaskModal taskId={taskId} task={task} toggleModal={() => toggleModal(modals.taskForm)} />
      )}
    </Layout>
  );
};

const mapStateToProps = ({ modal: { profile, taskForm, tags, withdrawal }, token }) => {
  return {
    isWithdrawalShow: withdrawal,
    isProfileShow: profile,
    isTagShow: tags,
    isTaskFormShow: taskForm.display,
    task: taskForm.task,
    taskId: taskForm.taskId,
    token,
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

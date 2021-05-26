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
          openModal={(modal) => toggleModal(modal, 'open')}
        />
      )}
      Left={() =>
        left === 'tasks' ? (
          <TasksContainer
            openDetailModal={(_task) => toggleModal(modals.taskForm, 'open', _task)}
          />
        ) : (
          <SettingContainer
            openWidrawalModal={() => toggleModal(modals.withdrawal, 'open')}
            openDetailModal={(_task) => toggleModal(modals.taskForm, 'open', _task)}
          />
        )
      }
      Right={() => <CalendarContainer />}
      Full={full && (() => <DailyContainer />)}
      closeModal={() => toggleModal('all')}
    >
      {isWithdrawalShow && (
        <WithdrawalModal
          toggleModal={() => toggleModal(modals.withdrawal, 'close')}
          removeAccount={removeAccount}
        />
      )}
      {isProfileShow && <ProfileModal signOut={signOut} />}
      {isTagShow && <TagModal closeModal={() => toggleModal(modals.tags, 'close')} />}
      {isTaskFormShow && (
        <TaskModal
          taskId={taskId}
          task={task}
          closeModal={() => toggleModal(modals.taskForm, 'close')}
        />
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
    toggleModal: (modal, command, task) => {
      let action;
      switch (modal) {
        case modals.taskForm:
          action = actionCreators.toggleTaskFormModal(task, command);
          break;
        case 'all':
          action = actionCreators.closeAllModal();
          break;
        default:
          action = actionCreators.toggleModal(modal, command);
          break;
      }
      return dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

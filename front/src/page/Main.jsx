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
import QuickModal from '../container/QuickModal';
import AlertModal from '../container/AlertModal';

const Main = ({
  changeSignState,
  isQuickModal,
  isWithdrawalShow,
  isProfileShow,
  isTaskFormShow,
  isTagShow,
  token,
  task,
  taskId,
  toggleModal,
}) => {
  const [alert, setAlert] = useState({});
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

  const openTaskModal = (_task) => toggleModal(modals.taskForm, 'open', _task);

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
          <TasksContainer openDetailModal={openTaskModal} setAlert={setAlert} />
        ) : (
          <SettingContainer
            openWidrawalModal={() => toggleModal(modals.withdrawal, 'open')}
            openDetailModal={openTaskModal}
            setAlert={setAlert}
          />
        )
      }
      Right={() => <CalendarContainer />}
      Full={full && (() => <DailyContainer openModal={() => toggleModal(modals.quick, 'open')} />)}
    >
      {isQuickModal && (
        <QuickModal
          closeModal={() => toggleModal(modals.quick, 'close')}
          openDetailModal={openTaskModal}
          setAlert={setAlert}
        />
      )}
      {isWithdrawalShow && (
        <WithdrawalModal
          closeModal={() => toggleModal(modals.withdrawal, 'close')}
          removeAccount={removeAccount}
          setAlert={setAlert}
        />
      )}
      {isProfileShow && (
        <ProfileModal signOut={signOut} closeModal={() => toggleModal(modals.profile, 'close')} />
      )}
      {isTagShow && <TagModal closeModal={() => toggleModal(modals.tags, 'close')} />}
      {isTaskFormShow && (
        <TaskModal
          taskId={taskId}
          task={task}
          closeModal={() => toggleModal(modals.taskForm, 'close')}
          setAlert={setAlert}
        />
      )}
      {alert.display && (
        <AlertModal
          title={alert.title || '주의!'}
          message={alert.message}
          cancelMsg={alert.cancel}
          confirmMsg={alert.confirm}
          onConfirm={alert.onConfirm}
          closeModal={() => {
            if (alert.onClose instanceof Function) alert.onClose();
            setAlert({});
          }}
        />
      )}
    </Layout>
  );
};

const mapStateToProps = ({ modal: { profile, taskForm, tags, withdrawal, quick }, token }) => {
  return {
    isQuickModal: quick,
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

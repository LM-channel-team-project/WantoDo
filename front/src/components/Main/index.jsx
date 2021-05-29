import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useGoogleLogout } from 'react-google-login';
import { actionCreators } from 'store/store';
import { modals } from 'store/reducer/modal';
import Layout from 'components/Layout/MainLayout';
import Navbar from 'components/Main/Navbar';
import TaskModal from 'components/Main/TaskModal';
import ProfileModal from 'components/Main/ProfileModal';
import TasksContainer from 'components/Main/TasksContainer';
import SettingContainer from 'components/Main/Setting';
import CalendarContainer from 'components/Main/Monthly';
import TagModal from 'components/Main/TagModal';
import WithdrawalModal from 'components/Main/WithdrawalModal';
import DailyContainer from 'components/Main/Daily/DailyContainer';
import QuickModal from 'components/Main/Daily/QuickModal';
import AlertModal from 'components/Global/AlertModal';
import QuickAddLayout from 'components/Layout/QuickAddLayout';
import accountManager from 'utils/account-manager';

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
      Left={() => (
        <QuickAddLayout
          title={left === 'tasks' ? 'Todos' : 'Setting'}
          openDetailModal={openTaskModal}
          setAlert={setAlert}
        >
          {left === 'tasks' ? (
            <TasksContainer openDetailModal={openTaskModal} />
          ) : (
            <SettingContainer
              openWidrawalModal={() => toggleModal(modals.withdrawal, 'open')}
              openDetailModal={openTaskModal}
              setAlert={setAlert}
            />
          )}
        </QuickAddLayout>
      )}
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

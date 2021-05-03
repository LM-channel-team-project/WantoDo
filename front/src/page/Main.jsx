import React from 'react';
import { connect } from 'react-redux';
import Layout from '../container/Layout';
import Navbar from '../container/Navbar';
import TaskModal from '../container/TaskModal';
import ProfileModal from '../components/ProfileModal';
import TasksContainer from '../container/TasksContainer';
import CalenderContainer from '../container/CalenderContainer';

const Main = ({ isProfileShow, isTaskFormShow, taskContent }) => {
  return (
    <>
      <Layout
        Side={() => <Navbar />}
        Left={() => <TasksContainer />}
        Right={() => <CalenderContainer />}
      >
        {isProfileShow && <ProfileModal />}
        {isTaskFormShow && <TaskModal content={taskContent} />}
      </Layout>
    </>
  );
};

const mapStateToProps = ({ modal: { profile, taskForm } }) => {
  return {
    isProfileShow: profile,
    isTaskFormShow: taskForm.display,
    taskContent: taskForm.content,
  };
};

export default connect(mapStateToProps)(Main);

import React from 'react';
import { connect } from 'react-redux';
import Layout from '../container/Layout';
import Navbar from '../container/Navbar';
import TaskModal from '../container/TaskModal';
import ProfileModal from '../components/ProfileModal';
import TasksContainer from '../container/TasksContainer';
import CalenderContainer from '../container/CalenderContainer';

const Main = ({ isProfileShow, isTaskFormShow, content }) => {
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
  console.dir(taskForm.input);
  return {
    isProfileShow: profile,
    isTaskFormShow: taskForm.display,
    content: taskForm.content,
  };
};

export default connect(mapStateToProps)(Main);

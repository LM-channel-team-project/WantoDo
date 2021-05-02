import React from 'react';
import Layout from '../container/Layout';
import Navbar from '../container/Navbar';
import TaskModal from '../container/TaskModal';
import ProfileModal from '../components/ProfileModal';
import TasksContainer from '../container/TasksContainer';
import CalenderContainer from '../container/CalenderContainer';

const Main = () => {
  return (
    <>
      <Layout
        Side={() => <Navbar />}
        Left={() => <TasksContainer />}
        Right={() => <CalenderContainer />}
      >
        <ProfileModal />
        <TaskModal />
      </Layout>
    </>
  );
};

export default Main;

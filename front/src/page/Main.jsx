import React from 'react';
import Calendar from '../components/Calendar';
import TaskList from '../components/TaskList';
import Layout from '../container/Layout';
import Navbar from '../container/Navbar';

const Main = ({ profile, tasks }) => (
  <Layout
    Side={() => <Navbar profileURL={profile.imageURL} />}
    Left={() => <TaskList tasks={tasks} />}
    Right={() => <Calendar />}
  />
);

export default Main;

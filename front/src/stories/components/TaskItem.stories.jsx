import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import TaskItem from '../../components/TaskItem';

const store = {
  getState: () => {
    return {
      updateTask: action('update'),
      deleteTask: action('delete'),
    };
  },
  subscribe: () => {},
  dispatch: action('dispatch'),
};

export default {
  title: 'components/TaskItem',
  component: TaskItem,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  args: {
    taskId: '',
    task: {
      level: 0,
      checked: false,
      content: 'task',
      periods: { start: Date.now(), end: Date.now() + 360000 },
    },
    type: '',
  },
};

const Template = (args) => <TaskItem {...args} />;

export const Default = Template.bind({});

export const Daily = Template.bind({});
Daily.args = {
  type: 'daily',
};

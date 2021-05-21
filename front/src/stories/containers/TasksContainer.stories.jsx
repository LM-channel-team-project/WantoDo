import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import TasksContainer from '../../container/TasksContainer';

const store = {
  getState: () => {
    return {
      token: '',
      tasks: {
        1: {
          level: 0,
          checked: false,
          content: 'task1',
          periods: { start: Date.now(), end: Date.now() },
        },
        2: {
          level: 1,
          checked: false,
          content: 'task2',
          periods: { start: Date.now(), end: Date.now() },
        },
        3: {
          level: 2,
          checked: false,
          content: 'task3',
          periods: { start: Date.now(), end: Date.now() },
        },
        4: {
          level: 3,
          checked: false,
          content: 'task4',
          periods: { start: Date.now(), end: Date.now() },
        },
      },
      updateTasks: action('update'),
      getTags: action('tags'),
    };
  },
  subscribe: () => {},
  dispatch: action('dispatch'),
};

export default {
  title: 'containers/TasksContainer',
  component: TasksContainer,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

const Template = (args) => <TasksContainer {...args} />;

export const Default = Template.bind({});

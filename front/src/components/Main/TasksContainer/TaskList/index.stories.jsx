import { action } from '@storybook/addon-actions';
import React from 'react';
import { Provider } from 'react-redux';
import TaskList from 'components/Main/TasksContainer/TaskList';

const store = {
  getState: () => {
    return { token: '' };
  },
  subscribe: () => {},
  dispatch: action('dispatch'),
};

export default {
  title: 'components/TaskList',
  component: TaskList,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  argTypes: {
    tasks: { control: false },
    type: { control: false },
  },
  args: {
    tasks: {
      1: {
        level: 0,
        checked: false,
        content: 'task1',
        periods: { start: Date.now(), end: Date.now() + 360000 },
      },
      2: {
        level: 1,
        checked: false,
        content: 'task2',
        periods: { start: Date.now(), end: Date.now() + 360000 },
      },
      3: {
        level: 2,
        checked: false,
        content: 'task3',
        periods: { start: Date.now(), end: Date.now() + 360000 },
      },
      4: {
        level: 3,
        checked: false,
        content: 'task4',
        periods: { start: Date.now(), end: Date.now() + 360000 },
      },
    },
    type: 'daily',
  },
};

const Template = (args) => <TaskList {...args} />;

export const Default = Template.bind({});

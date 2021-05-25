import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import TaskItem from '../../components/TaskItem';

const store = {
  getState: () => {
    return {
      tags: {
        1: { tagId: 1, name: 'tag1', color: '#FF98A5' },
        2: { tagId: 2, name: 'tag2', color: '#FFC8A8' },
      },
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
      tags: [
        { tagId: 1, name: 'tag1', color: '#FF98A5' },
        { tagId: 2, name: 'tag2', color: '#FFC8A8' },
      ],
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

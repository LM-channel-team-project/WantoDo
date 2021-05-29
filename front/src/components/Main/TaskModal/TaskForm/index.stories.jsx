import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import TaskForm from 'components/Main/TaskModal/TaskForm';

const store = {
  getState: () => {
    return {
      token: '',
      tags: { 1: { tagId: 1 } },
      taskId: '',
      addTask: action('add'),
      toggleTaskFormModal: action('toggle'),
    };
  },
  subscribe: () => {},
  dispatch: action('dispatch'),
};

export default {
  title: 'components/TaskForm',
  component: TaskForm,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  args: { task: {} },
};

const Template = (args) => <TaskForm {...args} />;

export const Default = Template.bind({});

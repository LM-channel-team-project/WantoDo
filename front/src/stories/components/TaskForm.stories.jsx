import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import TaskForm from '../../components/TaskForm';

const store = {
  getState: () => {
    return {
      addTask: action('add'),
      toggleTaskFormModal: action('toggle'),
      token: '',
      tags: { 1: { tagId: 1 } },
    };
  },
  subscribe: () => {},
  dispatch: action('dispatch'),
};

export default {
  title: 'components/TaskForm',
  component: TaskForm,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  args: {},
};

const Template = (args) => <TaskForm {...args} />;

export const Default = Template.bind({});

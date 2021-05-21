import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import TaskModal from '../../container/TaskModal';

const store = {
  getState: () => {
    return {
      token: '',
    };
  },
  subscribe: () => {},
  dispatch: action('dispatch'),
};

export default {
  title: 'containers/TaskModal',
  component: TaskModal,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  args: {
    content: '',
    task: {},
  },
};

const Template = (args) => <TaskModal {...args} />;

export const Default = Template.bind({});

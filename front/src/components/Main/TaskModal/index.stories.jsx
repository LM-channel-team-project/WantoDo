import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import TaskModal from 'components/Main/TaskModal';

const store = {
  getState: () => {
    return {};
  },
  subscribe: () => {},
  dispatch: action('dispatch'),
};

export default {
  title: 'containers/TaskModal',
  component: TaskModal,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  args: {
    token: '',
    content: '',
    task: {},
  },
};

const Template = (args) => <TaskModal {...args} />;

export const Default = Template.bind({});

import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import QuickModal from 'components/Main/Daily/QuickModal';

const store = {
  getState: () => ({
    token: '',
    addTask: action('submit'),
  }),
  subscribe: () => {},
  dispatch: () => action('dispatch'),
};
export default {
  title: 'containers/QuickModal',
  component: QuickModal,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  args: {
    closeModal: action('click'),
    openDetailModal: action('click'),
    setAlert: action('click'),
  },
};

const Template = (args) => <QuickModal {...args} />;

export const Default = Template.bind({});

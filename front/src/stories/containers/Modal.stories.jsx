import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import Modal from '../../container/Modal';

const store = {
  getState: () => {
    return {
      token: '',
      profile: { imageURL: '/assets/images/default_profile.png' },
      toggleProfileModal: action('toggle'),
    };
  },
  subscribe: () => {},
  dispatch: action('dispatch'),
};

export default {
  title: 'containers/Modal',
  component: Modal,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  args: {
    children: '',
    styleName: '',
  },
};

const Template = (args) => <Modal {...args} />;

export const Default = Template.bind({});

export const TaskModal = Template.bind({});
TaskModal.args = {
  styleName: 'taskModal',
};

export const ProfileModal = Template.bind({});
ProfileModal.args = {
  styleName: 'profileModal',
};

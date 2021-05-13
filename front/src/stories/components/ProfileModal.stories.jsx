import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import ProfileModal from '../../components/ProfileModal';

const store = {
  getState: () => {
    return {
      profile: {
        imageURL: '/assets/images/default_profile.png',
        userName: 'userName',
        email: 'email@email.com',
        motto: 'mottomotto',
      },
    };
  },
  subscribe: () => {},
  dispatch: action('dispatch'),
};

export default {
  title: 'components/ProfileModal',
  component: ProfileModal,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

const Template = (args) => <ProfileModal {...args} />;

export const Default = Template.bind({});

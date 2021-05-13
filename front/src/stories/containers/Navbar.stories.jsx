import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import Navbar from '../../container/Navbar';

const store = {
  getState: () => {
    return {
      profile: { imageURL: '/assets/images/default_profile.png' },
      toggleProfileModal: action('toggle'),
    };
  },
  subscribe: () => {},
  dispatch: action('dispatch'),
};

export default {
  title: 'containers/Navbar',
  component: Navbar,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

const Template = (args) => <Navbar {...args} />;

export const Default = Template.bind({});

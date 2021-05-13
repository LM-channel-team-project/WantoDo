import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import Tutorial from '../../page/Tutorial';

const store = {
  getState: () => {
    return {
      token: 'asdf',
    };
  },
  subscribe: () => {},
  dispatch: action('dispatch'),
};

export default {
  title: 'pages/Tutorial',
  component: Tutorial,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  argTypes: { profile: { control: false } },
  args: {
    profile: {
      imageURL: '/assets/images/default_profile.png',
      userName: 'userName',
      email: 'email@email.com',
    },
  },
};

const Template = (args) => <Tutorial {...args} />;

export const Default = Template.bind({});

import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import Login from 'components/Login';

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
  title: 'pages/Login',
  component: Login,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

const Template = (args) => <Login {...args} />;

export const Default = Template.bind({});

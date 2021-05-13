import React from 'react';
import { action } from '@storybook/addon-actions';
import { StoryRouter as Route } from 'storybook-react-router';
import { Provider } from 'react-redux';
import Login from '../../page/Login';

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
  decorators: [
    (story) => <Provider store={store}>{story()}</Provider>,
    // '/' 경로로 이동하지 않고 현재 컴포넌트에 머물러 있도록 페이크 라우팅
    (story) => <Route routerProps={{ initialEntries: ['/'] }}>{story()}</Route>,
  ],
};

const Template = (args) => <Login {...args} />;

export const Default = Template.bind({});

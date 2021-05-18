import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import Main from '../../page/Main';

let props = {
  isProfileShow: false,
  isTaskFormShow: false,
  content: '',
};

const store = {
  getState: () => {
    return {
      token: '',
      modal: {
        profile: props.isProfileShow,
        taskForm: { display: props.isTaskFormShow, content: props.content },
      },
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
  title: 'pages/Main',
  component: Main,
  decorators: [
    (story) => {
      props = story().props;
      return <Provider store={store}>{story()}</Provider>;
    },
  ],
  argTypes: {
    isProfileShow: { control: 'boolean' },
    isTaskFormShow: { control: 'boolean' },
    content: { control: 'text' },
  },
};

const Template = (args) => <Main {...args} />;

export const Default = Template.bind({});

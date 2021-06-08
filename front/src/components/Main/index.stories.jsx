import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import Main from 'components/Main';

let props = {
  isProfileShow: false,
  isTaskFormShow: false,
  isTagShow: false,
  isWithdrawalShow: false,
  content: '',
};

const store = {
  getState: () => {
    return {
      token: '',
      modal: {
        profile: props.isProfileShow,
        taskForm: { display: props.isTaskFormShow, taskId: '', task: {} },
        tags: props.isTagShow,
        withdrawal: props.isWithdrawalShow,
      },
      profile: {
        imageURL: '/assets/images/default_profile.png',
        userName: 'userName',
        email: 'email@email.com',
        motto: 'mottomotto',
        settings: {},
      },
      tasks: {
        1: {
          level: 0,
          checked: false,
          content: 'task1',
          periods: { start: Date.now(), end: Date.now() },
        },
        2: {
          level: 1,
          checked: false,
          content: 'task2',
          periods: { start: Date.now(), end: Date.now() },
        },
        3: {
          level: 2,
          checked: false,
          content: 'task3',
          periods: { start: Date.now(), end: Date.now() },
        },
        4: {
          level: 3,
          checked: false,
          content: 'task4',
          periods: { start: Date.now(), end: Date.now() },
        },
      },
      tags: {},
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
    isTagShow: { control: 'boolean' },
    isWithdrawalShow: { control: 'boolean' },
    content: { control: 'text' },
  },
  args: {
    isProfileShow: false,
    isTaskFormShow: false,
    isTagShow: false,
    isWithdrawalShow: false,
  },
};

const Template = (args) => <Main {...args} />;

export const Default = Template.bind({});

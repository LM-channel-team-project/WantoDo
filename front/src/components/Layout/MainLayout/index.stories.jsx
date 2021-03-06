import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import Layout from 'components/Layout/MainLayout';
import * as Navbar from 'components/Main/Navbar/index.stories';
import * as TasksContainer from 'components/Main/TasksContainer/index.stories';
import * as CalendarContainer from 'components/Main/Monthly/index.stories';
import * as SettingContainer from 'components/Main/Setting/index.stories';

const store = {
  getState: () => {
    return {
      profile: {
        imageURL: '/assets/images/default_profile.png',
        settings: {
          theme: 'default',
          isNotification: false,
          beginningOfWeek: 'sunday',
        },
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
      toggleProfileModal: action('toggle'),
    };
  },
  subscribe: () => {},
  dispatch: action('dispatch'),
};

export default {
  title: 'containers/Layout',
  component: Layout,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  argTypes: {
    Side: {
      options: ['Empty', 'Navbar'],
      mapping: { Empty: '', Navbar: Navbar.Default },
      control: {
        type: 'select',
      },
    },
    Left: {
      options: ['Empty', 'Tasks', 'Setting'],
      mapping: { Empty: '', Tasks: TasksContainer.Default, Setting: SettingContainer.Default },
      control: {
        type: 'select',
      },
    },
    Right: {
      options: ['Empty', 'Calendar'],
      mapping: { Empty: '', Calendar: CalendarContainer.Default },
      control: {
        type: 'select',
      },
    },
    children: { controls: 'text' },
  },
  args: {
    Side: 'Empty',
    Left: 'Empty',
    Right: 'Empty',
    children: '',
  },
};

const Template = (args) => <Layout {...args} />;

export const Default = Template.bind({});

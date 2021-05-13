import { action } from '@storybook/addon-actions';
import React from 'react';
import { Provider } from 'react-redux';
import Layout from '../../container/Layout';
import * as Navbar from './Navbar.stories';
import * as TasksContainer from './TasksContainer.stories';
import * as CalendarContainer from './CalendarContainer.stories';

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
      options: ['Empty', 'Tasks'],
      mapping: { Empty: '', Tasks: TasksContainer.Default },
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

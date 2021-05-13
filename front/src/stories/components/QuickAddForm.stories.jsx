import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import QuickAddForm from '../../components/QuickAddForm';

const store = {
  getState: () => {
    return {
      toggleTaskFormModal: action('toggle'),
      addTask: action('add'),
    };
  },
  subscribe: () => {},
  diskpatch: action('dispatch'),
};

export default {
  title: 'components/QuickAddForm',
  component: QuickAddForm,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

const Template = (args) => <QuickAddForm {...args} />;

export const Default = Template.bind({});

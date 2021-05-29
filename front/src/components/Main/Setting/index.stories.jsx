import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import SettingContainer from 'components/Main/Setting';

const store = {
  getState: () => {
    return {
      token: '',
      profile: {
        settings: {
          theme: 'default',
          isNotification: false,
          beginningOfWeek: 'sunday',
        },
      },
    };
  },
  subscribe: () => {},
  dispatch: action('dispatch'),
};

export default {
  title: 'containers/SettingContainer',
  component: SettingContainer,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

const Template = (args) => <SettingContainer {...args} />;

export const Default = Template.bind({});

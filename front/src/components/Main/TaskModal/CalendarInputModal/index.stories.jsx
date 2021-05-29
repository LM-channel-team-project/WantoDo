import React from 'react';
import { action } from '@storybook/addon-actions';
import CalendarInputModal from 'components/Main/TaskModal/CalendarInputModal';

export default {
  title: 'components/CalendarInputModal',
  component: CalendarInputModal,
  args: {
    name: '',
    onSelect: action('click'),
  },
};

const Template = (args) => <CalendarInputModal {...args} />;

export const Default = Template.bind({});

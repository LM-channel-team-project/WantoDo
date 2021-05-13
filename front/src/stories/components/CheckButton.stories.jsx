import { action } from '@storybook/addon-actions';
import React from 'react';
import CheckButton from '../../components/CheckButton';

export default {
  title: 'components/CheckButton',
  component: CheckButton,
  args: {
    checked: false,
    onClick: action('onClick'),
  },
};

const Template = (args) => <CheckButton {...args} />;

export const Default = Template.bind({});

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};

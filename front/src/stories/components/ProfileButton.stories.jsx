import React from 'react';
import { action } from '@storybook/addon-actions';
import ProfileButton from '../../components/ProfileButton';

export default {
  title: 'components/ProfileButton',
  component: ProfileButton,
  argTypes: {
    imageURL: { control: false },
    styleName: { control: 'text' },
    onClick: { control: false },
  },
  args: {
    imageURL: '/assets/images/default_profile.png',
    styleName: 'profile',
    onClick: action('onClick'),
  },
};

const Template = (args) => <ProfileButton {...args} />;

export const Default = Template.bind({});

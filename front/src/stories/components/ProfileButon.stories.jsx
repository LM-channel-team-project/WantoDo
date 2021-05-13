import React from 'react';
import { action } from '@storybook/addon-actions';
import ProfileButon from '../../components/ProfileButon';

export default {
  title: 'components/ProfileButon',
  component: ProfileButon,
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

const Template = (args) => <ProfileButon {...args} />;

export const Default = Template.bind({});

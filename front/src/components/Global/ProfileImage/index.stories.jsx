import React from 'react';
import ProfileImage from 'components/Global/ProfileImage';

export default {
  title: 'components/ProfileImage',
  component: ProfileImage,
  argTypes: {
    imageURL: { control: false },
    styleName: { control: 'text' },
  },
  args: {
    imageURL: '/assets/images/default_profile.png',
    styleName: '',
  },
};

const Template = (args) => <ProfileImage {...args} />;

export const Default = Template.bind({});

export const Profile = Template.bind({});
Profile.args = {
  styleName: 'profile',
};

export const ProfileModal = Template.bind({});
ProfileModal.args = {
  styleName: 'profileModal',
};

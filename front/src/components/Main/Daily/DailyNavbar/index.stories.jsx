import React from 'react';
import DailyNavbar from 'components/Main/Daily/DailyNavbar';

export default {
  title: 'components/DailyNavbar',
  component: DailyNavbar,
  args: {
    current: new Date(),
  },
};

const Template = (args) => <DailyNavbar {...args} />;

export const Default = Template.bind({});

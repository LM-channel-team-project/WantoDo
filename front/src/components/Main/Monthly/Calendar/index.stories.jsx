import React from 'react';
import Calendar from 'components/Main/Monthly/Calendar';

export default {
  title: 'components/Calendar',
  component: Calendar,
};

const Template = (args) => <Calendar {...args} />;

export const Default = Template.bind({});

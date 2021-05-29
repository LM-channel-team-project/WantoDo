import React from 'react';
import CalenderContainer from 'components/Main/Monthly';

export default {
  title: 'containers/CalendarContainer',
  component: CalenderContainer,
};

const Template = (args) => <CalenderContainer {...args} />;

export const Default = Template.bind({});

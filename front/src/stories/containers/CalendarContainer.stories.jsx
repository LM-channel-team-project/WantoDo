import React from 'react';
import CalenderContainer from '../../container/CalendarContainer';

export default {
  title: 'containers/CalendarContainer',
  component: CalenderContainer,
};

const Template = (args) => <CalenderContainer {...args} />;

export const Default = Template.bind({});

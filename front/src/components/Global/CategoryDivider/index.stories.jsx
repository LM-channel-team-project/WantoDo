import React from 'react';
import CategoryDivider from 'components/Global/CategoryDivider';

export default {
  title: 'components/CategoryDivider',
  component: CategoryDivider,
};

const Template = ({ args }) => <CategoryDivider {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <span>16 Jun</span>,
};

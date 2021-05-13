import React from 'react';
import PriorityIcon from '../../components/PriorityIcon';

export default {
  title: 'components/PriorityIcon',
  component: PriorityIcon,
  argTypes: {
    level: { control: { type: 'range', max: 3, min: 0, steps: 1 } },
    lightOff: { control: 'boolean' },
  },
  args: {
    level: 0,
    lightOff: false,
  },
};

const Template = (args) => <PriorityIcon {...args} />;

export const Default = Template.bind({});

export const Level1 = Template.bind({});
Level1.args = {
  level: 1,
};

export const Level2 = Template.bind({});
Level2.args = {
  level: 2,
};

export const Level3 = Template.bind({});
Level3.args = {
  level: 3,
};

export const Level1LightOff = Template.bind({});
Level1LightOff.args = {
  level: 1,
  lightOff: true,
};

export const Level2LightOff = Template.bind({});
Level2LightOff.args = {
  level: 2,
  lightOff: true,
};

export const Level3LightOff = Template.bind({});
Level3LightOff.args = {
  level: 3,
  lightOff: true,
};

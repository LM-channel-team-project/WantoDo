import React from 'react';
import PrioritySelector from '../../components/PrioritySelector';

export default {
  title: 'components/PrioritySelector',
  component: PrioritySelector,
  argTypes: {
    inputRef: { control: false },
    priority: { control: false },
    inputName: { control: false },
  },
  args: {
    inputRef: undefined,
    priority: 0,
    inputName: '',
  },
};

const Template = (args) => <PrioritySelector {...args} />;

export const Default = Template.bind({});

export const Level1 = Template.bind({});
Level1.args = {
  priority: 1,
};

export const Level2 = Template.bind({});
Level2.args = {
  priority: 2,
};

export const Level3 = Template.bind({});
Level3.args = {
  priority: 3,
};

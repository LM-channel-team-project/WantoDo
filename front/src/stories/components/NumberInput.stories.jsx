import React from 'react';
import NumberInput from '../../components/NumberInput';

export default {
  title: 'components/NumberInput',
  component: NumberInput,
  argTypes: {
    inputRef: { control: false },
    value: { control: 'number' },
    styleName: { control: 'text' },
    name: { control: false },
    size: { control: 'number' },
    afterText: { control: 'text' },
  },
  args: {
    inputRef: undefined,
    value: 0,
    styleName: '',
    name: '',
    size: 1,
    afterText: 'text',
  },
};

const Template = (args) => <NumberInput {...args} />;

export const Default = Template.bind({});

export const Size2 = Template.bind({});
Size2.args = {
  size: 2,
  afterText: 'text',
};

export const Year = Template.bind({});
Year.args = {
  size: 4,
  afterText: '년',
};

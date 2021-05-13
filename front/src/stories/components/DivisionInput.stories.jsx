import React from 'react';
import DivisionInput from '../../components/DivisionInput';

export default {
  title: 'components/DivisionInput',
  component: DivisionInput,
  argTypes: {
    value: { control: { type: 'radio', options: ['am', 'pm'] } },
    styleName: { control: 'text' },
    name: { control: false },
    inputRef: { control: false },
  },
  args: {
    inputRef: undefined,
    value: 'am',
    styleName: '',
    name: '',
  },
};

const Template = (args) => <DivisionInput {...args} />;

export const Default = Template.bind({});

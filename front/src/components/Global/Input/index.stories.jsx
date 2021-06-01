import React from 'react';
import Input from 'components/Global/Input';

export default {
  title: 'components/Input',
  component: Input,
  argTypes: {
    inputRef: { control: false },
    type: { control: { type: 'select', options: ['text', 'textarea', 'date', 'number'] } },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    styleName: { control: 'text' },
    rows: { control: 'number' },
    cols: { control: 'number' },
    maxLength: { control: 'number' },
  },
  args: {
    inputRef: undefined,
    type: 'text',
    value: '',
    placeholder: '',
    styleName: '',
  },
};

const Template = (args) => <Input {...args} />;

export const Defualt = Template.bind({});

export const Textarea = Template.bind({});
Textarea.args = {
  type: 'textarea',
};

export const ProfileModalName = Template.bind({});
ProfileModalName.args = {
  styleName: 'profileModal__name',
};

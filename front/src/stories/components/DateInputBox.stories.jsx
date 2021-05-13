import React from 'react';
import DateInputBox from '../../components/DateInputBox';

export default {
  title: 'components/DateInputBox',
  components: DateInputBox,
  argTypes: {
    value: { control: 'number' },
    labelText: { control: 'text' },
    inputRef: { control: false },
    inputName: { control: false },
  },
  args: {
    value: Date.now(),
    labelText: '날짜',
    inputRef: '',
    inputName: '',
  },
};

const Template = (args) => <DateInputBox {...args} />;

export const Default = Template.bind({});

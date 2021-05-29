import React from 'react';
import Button from 'components/Global/Button';

export default {
  title: 'components/Button',
  component: Button,
  argTypes: {
    children: { control: 'text' },
    styleName: { control: 'text' },
    onClick: { control: false },
  },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Hello',
};

export const Calendar = Template.bind({});
Calendar.args = {
  children: 'cal',
};

export const Tutorial = Template.bind({});
Tutorial.args = {
  styleName: 'tutorial',
  children: '가입',
};

export const TutorialCancel = Template.bind({});
TutorialCancel.args = {
  styleName: 'tutorial__cancel',
  children: '취소',
};

export const QuickAddForm = Template.bind({});
QuickAddForm.args = {
  styleName: 'QuickAddForm',
  children: '등록',
};

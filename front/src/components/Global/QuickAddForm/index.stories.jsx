import React from 'react';
import QuickAddForm from 'components/Global/QuickAddForm';

export default {
  title: 'components/QuickAddForm',
  component: QuickAddForm,
  args: {
    isDetailButton: false,
    placeholder: '내용을 입력하세요',
    styleName: '',
  },
};

const Template = (args) => <QuickAddForm {...args} />;

export const Default = Template.bind({});

export const WithDetailButton = Template.bind({});
WithDetailButton.args = {
  isDetailButton: true,
};

export const TagModal = Template.bind({});
TagModal.args = {
  styleName: 'tagModal',
};

import React from 'react';
import { action } from '@storybook/addon-actions';
import AlertModal from 'components/Global/AlertModal';

export default {
  title: 'containers/AlertModal',
  component: AlertModal,
  args: {
    title: '경고',
    message: '잘못된 정보입니다',
    cancelMsg: '취소',
    confirmMsg: '확인',
    onConfirm: action('click'),
    closeModal: action('click'),
  },
};

const Template = (args) => <AlertModal {...args} />;

export const Default = Template.bind({});

export const OnlyCancel = Template.bind({});
OnlyCancel.args = {
  cancelMsg: '취소',
  confirmMsg: '',
};

export const OnlyConfirm = Template.bind({});
OnlyConfirm.args = {
  cancelMsg: '',
  confirmMsg: '확인',
};

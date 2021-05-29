import React from 'react';
import { action } from '@storybook/addon-actions';
import ModalHeader from 'components/Layout/Modal/ModalHeader';

export default {
  title: 'components/ModalHeader',
  component: ModalHeader,
  args: {
    title: '모달 제목',
    styleName: '',
    closeModal: action('click'),
  },
};

const Template = (args) => <ModalHeader {...args} />;

export const Default = Template.bind({});

export const Alert = Template.bind({});
Alert.args = {
  title: '경고!',
  styleName: 'alert',
};

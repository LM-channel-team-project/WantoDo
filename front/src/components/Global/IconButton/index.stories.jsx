import React from 'react';
import { action } from '@storybook/addon-actions';
import * as icons from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';
import { IoIosArrowForward } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
import IconButton from 'components/Global/IconButton';

export default {
  title: 'components/IconButton',
  component: IconButton,
  argTypes: {
    styleName: { control: 'text' },
    Icon: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: 'select',
        labels: Object.keys(icons).reduce((obj, key) => {
          const copied = { ...obj };
          copied[key] = key;
          return copied;
        }, {}),
      },
    },
    children: { control: 'text' },
    type: { control: { type: 'radio', options: ['button', 'submit'] } },
    onClick: { control: false },
  },
  args: {
    Icon: icons.AiFillAccountBook,
    children: '',
    type: '',
    styleName: '',
    onClick: action('onClick'),
  },
};

const Template = (args) => <IconButton {...args} />;

export const Default = Template.bind({});

export const WithText = Template.bind({});
WithText.args = {
  Icon: icons.AiOutlineGoogle,
  children: 'text',
};

export const GoogleLogin = Template.bind({});
GoogleLogin.args = {
  Icon: icons.AiOutlineGoogle,
  styleName: 'loginbutton',
  children: '구글 계정으로 시작하기',
};

export const TagDelete = Template.bind({});
TagDelete.args = {
  Icon: TiDelete,
  styleName: 'tagDelete',
};

export const Arrowbutton = Template.bind({});
Arrowbutton.args = {
  Icon: IoIosArrowForward,
  styleName: 'arrowbutton',
};

export const QuickAddFormIcon = Template.bind({});
QuickAddFormIcon.args = {
  Icon: FaPlus,
  styleName: 'QuickAddForm__icon',
};

export const TodoDeleteButton = Template.bind({});
TodoDeleteButton.args = {
  Icon: icons.AiFillDelete,
  styleName: 'todoDeleteButton',
};

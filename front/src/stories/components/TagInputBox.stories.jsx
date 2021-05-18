import React from 'react';
import { action } from '@storybook/addon-actions';
import TagInputBox from '../../components/TagInputBox';

export default {
  title: 'components/TagInputBox',
  component: TagInputBox,
  argTypes: {
    tags: { control: 'array' },
    inputName: { control: false },
    validator: { control: false },
    placeholder: { control: 'text' },
    setTags: { control: false },
  },
  args: {
    tags: [
      { id: '1', name: 'tag', color: 'yellow' },
      { id: '2', name: 'tag', color: 'blue' },
    ],
    inputName: '',
    validator: '',
    placeholder: '',
    setTags: action('setTags'),
  },
};

const Template = (args) => <TagInputBox {...args} />;

export const Default = Template.bind({});

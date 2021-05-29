import React from 'react';
import { action } from '@storybook/addon-actions';
import TagButton from 'components/Global/TagButton';

export default {
  title: 'components/TagButton',
  component: TagButton,
  argTypes: {
    tagId: { control: false },
    name: { control: 'text' },
    color: { control: 'text' },
    onClick: { control: false },
    onDelete: { control: false },
  },
  args: {
    tagId: '',
    name: 'tag',
    color: '',
    onClick: action('onClick'),
    onDelete: action('onDelete'),
  },
};

const Template = (args) => <TagButton {...args} />;

export const Default = Template.bind({});

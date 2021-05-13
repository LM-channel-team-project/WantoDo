import React from 'react';
import Tag from '../../components/Tag';

export default {
  title: 'components/Tag',
  component: Tag,
  argTypes: {
    name: { control: 'text' },
    color: { control: 'text' },
    children: { control: 'text' },
    styleName: { control: 'text' },
  },
  args: {
    name: 'tag',
    color: '',
    children: '',
    styleName: '',
  },
};

const Template = (args) => <Tag {...args} />;

export const Default = Template.bind({});

export const Red = Template.bind({});
Red.args = {
  color: 'red',
};

export const Orenge = Template.bind({});
Orenge.args = {
  color: 'orenge',
};

export const Yellow = Template.bind({});
Yellow.args = {
  color: 'yellow',
};

export const Blue = Template.bind({});
Blue.args = {
  color: 'blue',
};

export const Green = Template.bind({});
Green.args = {
  color: 'green',
};

export const Purple = Template.bind({});
Purple.args = {
  color: 'purple',
};

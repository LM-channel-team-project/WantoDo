import React from 'react';
import { AiFillAliwangwang, AiFillAppstore, AiFillBuild } from 'react-icons/ai';
import MenuSelector from '../../components/MenuSelector';

export default {
  title: 'components/MenuSelector',
  component: MenuSelector,
  argTypes: {
    iconList: { control: false },
    styleName: { control: 'text' },
  },
  args: {
    iconList: { AiFillAliwangwang, AiFillAppstore, AiFillBuild },
    styleName: 'sideMenu',
  },
};

const Template = (args) => <MenuSelector {...args} />;

export const Default = Template.bind({});

export const TwoIcons = Template.bind({});
TwoIcons.args = {
  iconList: { AiFillAppstore, AiFillBuild },
};

export const OneIcons = Template.bind({});
OneIcons.args = {
  iconList: { AiFillBuild },
};

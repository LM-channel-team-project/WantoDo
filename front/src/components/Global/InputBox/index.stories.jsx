import React from 'react';
import InputBox from 'components/Global/InputBox';

export default {
  title: 'components/InputBox',
  component: InputBox,
  argTypes: {
    labelText: { control: 'text' },
    afterText: { control: 'text' },
    styleName: { control: 'text' },
  },
  args: {
    labelText: 'label',
    afterText: '',
    styleName: '',
  },
};

const Template = (args) => <InputBox {...args} />;

export const Default = Template.bind({});

export const WithoutText = Template.bind({});
WithoutText.args = {
  labelText: '',
};

export const TutorialText = Template.bind({});
TutorialText.args = {
  labelText: 'label',
  styleName: 'tutorial',
};

export const TutorialTextarea = Template.bind({});
TutorialTextarea.args = {
  styleName: 'tutorial',
  labelText: 'label',
  type: 'textarea',
  rows: 3,
  cols: 15,
  maxLength: 30,
};

export const ProfileModalMotto = Template.bind({});
ProfileModalMotto.args = {
  labelText: 'label',
  styleName: 'profileModal__motto',
};

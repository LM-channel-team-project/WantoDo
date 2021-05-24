import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import TagInputBox from '../../components/TagInputBox';

const store = {
  getState: () => {},
  subscribe: () => {},
  dispatch: action('dispatch'),
};

export default {
  title: 'components/TagInputBox',
  component: TagInputBox,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  argTypes: {
    token: { control: 'text' },
    placeholder: { control: 'text' },
    tags: { control: 'array' },
    tagList: { control: 'object' },
    setTags: { control: false },
    updateTag: { control: false },
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

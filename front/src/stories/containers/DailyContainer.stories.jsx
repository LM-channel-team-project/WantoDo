import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import DailyContainer from '../../container/DailyContainer';

const store = {
  getState: () => {
    return {
      token: '',
      tasks: {
        1: {
          level: 0,
          checked: false,
          content: 'very long task very long task very long task very long task very long task',
          periods: { start: Date.now(), end: Date.now() },
          tags: [
            { tagId: 1, name: 'tag1', color: '#FF98A5' },
            { tagId: 2, name: 'tag2', color: '#FFC8A8' },
            { tagId: 3, name: 'ThisIsTag', color: '#ACE8FF' },
            { tagId: 4, name: 'yamiyami', color: '#B9FFBD' },
            { tagId: 5, name: 'purpleTag', color: '#D4B4FF' },
            { tagId: 6, name: 'veryverylongtag', color: '#FEFF84' },
          ],
        },
        2: {
          level: 1,
          checked: false,
          content: 'task2',
          periods: { start: Date.now(), end: Date.now() },
          tags: [
            { tagId: 3, name: 'ThisIsTag', color: '#ACE8FF' },
            { tagId: 4, name: 'yamiyami', color: '#B9FFBD' },
          ],
        },
        3: {
          level: 2,
          checked: false,
          content: 'task3',
          periods: { start: Date.now(), end: Date.now() },
        },
        4: {
          level: 3,
          checked: false,
          content: 'task4',
          periods: { start: Date.now(), end: Date.now() },
          tags: [
            { tagId: 11, name: 'mynameiswantodo', color: '#FF98A5' },
            { tagId: 10, name: 'hififteenlength', color: '#FFC8A8' },
            { tagId: 9, name: 'muchlonglongtag', color: '#ACE8FF' },
            { tagId: 8, name: 'longlonglongtag', color: '#B9FFBD' },
            { tagId: 7, name: 'verylonglongtag', color: '#D4B4FF' },
            { tagId: 6, name: 'veryverylongtag', color: '#FEFF84' },
          ],
        },
      },
      tags: {
        1: { tagId: 1, name: 'tag1', color: '#FF98A5' },
        2: { tagId: 2, name: 'tag2', color: '#FFC8A8' },
        3: { tagId: 3, name: 'ThisIsTag', color: '#ACE8FF' },
        4: { tagId: 4, name: 'yamiyami', color: '#B9FFBD' },
        5: { tagId: 5, name: 'purpleTag', color: '#D4B4FF' },
        6: { tagId: 6, name: 'veryverylongtag', color: '#FEFF84' },
        7: { tagId: 7, name: 'verylonglongtag', color: '#D4B4FF' },
        8: { tagId: 8, name: 'longlonglongtag', color: '#B9FFBD' },
        9: { tagId: 9, name: 'muchlonglongtag', color: '#ACE8FF' },
        10: { tagId: 10, name: 'hififteenlength', color: '#FFC8A8' },
        11: { tagId: 11, name: 'mynameiswantodo', color: '#FF98A5' },
      },
      updateTasks: action('update'),
      getTags: action('tags'),
    };
  },
  subscribe: () => {},
  dispatch: action('dispatch'),
};

export default {
  title: 'containers/DailyContainer',
  component: DailyContainer,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  args: {
    current: '2021-05-25',
  },
};

const Template = (args) => <DailyContainer {...args} />;

export const Default = Template.bind({});

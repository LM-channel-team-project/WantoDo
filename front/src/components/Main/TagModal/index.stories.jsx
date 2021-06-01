import React from 'react';
import { Provider } from 'react-redux';
import TagModal from 'components/Main/TagModal';

const tags = {
  '103d5382-af5f-4825-a2fe-a3496cd32ca3': {
    tagId: '103d5382-af5f-4825-a2fe-a3496cd32ca3',
    name: '태그1',
    color: '#D4B4FF',
  },
  '6a00088f-937e-4239-93ba-32d5d737a3e7': {
    tagId: '6a00088f-937e-4239-93ba-32d5d737a3e7',
    name: '태그2',
    color: '#FEFF84',
  },
  'cc9131cd-24e5-43ca-b0c9-c06839709d0d': {
    tagId: 'cc9131cd-24e5-43ca-b0c9-c06839709d0d',
    name: '태그3',
    color: '#FF98A5',
  },
  'cafc377e-a08f-46d2-9b8b-875b6fbb2585': {
    tagId: 'cafc377e-a08f-46d2-9b8b-875b6fbb2585',
    name: '태그4',
    color: '#ACE8FF',
  },
  '5cac0cfa-057f-4634-af00-ca54b64307ac': {
    tagId: '5cac0cfa-057f-4634-af00-ca54b64307ac',
    name: '태그5',
    color: '#D4B4FF',
  },
  'a3e8c889-ca50-47a4-a3d6-fab31740ff7e': {
    tagId: 'a3e8c889-ca50-47a4-a3d6-fab31740ff7e',
    name: '태그6',
    color: '#B9FFBD',
  },
  '8baa4a85-f858-4747-ac57-c0c0cf46f1f3': {
    tagId: '8baa4a85-f858-4747-ac57-c0c0cf46f1f3',
    name: '태그7',
    color: '#D4B4FF',
  },
};

const store = {
  getState: () => {
    return { token: '', tags };
  },
  subscribe: () => {},
};

export default {
  title: 'containers/TagModal',
  component: TagModal,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

const Template = (args) => <TagModal {...args} />;

export const Default = Template.bind({});

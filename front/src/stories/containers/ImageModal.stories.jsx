import React from 'react';
import ImageModal from '../../container/ImageModal';

export default {
  title: 'containers/ImageModal',
  component: ImageModal,
  args: {
    imageList: [0, 1, 2],
    styleName: '',
  },
};

const Template = (args) => <ImageModal {...args} />;

export const Default = Template.bind({});

export const FourImages = Template.bind({});
FourImages.args = {
  imageList: [0, 1, 2, 'https://picsum.photos/200/200'],
};

export const Small = Template.bind({});
Small.args = {
  styleName: 'small',
};

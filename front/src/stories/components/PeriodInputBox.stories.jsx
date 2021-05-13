import React from 'react';
import PeriodInputBox from '../../components/PeriodInputBox';

const refs = {
  year: undefined,
  month: undefined,
  date: undefined,
  hours: undefined,
  mins: undefined,
  division: undefined,
};

export default {
  title: 'components/PeriodInputBox',
  component: PeriodInputBox,
  argTypes: {
    refs: { control: false },
    periods: { control: 'object' },
  },
  args: {
    refs: { startRef: refs, endRef: refs },
    periods: { start: Date.now(), end: Date.now() + 3600000 },
  },
};

const Template = (args) => <PeriodInputBox {...args} />;

export const Default = Template.bind({});

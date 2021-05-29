import React from 'react';
import WithdrawalModal from 'components/Main/WithdrawalModal';

export default {
  title: 'containers/WithdrawalModal',
  component: WithdrawalModal,
};

const Template = (args) => <WithdrawalModal {...args} />;

export const Default = Template.bind({});
Default.args = {};

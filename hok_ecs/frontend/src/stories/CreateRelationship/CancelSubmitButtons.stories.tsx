import CancelSubmitButtons from '../../routes/createRelationship/CancelSubmitButtons';

export default {
  title: 'CreateRelationship/CancelSubmitButtons',
  component: CancelSubmitButtons,
  argTypes: {
    onCancel: { action: 'cancel' },
    onSubmit: { action: 'submit' },
  },
};

export const Default = {
  args: {
    canSubmit: false,
    loading: false,
  },
};

export const Loading = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const Enabled = {
  args: {
    ...Default.args,
    canSubmit: true,
  },
};

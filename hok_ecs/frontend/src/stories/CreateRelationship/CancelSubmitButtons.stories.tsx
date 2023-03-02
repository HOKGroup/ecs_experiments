import { StoryObj } from '@storybook/react';
import CancelSubmitButtons from '../../routes/createRelationship/CancelSubmitButtons';

export default {
  title: 'CreateRelationship/CancelSubmitButtons',
  component: CancelSubmitButtons,
  argTypes: {
    onCancel: { action: 'cancel' },
    onSubmit: { action: 'submit' },
  },
};

type Story = StoryObj<typeof CancelSubmitButtons>;

export const Default: Story = {
  args: {
    canSubmit: false,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const Enabled: Story = {
  args: {
    ...Default.args,
    canSubmit: true,
  },
};

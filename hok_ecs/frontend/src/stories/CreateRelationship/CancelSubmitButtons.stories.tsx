import { Meta, StoryObj } from '@storybook/react';
import CancelSubmitButtons from '../../routes/createRelationship/CancelSubmitButtons';

const meta: Meta<typeof CancelSubmitButtons> = {
  title: 'CreateRelationship/CancelSubmitButtons',
  component: CancelSubmitButtons,
  argTypes: {
    onCancel: { action: 'cancel' },
    onSubmit: { action: 'submit' },
  },
};

export default meta;

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

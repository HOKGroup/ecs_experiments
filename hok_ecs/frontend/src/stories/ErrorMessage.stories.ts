import { StoryObj } from '@storybook/react';
import ErrorMessage from '../components/ErrorMessage';

export default {
  component: ErrorMessage,
};

type Story = StoryObj<typeof ErrorMessage>;

export const Err: Story = {
  args: {
    error: new Error('My Error'),
  },
};

import { StoryObj } from '@storybook/react';
import LoadingSpinner from '../components/LoadingSpinner';

export default { component: LoadingSpinner };

export const Default = {
  args: {},
};

type Story = StoryObj<typeof LoadingSpinner>;

export const Sized: Story = {
  args: {
    size: 100,
  },
};

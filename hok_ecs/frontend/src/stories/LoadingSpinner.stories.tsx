import { Meta, StoryObj } from '@storybook/react';
import LoadingSpinner from '../components/LoadingSpinner';

const meta: Meta<typeof LoadingSpinner> = { component: LoadingSpinner };

export default meta;

export const Default = {
  args: {},
};

type Story = StoryObj<typeof LoadingSpinner>;

export const Sized: Story = {
  args: {
    size: 100,
  },
};

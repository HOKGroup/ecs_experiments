import { Meta, StoryObj } from '@storybook/react';
import React, { ComponentType } from 'react';
import LoadingBar from '../components/LoadingBar';

const meta: Meta<typeof LoadingBar> = {
  component: LoadingBar,
  decorators: [
    (Story: ComponentType) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof LoadingBar>;

export const Loading: Story = {
  args: {
    loading: true,
  },
};

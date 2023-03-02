import { StoryObj } from '@storybook/react';
import React, { ComponentType } from 'react';
import LoadingBar from '../components/LoadingBar';

export default {
  component: LoadingBar,
  decorators: [
    (Story: ComponentType) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

type Story = StoryObj<typeof LoadingBar>;

export const Loading: Story = {
  args: {
    loading: true,
  },
};

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

export const Loading = {
  args: {
    loading: true,
  },
};

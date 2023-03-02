import { StoryObj } from '@storybook/react';
import NoMatch from '../routes/NoMatch';

export default {
  component: NoMatch,
  parameters: {
    layout: 'fullscreen',
  },
};

type Story = StoryObj<typeof NoMatch>;

export const Default: Story = {
  args: {},
};

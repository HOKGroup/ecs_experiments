import { Meta, StoryObj } from '@storybook/react';
import NoMatch from '../routes/NoMatch';

const meta: Meta<typeof NoMatch> = {
  component: NoMatch,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof NoMatch>;

export const Default: Story = {
  args: {},
};

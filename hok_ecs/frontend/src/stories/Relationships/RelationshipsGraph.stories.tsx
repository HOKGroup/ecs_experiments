import { Meta, StoryObj } from '@storybook/react';
import React, { ComponentType } from 'react';
import RelationshipsGraph from '../../routes/relationships/RelationshipsGraph';
import { UrqlProvider } from '../../urqlClient';

const meta: Meta<typeof RelationshipsGraph> = {
  title: 'Relationships/RelationshipsGraph',
  component: RelationshipsGraph,
  decorators: [
    (Story: ComponentType) => (
      <UrqlProvider>
        <Story />
      </UrqlProvider>
    ),
  ],
  argTypes: {
    setSelectedNode: { action: 'selectNode' },
  },
};

export default meta;

type Story = StoryObj<typeof RelationshipsGraph>;

export const Default: Story = {
  args: {},
};

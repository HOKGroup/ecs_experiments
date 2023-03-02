import React, { ComponentType } from 'react';
import { SelectedNode } from '../../routes/Relationships';
import RelationshipsGraph from '../../routes/relationships/RelationshipsGraph';
import { UrqlProvider } from '../../urqlClient';

export default {
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

export const Default = {
  args: {},
};

import { Meta, StoryObj } from '@storybook/react';
import React, { ComponentType } from 'react';
import Relationship from '../../routes/createRelationship/Relationship';
import { UrqlProvider } from '../../urqlClient';

const meta: Meta<typeof Relationship> = {
  title: 'CreateRelationship/Relationship',
  component: Relationship,
  decorators: [
    (Story: ComponentType) => (
      <UrqlProvider>
        <Story />
      </UrqlProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Relationship>;

export const Default: Story = {
  args: {},
};

export const WithValues: Story = {
  args: {
    sourceValue: {
      type: 'entity',
      entityGuid: 'some uuid',
      label: 'My Source Entity',
    },
    destinationValue: {
      type: 'component',
      entityGuid: 'some entity uuid',
      componentGuid: 'some component guid',
      label: 'My Destination Component',
    },
    relationshipType: {
      label: 'Member Of',
      value: 'memberOf',
    },
  },
};

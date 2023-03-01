import React, { ComponentType } from 'react';
import Relationship from '../../routes/createRelationship/Relationship';
import { UrqlProvider } from '../../urqlClient';

export default {
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

export const Default = {
  args: {},
};

export const WithValues = {
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

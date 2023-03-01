import React, { ComponentType } from 'react';
import DataPanel from '../../routes/createRelationship/DataPanel';
import { UrqlProvider } from '../../urqlClient';

export default {
  title: 'CreateRelationship/DataPanel',
  component: DataPanel,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story: ComponentType) => (
      <UrqlProvider>
        <Story />
      </UrqlProvider>
    ),
  ],
  argTypes: {
    setType1: { action: 'setType1' },
    setType2: { action: 'setType2' },
    setValue1: { action: 'setValue1' },
    setValue2: { action: 'setValue2' },
  },
};

export const Default = {
  args: {
    type1: undefined,
    type2: undefined,
    value1: undefined,
    value2: undefined,
  },
};

export const EntityTypeSelected = {
  args: {
    ...Default.args,
    type1: {
      type: 'entity',
      entityClassification: 'person',
      label: 'Person',
    },
  },
};

export const ComponentTypeSelected = {
  args: {
    ...Default.args,
    type1: {
      type: 'component',
      componentType: 'person.details',
      label: 'person.details',
    },
  },
};

export const EntityAndComponentTypeSelected = {
  args: {
    ...Default.args,
    type1: {
      type: 'entity',
      entityClassification: 'person',
      label: 'Person',
    },
    value1: {
      type: 'entity',
      entityGuid: '68b5ff48-7fbb-4b6d-8371-abf7ceabe049',
      label: 'Anabelle.Rosario',
    },
    type2: {
      type: 'component',
      componentType: 'person.details',
      label: 'person.details',
    },
  },
};

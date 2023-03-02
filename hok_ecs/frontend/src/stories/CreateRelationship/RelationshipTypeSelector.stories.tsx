import { Meta, StoryObj } from '@storybook/react';
import RelationshipTypeSelector from '../../routes/createRelationship/RelationshipTypeSelector';

const meta: Meta<typeof RelationshipTypeSelector> = {
  title: 'CreateRelationship/RelationshipTypeSelector',
  component: RelationshipTypeSelector,
  argTypes: {
    onSelect: { action: 'select' },
  },
};

export default meta;

type Story = StoryObj<typeof RelationshipTypeSelector>;

export const Default: Story = {
  args: {},
};

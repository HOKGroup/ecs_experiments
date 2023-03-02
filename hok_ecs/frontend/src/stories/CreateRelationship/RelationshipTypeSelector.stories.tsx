import { StoryObj } from '@storybook/react';
import RelationshipTypeSelector from '../../routes/createRelationship/RelationshipTypeSelector';

export default {
  title: 'CreateRelationship/RelationshipTypeSelector',
  component: RelationshipTypeSelector,
  argTypes: {
    onSelect: { action: 'select' },
  },
};

type Story = StoryObj<typeof RelationshipTypeSelector>;

export const Default: Story = {
  args: {},
};

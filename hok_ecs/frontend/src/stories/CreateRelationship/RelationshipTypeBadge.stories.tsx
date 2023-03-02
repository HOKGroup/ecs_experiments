import { StoryObj } from '@storybook/react';
import RelationshipTypeBadge from '../../routes/createRelationship/RelationshipTypeBadge';

export default {
  title: 'CreateRelationship/RelationshipTypeBadge',
  component: RelationshipTypeBadge,
  argTypes: {
    relationshipType: {
      control: 'text',
    },
  },
};

type Story = StoryObj<typeof RelationshipTypeBadge>;

export const Default: Story = {
  args: {
    relationshipType: undefined,
  },
};

export const WithValue: Story = {
  args: {
    relationshipType: 'Member Of',
  },
};

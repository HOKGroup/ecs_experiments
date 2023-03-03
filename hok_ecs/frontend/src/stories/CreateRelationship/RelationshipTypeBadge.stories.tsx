import { Meta, StoryObj } from '@storybook/react';
import RelationshipTypeBadge from '../../routes/createRelationship/RelationshipTypeBadge';

const meta: Meta<typeof RelationshipTypeBadge> = {
  title: 'CreateRelationship/RelationshipTypeBadge',
  component: RelationshipTypeBadge,
  argTypes: {
    relationshipType: {
      control: 'text',
    },
  },
};

export default meta;

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

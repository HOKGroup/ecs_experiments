import { StoryObj } from '@storybook/react';
import RelationshipMemberBadge from '../../routes/createRelationship/RelationshipMemberBadge';

export default {
  title: 'CreateRelationship/RelationshipMemberBadge',
  component: RelationshipMemberBadge,
  parameters: {
    backgrounds: {
      disable: false,
      default: 'light',
    },
  },
  argTypes: {
    value: {
      control: 'text',
    },
  },
};

type Story = StoryObj<typeof RelationshipMemberBadge>;

export const Default: Story = {
  args: {
    value: undefined,
    defaultValue: 'Default Value',
  },
};

export const WithValue: Story = {
  args: {
    value: 'My Value',
    defaultValue: 'Default Value',
  },
  parameters: {
    backgrounds: {
      disable: true,
    },
  },
};

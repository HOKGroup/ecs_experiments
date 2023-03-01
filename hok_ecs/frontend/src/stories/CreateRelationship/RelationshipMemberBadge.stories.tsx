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

export const Default = {
  args: {
    value: undefined,
    defaultValue: 'Default Value',
  },
};

export const WithValue = {
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

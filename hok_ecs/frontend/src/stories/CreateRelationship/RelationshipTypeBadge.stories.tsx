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

export const Default = {
  args: {
    relationshipType: undefined,
  },
};

export const WithValue = {
  args: {
    relationshipType: 'Member Of',
  },
};

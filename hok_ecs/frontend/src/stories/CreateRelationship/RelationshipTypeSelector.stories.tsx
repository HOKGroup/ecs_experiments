import RelationshipTypeSelector from '../../routes/createRelationship/RelationshipTypeSelector';

export default {
  title: 'CreateRelationship/RelationshipTypeSelector',
  component: RelationshipTypeSelector,
  argTypes: {
    onSelect: { action: 'select' },
  },
};

export const Default = {
  args: {},
};

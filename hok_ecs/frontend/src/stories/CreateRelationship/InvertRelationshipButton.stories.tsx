import InvertRelationshipButton from '../../routes/createRelationship/InvertRelationshipButton';

export default {
  title: 'CreateRelationship/InvertRelationshipButton',
  component: InvertRelationshipButton,
  argTypes: {
    onClick: { action: 'click' },
  },
};

export const Disabled = {
  args: {
    canInvert: false,
  },
};

export const Enabled = {
  args: {
    canInvert: true,
  },
};

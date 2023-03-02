import { StoryObj } from '@storybook/react';
import InvertRelationshipButton from '../../routes/createRelationship/InvertRelationshipButton';

export default {
  title: 'CreateRelationship/InvertRelationshipButton',
  component: InvertRelationshipButton,
  argTypes: {
    onClick: { action: 'click' },
  },
};

type Story = StoryObj<typeof InvertRelationshipButton>;

export const Disabled: Story = {
  args: {
    canInvert: false,
  },
};

export const Enabled: Story = {
  args: {
    canInvert: true,
  },
};

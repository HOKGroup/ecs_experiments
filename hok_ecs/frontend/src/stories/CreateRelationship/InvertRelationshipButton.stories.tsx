import { Meta, StoryObj } from '@storybook/react';
import InvertRelationshipButton from '../../routes/createRelationship/InvertRelationshipButton';

const meta: Meta<typeof InvertRelationshipButton> = {
  title: 'CreateRelationship/InvertRelationshipButton',
  component: InvertRelationshipButton,
  argTypes: {
    onClick: { action: 'click' },
  },
};

export default meta;

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

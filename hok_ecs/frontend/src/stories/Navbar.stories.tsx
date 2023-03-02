import { StoryObj } from '@storybook/react';
import React, { ComponentType } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';

export default {
  component: Navbar,
  decorators: [
    (Story: ComponentType) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {},
};

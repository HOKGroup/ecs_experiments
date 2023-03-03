import { Meta, StoryObj } from '@storybook/react';
import React, { ComponentType } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';

const meta: Meta<typeof Navbar> = {
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

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {},
};

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

export const Default = {
  args: {},
};

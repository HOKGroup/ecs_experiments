import { Decorator, Preview } from '@storybook/react';

import '../src/index.scss';

const preview: Preview = {
  parameters: {
    backgrounds: {
      disable: true,
    },
    layout: 'centered',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

import ErrorMessage from '../components/ErrorMessage';

export default {
  component: ErrorMessage,
};

export const Err = {
  args: {
    error: new Error('My Error'),
  },
};

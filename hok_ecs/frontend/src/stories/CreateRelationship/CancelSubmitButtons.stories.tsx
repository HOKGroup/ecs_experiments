import React, { ComponentType } from 'react';
import CancelSubmitButtons from '../../routes/createRelationship/CancelSubmitButtons';
import Row from 'react-bootstrap/Row';

export default {
  title: 'CreateRelationship/CancelSubmitButtons',
  component: CancelSubmitButtons,
  argTypes: {
    onCancel: { action: 'cancel' },
    onSubmit: { action: 'submit' },
  },
  decorators: [
    (Story: ComponentType) => (
      <Row className="d-flex flex-column justify-content-between" style={{ width: '500px' }}>
        <Story />
      </Row>
    ),
  ],
};

export const Default = {
  args: {
    canSubmit: false,
    loading: false,
  },
};

export const Loading = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const Enabled = {
  args: {
    ...Default.args,
    canSubmit: true,
  },
};

import React from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import CursorToggle from './CursorToggle';

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
}

const CancelSubmitButtons: React.FC<Props> = ({
  onCancel,
  onSubmit,
  canSubmit,
}) => {
  return (
    <Row className="p-5">
      <Col xl="4" />
      <Col xl="4" lg="4" className="text-center d-flex justify-content-around">
        <Button size="lg" variant="warning" onClick={onCancel}>
          Cancel
        </Button>
        <CursorToggle enabled={canSubmit}>
          <Button
            size="lg"
            variant={canSubmit ? 'primary' : 'outline-primary'}
            disabled={!canSubmit}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </CursorToggle>
      </Col>
      <Col xl="4" />
    </Row>
  );
};

export default CancelSubmitButtons;

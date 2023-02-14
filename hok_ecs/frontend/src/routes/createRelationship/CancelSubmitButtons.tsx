import React from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import CursorToggle from '../../components/CursorToggle';

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
  loading: boolean;
}

const CancelSubmitButtons: React.FC<Props> = ({
  onCancel,
  onSubmit,
  canSubmit,
  loading,
}) => {
  return (
    <Row className="p-2">
      <Col xl="4" />
      <Col xl="4" lg="4" className="text-center d-flex justify-content-around">
        <Button size="lg" variant="warning" onClick={onCancel}>
          Cancel
        </Button>
        <CursorToggle enabled={canSubmit}>
          <Button
            size="lg"
            variant={canSubmit ? 'primary' : 'outline-primary'}
            disabled={loading || !canSubmit}
            onClick={onSubmit}
          >
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </CursorToggle>
      </Col>
      <Col xl="4" />
    </Row>
  );
};

export default CancelSubmitButtons;

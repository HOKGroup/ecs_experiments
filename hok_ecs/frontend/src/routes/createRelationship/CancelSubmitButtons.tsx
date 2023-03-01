import React from 'react';
import Button from 'react-bootstrap/Button';
import CursorToggle from '../../components/CursorToggle';

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
  loading: boolean;
}

const CancelSubmitButtons: React.FC<Props> = ({ onCancel, onSubmit, canSubmit, loading }) => {
  return (
    <div className="p-2">
      <div className="text-center d-flex justify-content-center">
        <CursorToggle enabled={!loading}>
          <Button
            className="mx-5"
            size="lg"
            variant="warning"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        </CursorToggle>
        <CursorToggle enabled={canSubmit}>
          <Button
            className="mx-5"
            size="lg"
            variant={canSubmit ? 'primary' : 'outline-primary'}
            disabled={loading || !canSubmit}
            onClick={onSubmit}
          >
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </CursorToggle>
      </div>
    </div>
  );
};

export default CancelSubmitButtons;

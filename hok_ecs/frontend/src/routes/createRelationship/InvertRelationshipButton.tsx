import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsLeftRightToLine } from '@fortawesome/free-solid-svg-icons';
import CursorToggle from '../../components/CursorToggle';

interface Props {
  onClick: () => void;
  canInvert: boolean;
}

const InvertRelationshipButton: React.FC<Props> = ({ onClick, canInvert }) => {
  return (
    <CursorToggle enabled={canInvert}>
      <Button
        variant="light"
        onClick={onClick}
        className="border text-dark bg-gradient"
        disabled={!canInvert}
      >
        <FontAwesomeIcon icon={faArrowsLeftRightToLine} size="lg" />
        <br />
        {'Invert Relationship'}
      </Button>
    </CursorToggle>
  );
};

export default InvertRelationshipButton;

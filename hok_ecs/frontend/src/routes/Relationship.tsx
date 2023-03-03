import React from 'react';
import { useParams } from 'react-router-dom';

const Relationship: React.FC = () => {
  const { relationshipGuid } = useParams();

  return (
    <div>
      <div>RELATIONSHIP</div>
      <div>{relationshipGuid}</div>
    </div>
  );
};

export default Relationship;

import React, { memo } from 'react';
import './relationshipTypeBadge.css';

interface Props {
  relationshipType: string | undefined;
}

const RelationshipTypeBadge: React.FC<Props> = ({ relationshipType }) => {
  const bgClass = relationshipType ? 'primary' : 'secondary';

  return (
    <h4 className="py-4">
      <div
        className={`relationship__type__badge ${bgClass} p-4 rounded bg-gradient w-100`}
      >
        {!relationshipType && 'Select a Relationship Type'}
        {relationshipType && <strong>{relationshipType}</strong>}
      </div>
    </h4>
  );
};

export default memo(RelationshipTypeBadge);

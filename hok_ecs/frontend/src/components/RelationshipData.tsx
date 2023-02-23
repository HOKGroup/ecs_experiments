import React from 'react';
import Badge from 'react-bootstrap/Badge';

interface Props {
  relationship: {
    relationshipGuid: string;
    relationshipName?: string | null | undefined;
    relationshipType?: string | null | undefined;
  };
}

const RelationshipData: React.FC<Props> = ({ relationship }) => {
  return (
    <div>
      <h5>
        <Badge bg="warning">{relationship.relationshipType}</Badge>
      </h5>
      <div>
        <span>
          <strong>Relationship GUID: </strong>
        </span>
        <span>{relationship.relationshipGuid}</span>
      </div>
      <div>
        <span>
          <strong>Relationship Name: </strong>
        </span>
        <span>{relationship.relationshipName}</span>
      </div>
    </div>
  );
};

export default RelationshipData;

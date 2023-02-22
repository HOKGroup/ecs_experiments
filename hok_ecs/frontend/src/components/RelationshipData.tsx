import React from 'react';

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
      <div>
        <span>
          <strong>Relationship Type: </strong>
        </span>
        <span>{relationship.relationshipType}</span>
      </div>
    </div>
  );
};

export default RelationshipData;

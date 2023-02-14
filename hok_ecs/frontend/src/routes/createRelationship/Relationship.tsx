import React from 'react';
import {
  EntityOrComponentValue,
  RelationshipType,
} from '../CreateRelationship';
import RelationshipMemberBadge from './RelationshipMemberBadge';
import RelationshipTypeBadge from './RelationshipTypeBadge';

interface Props {
  sourceValue: EntityOrComponentValue | undefined;
  destinationValue: EntityOrComponentValue | undefined;
  relationshipType: RelationshipType | undefined;
}
const Relationship: React.FC<Props> = ({
  sourceValue,
  destinationValue,
  relationshipType,
}) => {
  return (
    <div className="bg-gradient text-center d-flex border border-2 rounded border-primary m-4 p-4 w-100 justify-content-center align-items-center">
      <div className="w-100">
        <RelationshipMemberBadge
          value={sourceValue?.label}
          defaultValue="Select a Source"
        />
        <RelationshipTypeBadge relationshipType={relationshipType?.label} />
        <RelationshipMemberBadge
          value={destinationValue?.label}
          defaultValue="Select a Destination"
        />
      </div>
    </div>
  );
};

export default Relationship;

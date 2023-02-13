import React from 'react';
import './relationshipMemberBadge.css';

interface Props {
  value: string | undefined;
  defaultValue: string;
}

const RelationshipMemberBadge: React.FC<Props> = ({ value, defaultValue }) => {
  return (
    <div className="px-4">
      <div className="relationship__member__badge p-4 rounded bg-light w-100 text-dark">
        {!value && defaultValue}
        {value || null}
      </div>
    </div>
  );
};

export default RelationshipMemberBadge;

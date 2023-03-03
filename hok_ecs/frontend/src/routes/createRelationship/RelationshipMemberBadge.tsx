import React from 'react';
import './relationshipMemberBadge.css';

interface Props {
  value: string | undefined;
  defaultValue: string;
}

const RelationshipMemberBadge: React.FC<Props> = ({ value, defaultValue }) => {
  const bgClass = value ? 'bg-light' : 'bg-dark';
  const textClass = value ? 'text-dark' : 'text-light';

  return (
    <div className="px-4">
      <div className={`relationship__member__badge p-4 rounded ${bgClass} ${textClass} w-100 `}>
        {!value && defaultValue}
        {value ?? null}
      </div>
    </div>
  );
};

export default RelationshipMemberBadge;

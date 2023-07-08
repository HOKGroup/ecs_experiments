import React from 'react';
import EntityDataLoader from '../../components/EntityDataLoader';
import ComponentDataLoader from '../../components/ComponentDataLoader';
import RelationshipDataLoader from '../../components/RelationshipDataLoader';

interface Props {
  type: 'entity' | 'component' | 'relationship';
  guid: string;
}

const DataPanel: React.FC<Props> = ({ type, guid }) => {
  return (
    <div
      style={{
        overflowY: 'auto',
      }}
      className="h-100 p-3 bg-gradient border border-2 border-primary rounded"
    >
      {type === 'entity' && <EntityDataLoader entityGuid={guid} />}
      {type === 'component' && <ComponentDataLoader componentGuid={guid} />}
      {type === 'relationship' && <RelationshipDataLoader relationshipGuid={guid} />}
    </div>
  );
};

export default DataPanel;

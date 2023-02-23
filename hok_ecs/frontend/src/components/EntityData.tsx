import React from 'react';
import Badge from 'react-bootstrap/Badge';

interface Props {
  entity: {
    entityGuid: string;
    entityClassification: string;
    context: string;
    contextId: string;
    classificationReference?: string | null | undefined;
  };
}

const EntityData: React.FC<Props> = ({ entity }) => {
  return (
    <div>
      <h4>
        <Badge>{entity.entityClassification}</Badge>
      </h4>
      <div>
        <span>
          <strong>Context: </strong>
        </span>
        <span>{entity.context}</span>
      </div>
      <div>
        <span>
          <strong>Entity GUID: </strong>
        </span>
        <span>{entity.entityGuid}</span>
      </div>
      <div>
        <span>
          <strong>Context ID: </strong>
        </span>
        <span>{entity.contextId}</span>
      </div>
      <div>
        <span>
          <strong>Classification Reference: </strong>
        </span>
        <span>{entity.classificationReference}</span>
      </div>
    </div>
  );
};

export default EntityData;

import React from 'react';

interface Props {
  component: {
    componentGuid: string;
    entityGuid: string;
    componentName?: string | null | undefined;
    componentType: string;
    context: string;
    entityClassification?: string | null | undefined;
    status?: string | null | undefined;
    payload: string;
  };
}

const ComponentData: React.FC<Props> = ({ component }) => {
  return (
    <div>
      <div>
        <span>
          <strong>Component GUID: </strong>
        </span>
        <span>{component.componentGuid}</span>
      </div>
      <div>
        <span>
          <strong>Entity GUID: </strong>
        </span>
        <span>{component.entityGuid}</span>
      </div>
      <div>
        <span>
          <strong>Component Name: </strong>
        </span>
        <span>{component.componentName}</span>
      </div>
      <div>
        <span>
          <strong>Component Type: </strong>
        </span>
        <span>{component.componentType}</span>
      </div>
      <div>
        <span>
          <strong>Component Context: </strong>
        </span>
        <span>{component.context}</span>
      </div>
      <div>
        <span>
          <strong>Entity Classification: </strong>
        </span>
        <span>{component.entityClassification}</span>
      </div>
      <div>
        <span>
          <strong>Status: </strong>
        </span>
        <span>{component.status}</span>
      </div>
      <div>
        <span>
          <strong>Payload: </strong>
        </span>
        <span>{component.payload}</span>
      </div>
    </div>
  );
};

export default ComponentData;

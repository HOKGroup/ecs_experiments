import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { getJsonSchema } from '../schemas';
import './componentData.css';

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
  const schema = getJsonSchema(component.componentType);

  return (
    <div>
      <h4>
        <Badge>{component.componentType}</Badge>
      </h4>
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
        <div className="bg-light p-2 rounded border border-2 component-data__payload">
          <JsonForms
            schema={schema}
            data={JSON.parse(component.payload) as unknown}
            renderers={materialRenderers}
            cells={materialCells}
            readonly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ComponentData;

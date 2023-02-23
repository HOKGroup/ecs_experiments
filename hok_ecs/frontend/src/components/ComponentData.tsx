import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import React, { useDeferredValue, useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { getJsonSchema } from '../schemas';
import './componentData.css';
import LoadingSpinner from './LoadingSpinner';
import Loader from './Loader';

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

  /* Defer payload data for JsonForms to ensure ComponentData initially renders without waiting
     for JsonForms to finish rendering */
  const [data, setData] = useState(undefined as unknown);
  const deferredData = useDeferredValue(data);

  useEffect(() => {
    setData(undefined);
    const parsedData = JSON.parse(component.payload) as unknown;
    setData(parsedData);
  }, [component.payload]);

  return (
    <div>
      <h5>
        <Badge bg="success">{component.componentType}</Badge>
      </h5>
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
          <Loader loading={deferredData === undefined}>
            <JsonForms
              schema={schema}
              data={deferredData}
              renderers={materialRenderers}
              cells={materialCells}
              readonly={true}
            />
          </Loader>
        </div>
      </div>
    </div>
  );
};

export default ComponentData;

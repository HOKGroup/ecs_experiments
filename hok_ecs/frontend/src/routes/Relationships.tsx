import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EntityDataLoader from '../components/EntityDataLoader';
import ComponentDataLoader from '../components/ComponentDataLoader';
import RelationshipDataLoader from '../components/RelationshipDataLoader';
import RelationshipsGraph from './relationships/RelationshipsGraph';
import DataPanel from './relationships/DataPanel';

export interface SelectedEntity {
  type: 'entity';
  value: string;
}

export interface SelectedComponent {
  type: 'component';
  value: string;
}

export interface SelectedRelationship {
  type: 'relationship';
  value: string;
}

export type SelectedNode = SelectedEntity | SelectedComponent | SelectedRelationship;

const Relationships: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState(undefined as SelectedNode | undefined);

  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <Row className="h-100 flex-grow-1">
        <Col>
          <RelationshipsGraph setSelectedNode={setSelectedNode} />
        </Col>
        {selectedNode && (
          <Col xl="4" className="align-items-start align-self-stretch">
            <DataPanel type={selectedNode.type} guid={selectedNode.value} />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Relationships;

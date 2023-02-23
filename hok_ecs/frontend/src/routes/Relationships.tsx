import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EntityDataLoader from '../components/EntityDataLoader';
import ComponentDataLoader from '../components/ComponentDataLoader';
import RelationshipDataLoader from '../components/RelationshipDataLoader';
import RelationshipsGraph from './relationships/RelationshipsGraph';

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
    <Row>
      <Col>
        <div className="bg-gradient border border-2 border-primary rounded">
          <RelationshipsGraph setSelectedNode={setSelectedNode} />
        </div>
      </Col>
      {selectedNode && (
        <Col xl="4">
          <div
            style={{
              height: '750px',
              overflowY: 'auto',
            }}
            className="p-3 bg-gradient border border-2 border-primary rounded"
          >
            {selectedNode.type === 'entity' && <EntityDataLoader entityGuid={selectedNode.value} />}
            {selectedNode.type === 'component' && (
              <ComponentDataLoader componentGuid={selectedNode.value} />
            )}
            {selectedNode.type === 'relationship' && (
              <RelationshipDataLoader relationshipGuid={selectedNode.value} />
            )}
          </div>
        </Col>
      )}
    </Row>
  );
};

export default Relationships;

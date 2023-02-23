import React, { useEffect, useMemo, useState } from 'react';
import VisGraph, { Node, GraphEvents, Network, Options } from 'react-vis-graph-wrapper';
import { useQuery } from 'urql';
import { graphql } from '../gql';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EntityDataLoader from '../components/EntityDataLoader';
import ComponentDataLoader from '../components/ComponentDataLoader';
import RelationshipDataLoader from '../components/RelationshipDataLoader';

const GraphQuery = graphql(`
  query Graph {
    graph {
      nodes {
        id
        label
        title: type
        group: type
      }
      edges {
        from
        to
      }
    }
  }
`);

interface SelectedEntity {
  type: 'entity';
  value: string;
}

interface SelectedComponent {
  type: 'component';
  value: string;
}

interface SelectedRelationship {
  type: 'relationship';
  value: string;
}

type SelectedNode = SelectedEntity | SelectedComponent | SelectedRelationship;

const Relationships: React.FC = () => {
  const [network, setNetwork] = useState(undefined as Network | null | undefined);

  const [selectedNode, setSelectedNode] = useState(undefined as SelectedNode | undefined);

  const [{ data, fetching, error }] = useQuery({
    query: GraphQuery,
  });

  useEffect(() => {
    if (network) {
      network.stabilize();
    }
  }, [network]);

  const nodeMap = useMemo(() => {
    const map = new Map<string, Node>();

    for (const node of data?.graph.nodes ?? []) {
      map.set(node.id, node);
    }

    return map;
  }, [data?.graph.nodes]);

  // FIXME: use Loader component
  if (fetching) return <div>LOADING</div>;
  if (error || !data) return <div>ERROR</div>;

  const graph = {
    nodes: data.graph.nodes,
    edges: data.graph.edges,
  };

  // #region networkOptions
  const options: Options = {
    height: '750',
    physics: {
      barnesHut: {
        gravitationalConstant: -3_000,
        avoidOverlap: 0.05,
      },
      stabilization: {
        fit: true,
      },
      minVelocity: 5,
    },
    edges: {
      color: 'white',
    },
    configure: {
      enabled: false,
    },
    groups: {
      RELATIONSHIP: {
        shape: 'box',
        color: {
          background: 'yellow',
        },
      },
      COMPONENT: {
        font: {
          color: 'white',
        },
        color: {
          background: 'green',
        },
      },
      ENTITY: {
        shape: 'circle',
        font: {
          color: 'white',
        },
        color: {
          background: 'blue',
        },
      },
    },
  };
  // #endregion

  const events: GraphEvents = {
    select: (event: { nodes: string[] }) => {
      const { nodes } = event;

      if (nodes[0]) {
        const node = nodeMap.get(nodes[0]);

        if (node) {
          const selected = {
            type: node.group?.toLowerCase() as 'entity' | 'component' | 'relationship',
            value: node.id as string,
          };

          setSelectedNode(selected);

          network?.focus(selected.value, { scale: 1.5 });
        }
      } else {
        setSelectedNode(undefined);
        network?.releaseNode();
      }
    },
  };

  return (
    <Row>
      <Col>
        <div className="bg-gradient border border-2 border-primary rounded">
          <VisGraph graph={graph} events={events} options={options} ref={setNetwork} />
        </div>
      </Col>
      {selectedNode && (
        <Col xl="4">
          <div
            style={{
              height: '750px',
              overflowWrap: 'anywhere',
              overflowY: 'scroll',
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

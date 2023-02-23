import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'urql';
import Loader from '../../components/Loader';
import { type SelectedNode } from '../Relationships';
import { graphql } from '../../gql';
import VisGraph, { Node, GraphEvents, Network, Options } from 'react-vis-graph-wrapper';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useElementSize } from 'usehooks-ts';

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

interface Props {
  setSelectedNode: (node: SelectedNode | undefined) => void;
  setGraphHeight: (height: number) => void;
}

const RelationshipsGraph: React.FC<Props> = ({ setSelectedNode, setGraphHeight }) => {
  const [ref, { height }] = useElementSize();

  useEffect(() => setGraphHeight(height), [setGraphHeight, height]);

  const [network, setNetwork] = useState(undefined as Network | null | undefined);

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

  // #region networkOptions
  const options: Options = {
    height: height.toString(),
    physics: {
      solver: 'forceAtlas2Based',
      forceAtlas2Based: {
        gravitationalConstant: -150,
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
    <div ref={ref} className="h-100">
      <Loader
        loading={fetching}
        error={error}
        loadingComponent={
          <div className="w-100" style={{ height: '750px' }}>
            <LoadingSpinner size={100} />
          </div>
        }
      >
        {data && <VisGraph graph={data.graph} events={events} options={options} ref={setNetwork} />}
      </Loader>
    </div>
  );
};

export default RelationshipsGraph;

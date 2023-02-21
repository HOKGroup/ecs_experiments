import React, { useState } from 'react';
import VisGraph, { Network } from 'react-vis-graph-wrapper';
import { useQuery } from 'urql';
import { graphql } from '../gql';

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

const Relationships: React.FC = () => {
  const [network, setNetwork] = useState(
    undefined as Network | null | undefined,
  );
  const [{ data, fetching, error }] = useQuery({
    query: GraphQuery,
  });

  if (fetching) return <div>LOADING</div>;
  if (error || !data) return <div>ERROR</div>;

  console.log('GRAPH DATA: ', data.graph);

  const graph = {
    nodes: data.graph.nodes,
    edges: data.graph.edges,
  };

  const options = {
    height: '750',
    edges: {
      color: 'white',
    },
    configure: {
      enabled: true,
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

  network?.fit();
  network?.stabilize();

  return <VisGraph graph={graph} options={options} ref={setNetwork} />;
};

export default Relationships;

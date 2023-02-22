import React from 'react';
import { graphql } from '../gql';
import { useQuery } from 'urql';
import RelationshipData from './RelationshipData';
import Loader from './Loader';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  relationshipGuid: string;
}

const RelationshipQuery = graphql(`
  query RelationshipQuery($relationshipGuid: ID!) {
    relationship(relationshipGuid: $relationshipGuid) {
      relationshipGuid
      relationshipName
      relationshipType
    }
  }
`);

const RelationshipDataLoader: React.FC<Props> = ({ relationshipGuid }) => {
  const [{ data, error, fetching }] = useQuery({
    query: RelationshipQuery,
    variables: {
      relationshipGuid,
    },
  });

  return (
    <Loader
      loading={fetching}
      error={error}
      loadingComponent={
        <div>
          <LoadingSpinner size={100} />
        </div>
      }
    >
      {data?.relationship && (
        <RelationshipData relationship={data.relationship} />
      )}
    </Loader>
  );
};

export default RelationshipDataLoader;

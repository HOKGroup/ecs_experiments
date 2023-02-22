import React from 'react';
import { graphql } from '../gql';
import { useQuery } from 'urql';
import EntityData from './EntityData';
import Loader from './Loader';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  entityGuid: string;
}

const EntityQuery = graphql(`
  query EntityQuery($entityGuid: ID!) {
    entity(entityGuid: $entityGuid) {
      entityGuid
      entityClassification
      context
      contextId
      classificationReference
    }
  }
`);

const EntityDataLoader: React.FC<Props> = ({ entityGuid }) => {
  const [{ data, error, fetching }] = useQuery({
    query: EntityQuery,
    variables: {
      entityGuid,
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
      {error && <div>ERROR</div>}
      {data?.entity && <EntityData entity={data.entity} />}
    </Loader>
  );
};

export default EntityDataLoader;

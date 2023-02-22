import React from 'react';
import { graphql } from '../gql';
import { useQuery } from 'urql';
import ComponentData from './ComponentData';
import Loader from './Loader';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  componentGuid: string;
}

const ComponentQuery = graphql(`
  query ComponentQuery($componentGuid: ID!) {
    component(componentGuid: $componentGuid) {
      componentGuid
      entityGuid
      componentName
      componentType
      context
      entityClassification
      status
      payload
    }
  }
`);

const ComponentDataLoader: React.FC<Props> = ({ componentGuid }) => {
  const [{ data, error, fetching }] = useQuery({
    query: ComponentQuery,
    variables: {
      componentGuid,
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
      {data?.component && <ComponentData component={data.component} />}
    </Loader>
  );
};

export default ComponentDataLoader;

import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { hasPresentKey } from 'ts-is-present';
import { useQuery } from 'urql';
import Loader from '../../components/Loader';
import LoadingBar from '../../components/LoadingBar';
import { graphql } from '../../gql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface Props {
  sourceEntityGuids?: string[];
  sourceComponentGuids?: string[];
  destinationEntityGuids?: string[];
  destinationComponentGuids?: string[];
}

const ExistingRelationshipsQuery = graphql(`
  query ExistingRelationshipsQuery(
    $sourceEntityGuids: [ID!]
    $sourceComponentGuids: [ID!]
    $destinationEntityGuids: [ID!]
    $destinationComponentGuids: [ID!]
  ) {
    relationships(
      sourceEntityGuids: $sourceEntityGuids
      sourceComponentGuids: $sourceComponentGuids
      destinationEntityGuids: $destinationEntityGuids
      destinationComponentGuids: $destinationComponentGuids
    ) {
      relationshipGuid
      relationshipType
    }
  }
`);

const ExistingRelationships: React.FC<Props> = ({
  sourceEntityGuids,
  sourceComponentGuids,
  destinationEntityGuids,
  destinationComponentGuids,
}) => {
  const [{ data: data1, fetching: fetching1, error: error1 }] = useQuery({
    query: ExistingRelationshipsQuery,
    variables: {
      sourceEntityGuids: sourceEntityGuids ?? [],
      sourceComponentGuids: sourceComponentGuids ?? [],
      destinationEntityGuids: destinationEntityGuids ?? [],
      destinationComponentGuids: destinationComponentGuids ?? [],
    },
  });

  const [{ data: data2, fetching: fetching2, error: error2 }] = useQuery({
    query: ExistingRelationshipsQuery,
    variables: {
      sourceEntityGuids: destinationEntityGuids ?? [],
      sourceComponentGuids: destinationComponentGuids ?? [],
      destinationEntityGuids: sourceEntityGuids ?? [],
      destinationComponentGuids: sourceComponentGuids ?? [],
    },
  });

  const fetching = fetching1 || fetching2;
  const error = error1 ?? error2;

  return (
    <div className="border border-2 border-primary rounded bg-gradient p-2 my-auto d-flex flex-column align-items-center">
      <h5>
        <strong>Existing Relationships</strong>
      </h5>
      <Loader
        loading={fetching}
        error={error}
        loadingComponent={<LoadingBar className="w-100 my-4 position-relative" loading={true} />}
      >
        <div className="d-flex justify-content-evenly my-4">
          {data2?.relationships.filter(hasPresentKey('relationshipType')).map((r) => (
            <Badge bg="warning" className="bg-gradient" key={r.relationshipGuid}>
              <h5 className="m-auto">
                <FontAwesomeIcon className="text-dark" icon={faArrowLeft} />
                <strong className="text-dark"> {r.relationshipType}</strong>
              </h5>
            </Badge>
          ))}

          {data1?.relationships.filter(hasPresentKey('relationshipType')).map((r) => (
            <Badge bg="warning" className="bg-gradient" key={r.relationshipGuid}>
              <h5 className="m-auto">
                <strong className="text-dark">{r.relationshipType} </strong>
                <FontAwesomeIcon className="text-dark" icon={faArrowRight} />
              </h5>
            </Badge>
          ))}

          {!data1?.relationships.length && !data2?.relationships.length && (
            <div className="w-100 text-center">No existing relationships.</div>
          )}
        </div>
      </Loader>
    </div>
  );
};

export default ExistingRelationships;

import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'urql';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { graphql } from '../gql';
import RelationshipTypeSelector from './createRelationship/RelationshipTypeSelector';
import Relationship from './createRelationship/Relationship';
import CancelSubmitButtons from './createRelationship/CancelSubmitButtons';
import DataPanel from './createRelationship/DataPanel';
import InvertRelationshipButton from './createRelationship/InvertRelationshipButton';

interface EntityType {
  type: 'entity';
  entityClassification: string;
  label: string;
}

interface ComponentType {
  type: 'component';
  componentType: string;
  label: string;
}

export type EntityOrComponentType = EntityType | ComponentType;

interface EntityValue {
  type: 'entity';
  entityGuid: string;
  label: string;
}

interface ComponentValue {
  type: 'component';
  entityGuid: string;
  componentGuid: string;
  label: string;
}

export interface RelationshipType {
  label: string;
  value: string;
}

export type EntityOrComponentValue = EntityValue | ComponentValue;

const CreateRelationshipMutation = graphql(`
  mutation CreateRelationship(
    $relationshipType: String
    $sourceEntityGuids: [ID!]
    $sourceComponentGuids: [ID!]
    $destinationEntityGuids: [ID!]
    $destinationComponentGuids: [ID!]
  ) {
    createRelationship(
      relationshipType: $relationshipType
      sourceEntityGuids: $sourceEntityGuids
      sourceComponentGuids: $sourceComponentGuids
      destinationEntityGuids: $destinationEntityGuids
      destinationComponentGuids: $destinationComponentGuids
    ) {
      successful
      result {
        relationshipGuid
      }
    }
  }
`);

const CreateRelationship: React.FC = () => {
  const [sourceType1, setSourceType1] = useState(undefined as EntityOrComponentType | undefined);

  const [sourceType2, setSourceType2] = useState(undefined as EntityOrComponentType | undefined);

  const [destinationType1, setDestinationType1] = useState(
    undefined as EntityOrComponentType | undefined,
  );

  const [destinationType2, setDestinationType2] = useState(
    undefined as EntityOrComponentType | undefined,
  );

  const [relationshipType, setRelationshipType] = useState(
    undefined as RelationshipType | undefined,
  );

  const [sourceValue1, setSourceValue1] = useState(undefined as EntityOrComponentValue | undefined);

  const [sourceValue2, setSourceValue2] = useState(undefined as EntityOrComponentValue | undefined);

  const [destinationValue1, setDestinationValue1] = useState(
    undefined as EntityOrComponentValue | undefined,
  );

  const [destinationValue2, setDestinationValue2] = useState(
    undefined as EntityOrComponentValue | undefined,
  );

  const [{ fetching: relationshipFetching }, createRelationship] = useMutation(
    CreateRelationshipMutation,
  );

  const onSubmit = useCallback(() => {
    if (!relationshipType) return;
    if (!sourceValue1 && !sourceValue2) return;
    if (!destinationValue1 && !destinationValue2) return;

    const sourceValue = sourceValue2 ?? sourceValue1;
    const destinationValue = destinationValue2 ?? destinationValue1;

    if (!sourceValue) return;
    if (!destinationValue) return;

    void createRelationship({
      relationshipType: relationshipType.value,
      sourceEntityGuids: sourceValue.type === 'entity' ? [sourceValue.entityGuid] : [],
      sourceComponentGuids: sourceValue.type === 'component' ? [sourceValue.componentGuid] : [],
      destinationEntityGuids:
        destinationValue.type === 'entity' ? [destinationValue.entityGuid] : [],
      destinationComponentGuids:
        destinationValue.type === 'component' ? [destinationValue.componentGuid] : [],
    })
      .then((mutationResult) => {
        if (mutationResult.error) throw mutationResult.error;
        if (!mutationResult.data) throw new Error();
        if (!mutationResult.data.createRelationship.successful) throw new Error();
        if (!mutationResult.data.createRelationship.result) throw new Error();

        const toastMessage = `"${relationshipType.value}" relationship created.`;
        toast.success(toastMessage);

        clearSelectedValues();
      })
      .catch((_err) => {
        toast.error('Error creating relationship.');
      });
  }, [relationshipType, sourceValue1, sourceValue2, destinationValue1, destinationValue2]);

  const clearSelectedValues = useCallback(() => {
    setSourceValue1(undefined);
    setSourceValue2(undefined);

    setDestinationValue1(undefined);
    setDestinationValue2(undefined);
  }, []);

  const clearState = useCallback(() => {
    clearSelectedValues();

    setSourceType1(undefined);
    setSourceType2(undefined);

    setRelationshipType(undefined);

    setDestinationType1(undefined);
    setDestinationType2(undefined);
  }, []);

  const invertRelationship = useCallback(() => {
    const st1 = sourceType1;
    const st2 = sourceType2;
    const sv1 = sourceValue1;
    const sv2 = sourceValue2;

    const dt1 = destinationType1;
    const dt2 = destinationType2;
    const dv1 = destinationValue1;
    const dv2 = destinationValue2;

    setSourceType1(dt1);
    setSourceType2(dt2);
    setSourceValue1(dv1);
    setSourceValue2(dv2);

    setDestinationType1(st1);
    setDestinationType2(st2);
    setDestinationValue1(sv1);
    setDestinationValue2(sv2);
  }, [sourceType1, sourceType2, sourceValue1, sourceValue2, destinationValue1, destinationValue2]);

  const onSelectRelationshipType = useCallback((relationshipType: RelationshipType | null) => {
    setRelationshipType(relationshipType ?? undefined);
  }, []);

  return (
    <div className="h-100 flex-grow-1 d-flex flex-column justify-content-between">
      <Row className="flex-grow-1">
        <DataPanel
          type1={sourceType1}
          type2={sourceType2}
          setType1={setSourceType1}
          setType2={setSourceType2}
          value1={sourceValue1}
          value2={sourceValue2}
          setValue1={setSourceValue1}
          setValue2={setSourceValue2}
        />

        <Col
          xl="4"
          lg="12"
          className="p-4 d-flex flex-column align-items-center justify-content-center"
        >
          <InvertRelationshipButton
            onClick={invertRelationship}
            canInvert={Boolean(sourceType1 ?? sourceType2 ?? destinationType1 ?? destinationType2)}
          />
          <Relationship
            relationshipType={relationshipType}
            sourceValue={sourceValue2 ?? sourceValue1}
            destinationValue={destinationValue2 ?? destinationValue1}
          />
          <RelationshipTypeSelector onSelect={onSelectRelationshipType} />
        </Col>

        <DataPanel
          type1={destinationType1}
          type2={destinationType2}
          setType1={setDestinationType1}
          setType2={setDestinationType2}
          value1={destinationValue1}
          value2={destinationValue2}
          setValue1={setDestinationValue1}
          setValue2={setDestinationValue2}
        />
      </Row>
      <CancelSubmitButtons
        onCancel={clearState}
        onSubmit={onSubmit}
        loading={relationshipFetching}
        canSubmit={Boolean(sourceValue1 && destinationValue1 && relationshipType)}
      />
    </div>
  );
};

export default CreateRelationship;

import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'urql';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EntityOrComponentTypeSelector from './components/EntityOrComponentTypeSelector';
import SourceDataTable from './components/SourceDataTable';
import DestinationDataTable from './components/DestinationDataTable';
import { graphql } from './gql';
import Alert from 'react-bootstrap/Alert';
import RelationshipTypeSelector from './components/RelationshipTypeSelector';

import './App.css';
import Loader from './components/Loader';
import LoadingSpinner from './components/LoadingSpinner';
import LoadingBar from './components/LoadingBar';
import Relationship from './components/Relationship';
import CancelSubmitButtons from './components/CancelSubmitButtons';

export type EntityOrComponentType = {
  type: 'entity' | 'component';
  value: string;
};

type EntityValue = {
  type: 'entity';
  entityGuid: string;
  label: string;
};

type ComponentValue = {
  type: 'component';
  componentGuid: string;
  label: string;
};

export type RelationshipType = {
  label: string;
  value: string;
};

export type EntityOrComponentValue = EntityValue | ComponentValue;

const ENTITY_TYPES = [
  'Company',
  'Project',
  'Service',
  'Person',
  'Specification',
].sort();

const COMPONENT_TYPES = [
  'person.details',
  'project.group',
  'service.details',
  'company.location.details',
  'company.details',
  'project.details',
].sort();

const EntitiesByClassificationQuery = graphql(`
  query EntitiesByClassification($classification: String!) {
    entitiesByClassification(classification: $classification) {
      entityGuid
    }
  }
`);

const ComponentsByComponentTypeQuery = graphql(`
  query ComponentsByComponentType($componentType: String!) {
    componentsByComponentType(componentType: $componentType) {
      componentGuid
      payload
    }
  }
`);

function App() {
  useEffect(() => {
    if (window.location.pathname === '/') {
      window.location.replace('/app');
    }
  }, []);

  const [sourceType, setSourceType] = useState(
    undefined as EntityOrComponentType | undefined,
  );
  const [destinationType1, setDestinationType1] = useState(
    undefined as EntityOrComponentType | undefined,
  );
  const [destinationType2, setDestinationType2] = useState(
    undefined as EntityOrComponentType | undefined,
  );

  const [relationshipType, setRelationshipType] = useState(
    undefined as RelationshipType | undefined,
  );

  const [sourceValue, setSourceValue] = useState(
    undefined as EntityOrComponentValue | undefined,
  );

  const [destinationValue1, setDestinationValue1] = useState(
    undefined as EntityOrComponentValue | undefined,
  );

  const [destinationValue2, setDestinationValue2] = useState(
    undefined as EntityOrComponentValue | undefined,
  );

  const updateSelectedValue = useCallback(
    (selectedValue: EntityOrComponentValue) =>
      (v: EntityOrComponentValue | undefined) => {
        if (!v) {
          return selectedValue;
        } else if (v.type === 'entity') {
          if (v.entityGuid === (selectedValue as EntityValue).entityGuid) {
            return undefined;
          } else {
            return selectedValue;
          }
        } else if (v.type === 'component') {
          if (
            v.componentGuid === (selectedValue as ComponentValue).componentGuid
          ) {
            return undefined;
          } else {
            return selectedValue;
          }
        }

        // fallback
        return undefined;
      },
    [],
  );

  const [
    {
      data: sourceEntitiesData,
      fetching: sourceEntitiesFetching,
      error: sourceEntitiesError,
      stale: sourceEntitiesStale,
    },
  ] = useQuery({
    query: EntitiesByClassificationQuery,
    variables: { classification: sourceType?.value as string },
    pause: !sourceType || sourceType.type !== 'entity',
  });

  const [
    {
      data: sourceComponentsDataRaw,
      fetching: sourceComponentsFetching,
      error: sourceComponentsError,
      stale: sourceComponentsStale,
    },
  ] = useQuery({
    query: ComponentsByComponentTypeQuery,
    variables: { componentType: sourceType?.value as string },
    pause: !sourceType || sourceType.type !== 'component',
  });

  const sourceComponentsData =
    sourceComponentsDataRaw?.componentsByComponentType.map((el) => ({
      ...el,
      payload: el.payload ? JSON.parse(el.payload) : undefined,
    }));

  const sourceData = !sourceType
    ? undefined
    : sourceType.type === 'entity'
    ? sourceEntitiesData?.entitiesByClassification
    : sourceComponentsData;

  const sourceFetching = sourceEntitiesFetching || sourceComponentsFetching;

  const sourceStale = !sourceType
    ? false
    : sourceType.type === 'entity'
    ? sourceEntitiesStale
    : sourceComponentsStale;

  const sourceError = !sourceType
    ? undefined
    : sourceType.type == 'entity'
    ? sourceEntitiesError
    : sourceComponentsError;

  const [
    {
      data: destinationEntitiesData1,
      fetching: destinationEntitiesFetching1,
      error: destinationEntitiesError1,
      stale: destinationEntitiesStale1,
    },
  ] = useQuery({
    query: EntitiesByClassificationQuery,
    variables: { classification: destinationType1?.value as string },
    pause: !destinationType1 || destinationType1?.type !== 'entity',
  });

  const [
    {
      data: destinationComponentsDataRaw1,
      fetching: destinationComponentsFetching1,
      error: destinationComponentsError1,
      stale: destinationComponentsStale1,
    },
  ] = useQuery({
    query: ComponentsByComponentTypeQuery,
    variables: { componentType: destinationType1?.value as string },
    pause: !destinationType1 || destinationType1?.type !== 'component',
  });

  const destinationComponentsData1 =
    destinationComponentsDataRaw1?.componentsByComponentType.map((el) => ({
      ...el,
      payload: el.payload ? JSON.parse(el.payload) : undefined,
    }));

  const destinationData1 = !destinationType1
    ? undefined
    : destinationType1.type === 'entity'
    ? destinationEntitiesData1?.entitiesByClassification
    : destinationComponentsData1;

  const destinationFetching1 =
    destinationEntitiesFetching1 || destinationComponentsFetching1;

  const destinationStale1 = !destinationType1
    ? false
    : destinationType1.type === 'entity'
    ? destinationEntitiesStale1
    : destinationComponentsStale1;

  const destinationError1 = !destinationType1
    ? undefined
    : destinationType1.type == 'entity'
    ? destinationEntitiesError1
    : destinationComponentsError1;

  const [
    {
      data: destinationEntitiesData2,
      fetching: destinationEntitiesFetching2,
      error: destinationEntitiesError2,
      stale: destinationEntitiesStale2,
    },
  ] = useQuery({
    query: EntitiesByClassificationQuery,
    variables: { classification: destinationType2?.value as string },
    pause:
      !destinationValue1 ||
      !destinationType2 ||
      destinationType2?.type !== 'entity',
  });

  const [
    {
      data: destinationComponentsDataRaw2,
      fetching: destinationComponentsFetching2,
      error: destinationComponentsError2,
      stale: destinationComponentsStale2,
    },
  ] = useQuery({
    query: ComponentsByComponentTypeQuery,
    variables: { componentType: destinationType2?.value as string },
    pause:
      !destinationValue1 ||
      !destinationType2 ||
      destinationType2?.type !== 'component',
  });

  const destinationComponentsData2 =
    destinationComponentsDataRaw2?.componentsByComponentType.map((el) => ({
      ...el,
      payload: el.payload ? JSON.parse(el.payload) : undefined,
    }));

  const destinationData2 = !destinationType2
    ? undefined
    : destinationType2.type === 'entity'
    ? destinationEntitiesData2?.entitiesByClassification
    : destinationComponentsData2;

  const destinationFetching2 =
    destinationEntitiesFetching2 || destinationComponentsFetching2;

  const destinationStale2 = !destinationType2
    ? false
    : destinationType2.type === 'entity'
    ? destinationEntitiesStale2
    : destinationComponentsStale2;

  const destinationError2 = !destinationType2
    ? undefined
    : destinationType2.type == 'entity'
    ? destinationEntitiesError2
    : destinationComponentsError2;

  const onClickCancel = useCallback(() => {
    setSourceValue(undefined);
    setRelationshipType(undefined);
    setDestinationValue1(undefined);
    setDestinationValue2(undefined);
  }, []);

  const onSelectSourceType = useCallback(
    (sourceType: EntityOrComponentType | null) => {
      setSourceType(sourceType || undefined);
      setSourceValue(undefined);
    },
    [],
  );

  const onSelectDestinationType1 = useCallback(
    (destinationType: EntityOrComponentType | null) => {
      setDestinationType1(destinationType || undefined);
      setDestinationValue1(undefined);
      setDestinationValue2(undefined);
    },
    [],
  );

  const onSelectDestinationType2 = useCallback(
    (destinationType: EntityOrComponentType | null) => {
      setDestinationType2(destinationType || undefined);
      setDestinationValue2(undefined);
    },
    [],
  );

  const onSelectRelationshipType = useCallback(
    (relationshipType: RelationshipType | null) => {
      setRelationshipType(relationshipType || undefined);
    },
    [],
  );

  // Toggle selected source if the selected row is clicked
  const onClickSource = useCallback(
    (clickedSourceValue: EntityOrComponentValue) => {
      setSourceValue(updateSelectedValue(clickedSourceValue));
    },
    [],
  );

  const onClickDestination1 = useCallback(
    (clickedDestinationValue: EntityOrComponentValue) => {
      setDestinationValue1(updateSelectedValue(clickedDestinationValue));
      setDestinationValue2(undefined);
    },
    [],
  );

  const onClickDestination2 = useCallback(
    (clickedDestinationValue: EntityOrComponentValue) => {
      setDestinationValue2(updateSelectedValue(clickedDestinationValue));
    },
    [],
  );

  return (
    <div className="px-5 py-3 d-flex flex-column justify-content-between">
      <Row>
        <Col
          xl="4"
          lg="12"
          className="bg-gradient position-relative p-0 border border-2 rounded border-primary d-flex flex-column justify-content-between"
        >
          <Loader
            loading={sourceStale}
            loadingComponent={
              <LoadingBar
                className="position-absolute w-100 rounded-0"
                loading={true}
              />
            }
          />
          <Row className="mh-100 p-4">
            <Col xs="12">
              <div className="overflow-auto pe-1" style={{ height: '66vh' }}>
                <Loader
                  loading={sourceFetching}
                  loadingComponent={<LoadingSpinner />}
                >
                  {sourceError && (
                    <div className="h-100 w-100">
                      <Alert variant="danger">Error fetching data</Alert>
                    </div>
                  )}
                  {sourceType && sourceData && (
                    <SourceDataTable
                      sourceValue={sourceValue}
                      onClick={onClickSource}
                      entityOrComponentType={sourceType}
                      sourceData={sourceData}
                    />
                  )}
                </Loader>
              </div>
            </Col>
            <Col xs="12" style={{ height: '2rem' }} />
            <Col xs="12">
              <EntityOrComponentTypeSelector
                entityTypes={ENTITY_TYPES}
                componentTypes={COMPONENT_TYPES}
                onSelect={onSelectSourceType}
              />
            </Col>
          </Row>
        </Col>
        <Col
          xl="4"
          lg="12"
          className="p-4 d-flex flex-column align-items-center justify-content-center"
        >
          <Relationship
            relationshipType={relationshipType}
            sourceValue={sourceValue}
            destinationValue={destinationValue2}
          />
          <RelationshipTypeSelector onSelect={onSelectRelationshipType} />
        </Col>
        <Col
          xl="4"
          lg="12"
          className="bg-gradient position-relative p-0 border border-2 rounded border-primary d-flex flex-column justify-content-between"
        >
          <Loader
            loading={destinationStale1 || destinationStale2}
            loadingComponent={
              <LoadingBar
                className="position-absolute w-100 rounded-0"
                loading={true}
              />
            }
          />
          <Row className="mh-100 p-4">
            <Col
              xs={destinationValue1 && destinationType2 ? '6' : '12'}
              className="p-0"
            >
              <div className="overflow-auto pe-1" style={{ height: '66vh' }}>
                <Loader
                  loading={destinationFetching1}
                  loadingComponent={<LoadingSpinner size={100} />}
                >
                  {destinationError1 && (
                    <div className="h-100 w-100">
                      <Alert variant="danger">Error fetching data</Alert>
                    </div>
                  )}
                  {destinationType1 && destinationData1 && (
                    <DestinationDataTable
                      destinationValue={destinationValue1}
                      onClick={onClickDestination1}
                      entityOrComponentType={destinationType1}
                      destinationData={destinationData1}
                    />
                  )}
                </Loader>
              </div>
            </Col>

            <Col xs="6" className="p-0">
              {destinationValue1 && destinationType2 && (
                <div className="overflow-auto pe-1" style={{ height: '66vh' }}>
                  <Loader
                    loading={destinationFetching2}
                    loadingComponent={<LoadingSpinner size={100} />}
                  >
                    {destinationError2 && (
                      <div className="h-100 w-100">
                        <Alert variant="danger">Error fetching data</Alert>
                      </div>
                    )}
                    {destinationValue1 &&
                      destinationType2 &&
                      destinationData2 && (
                        <DestinationDataTable
                          destinationValue={destinationValue2}
                          onClick={onClickDestination2}
                          entityOrComponentType={destinationType2}
                          destinationData={destinationData2}
                        />
                      )}
                  </Loader>
                </div>
              )}
            </Col>

            <Col xs="12" style={{ height: '2rem' }} />
            <Col xl="6">
              <EntityOrComponentTypeSelector
                entityTypes={ENTITY_TYPES}
                componentTypes={COMPONENT_TYPES}
                onSelect={onSelectDestinationType1}
              />
            </Col>
            <Col xl="6">
              <EntityOrComponentTypeSelector
                entityTypes={ENTITY_TYPES}
                componentTypes={COMPONENT_TYPES}
                onSelect={onSelectDestinationType2}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <CancelSubmitButtons
        onCancel={onClickCancel}
        onSubmit={() => console.warn('fixme: submit not implemented')}
        canSubmit={
          !!(
            sourceValue &&
            destinationValue1 &&
            destinationValue2 &&
            relationshipType
          )
        }
      />
    </div>
  );
}

export default App;

import React, { Dispatch, SetStateAction, useCallback } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { hasPresentKey } from 'ts-is-present';
import { useQuery } from 'urql';
import parsePayload from '../../parsePayload';
import { graphql } from '../../gql';
import Loader from '../../components/Loader';
import LoadingBar from '../../components/LoadingBar';
import EntityOrComponentTypeSelector from './EntityOrComponentTypeSelector';
import { EntityOrComponentValue } from '../CreateRelationship';
import EntityOrComponentDataTable from './EntityOrComponentDataTable';

// #region selectorTypes
const ENTITY_TYPES = [
  {
    label: 'Specification',
    entityClassification: 'specification',
    value: 'specification',
  },
  {
    label: 'Classification',
    entityClassification: 'classification',
    value: 'classification',
  },
  {
    label: 'Company',
    entityClassification: 'company',
    value: 'company',
  },
  {
    label: 'Jurisdiction',
    entityClassification: 'jurisdiction',
    value: 'jurisdiction',
  },
  {
    label: 'Scope of Work',
    entityClassification: 'scopeofwork',
    value: 'scopeofwork',
  },
  {
    label: 'Project',
    entityClassification: 'project',
    value: 'project',
  },
  {
    label: 'Person',
    entityClassification: 'person',
    value: 'person',
  },
].sort((a, b) => a.label.localeCompare(b.label));

const COMPONENT_TYPES = [
  {
    label: 'person.details',
    componentType: 'person.details',
    value: 'person.details',
  },
  {
    label: 'project.group',
    componentType: 'project.group',
    value: 'project.group',
  },
  {
    label: 'service.details',
    componentType: 'service.details',
    value: 'service.details',
  },
  {
    label: 'company.location.details',
    componentType: 'company.location.details',
    value: 'company.location.details',
  },
  {
    label: 'company.details',
    componentType: 'company.details',
    value: 'company.details',
  },
  {
    label: 'project.details',
    componentType: 'project.details',
    value: 'project.details',
  },
  {
    label: 'scopeofwork.details',
    componentType: 'scopeofwork.details',
    value: 'scopeofwork.details',
  },
  {
    label: 'classification.details',
    componentType: 'classification.details',
    value: 'classification.details',
  },
  {
    label: 'jurisdiction.code',
    componentType: 'jurisdiction.code',
    value: 'jurisdiction.code',
  },
  {
    label: 'jurisdiction.details',
    componentType: 'jurisdiction.details',
    value: 'jurisdiction.details',
  },
  {
    label: 'project.code.analysis.construction.type',
    componentType: 'project.code.analysis.construction.type',
    value: 'project.code.analysis.construction.type',
  },
  {
    label: 'project.code.analysis.details',
    componentType: 'project.code.analysis.details',
    value: 'project.code.analysis.details',
  },
  {
    label: 'project.discipline',
    componentType: 'project.discipline',
    value: 'project.discipline',
  },
  {
    label: 'project.location.details',
    componentType: 'project.location.details',
    value: 'project.location.details',
  },
  {
    label: 'project.phase',
    componentType: 'project.phase',
    value: 'project.phase',
  },
  {
    label: 'qc.checklist',
    componentType: 'qc.checklist',
    value: 'qc.checklist',
  },
  {
    label: 'qc.checklist.item',
    componentType: 'qc.checklist.item',
    value: 'qc.checklist.item',
  },
  {
    label: 'specification.master.details',
    componentType: 'specification.master.details',
    value: 'specification.master.details',
  },
].sort((a, b) => a.label.localeCompare(b.label));
// #endregion

interface Props {
  type1: EntityOrComponentType | undefined;
  type2: EntityOrComponentType | undefined;
  setType1: (v: EntityOrComponentType | undefined) => void;
  setType2: (v: EntityOrComponentType | undefined) => void;
  value1: EntityOrComponentValue | undefined;
  value2: EntityOrComponentValue | undefined;
  setValue1: Dispatch<SetStateAction<EntityOrComponentValue | undefined>>;
  setValue2: Dispatch<SetStateAction<EntityOrComponentValue | undefined>>;
}

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

const EntitiesQuery = graphql(`
  query EntitiesQuery($entityClassification: String!) {
    entities(entityClassification: $entityClassification) {
      entityGuid
      entityClassification
      context
    }
  }
`);

const ComponentsByComponentTypeQuery = graphql(`
  query ComponentsByComponentType($componentType: String!, $entityGuid: ID) {
    components(componentType: $componentType, entityGuid: $entityGuid) {
      componentGuid
      componentName
      entityGuid
      componentType
      payload
    }
  }
`);

const EntityComponentTypesQuery = graphql(`
  query EntityComponentTypes($entityGuid: ID!) {
    entityComponentTypes(entityGuid: $entityGuid)
  }
`);

const DataPanel: React.FC<Props> = ({
  type1,
  type2,
  setType1,
  setType2,
  value1,
  value2,
  setValue1,
  setValue2,
}) => {
  const [
    { data: entitiesData, fetching: entitiesFetching, error: entitiesError, stale: entitiesStale },
  ] = useQuery({
    query: EntitiesQuery,
    variables: type1 && {
      entityClassification: (type1 as EntityType).entityClassification,
    },
    pause: !type1 || type1.type !== 'entity',
  });

  const [
    {
      data: componentsDataRaw1,
      fetching: componentsFetching1,
      error: componentsError1,
      stale: componentsStale1,
    },
  ] = useQuery({
    query: ComponentsByComponentTypeQuery,
    variables: type1 && {
      componentType: (type1 as ComponentType).componentType,
    },
    pause: !type1 || type1.type !== 'component',
  });

  const componentsData1 = componentsDataRaw1?.components
    .map((el) => ({
      ...el,
      payload:
        el.payload && el.componentType ? parsePayload(el.componentType, el.payload) : undefined,
    }))
    .filter(hasPresentKey('payload'));

  const data1 = !type1
    ? undefined
    : type1.type === 'entity'
    ? entitiesData?.entities
    : componentsData1;

  const fetching1 = entitiesFetching || componentsFetching1;

  const stale1 = !type1 ? false : type1.type === 'entity' ? entitiesStale : componentsStale1;

  const error1 = !type1 ? undefined : type1.type == 'entity' ? entitiesError : componentsError1;

  const [
    {
      data: componentsDataRaw2,
      fetching: componentsFetching2,
      error: componentsError2,
      stale: componentsStale2,
    },
  ] = useQuery({
    query: ComponentsByComponentTypeQuery,
    variables: type2 && {
      componentType: (type2 as ComponentType).componentType,
      entityGuid: value1?.entityGuid,
    },
    pause: !value1 || !type2 || type2.type !== 'component',
  });

  const componentsData2 = componentsDataRaw2?.components
    .map((el) => ({
      ...el,
      payload:
        el.payload && el.componentType ? parsePayload(el.componentType, el.payload) : undefined,
    }))
    .filter(hasPresentKey('payload'));

  const data2 = !type2 ? undefined : componentsData2;

  const fetching2 = componentsFetching2;

  const stale2 = !type2 ? false : componentsStale2;

  const error2 = !type2 ? undefined : componentsError2;

  const [
    {
      data: componentTypesRaw,
      fetching: componentTypesFetching,
      // FIXME: handle component types error
      error: _componentTypesError,
    },
  ] = useQuery({
    query: EntityComponentTypesQuery,
    variables: value1 && {
      entityGuid: (value1 as EntityValue).entityGuid,
    },
    pause: value1 && value1.type !== 'entity',
  });

  const componentTypes = (componentTypesRaw?.entityComponentTypes ?? ([] as string[])).map((t) => ({
    label: t,
    value: t,
    componentType: t,
  }));

  const updateSelectedValue = useCallback(
    (selectedValue: EntityOrComponentValue) => (v: EntityOrComponentValue | undefined) => {
      if (!v) {
        return selectedValue;
      } else if (v.type === 'entity') {
        if (v.entityGuid === (selectedValue as EntityValue).entityGuid) {
          return undefined;
        } else {
          return selectedValue;
        }
      } else {
        if (v.componentGuid === (selectedValue as ComponentValue).componentGuid) {
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

  const onSelectType1 = useCallback((type: EntityOrComponentType | null) => {
    setType1(type ?? undefined);
    setType2(undefined);
    setValue1(undefined);
    setValue2(undefined);
  }, []);

  const onSelectType2 = useCallback((type: EntityOrComponentType | null) => {
    setType2(type ?? undefined);
    setValue2(undefined);
  }, []);

  const onClick1 = useCallback((clickedValue: EntityOrComponentValue) => {
    setValue1(updateSelectedValue(clickedValue));
    setValue2(undefined);
  }, []);

  const onClick2 = useCallback((clickedValue: EntityOrComponentValue) => {
    setValue2(updateSelectedValue(clickedValue));
  }, []);

  return (
    <Col
      xl="4"
      lg="12"
      className="bg-gradient position-relative p-0 border border-2 rounded border-primary d-flex flex-column justify-content-between"
    >
      <Loader
        loading={stale1 || stale2}
        loadingComponent={
          <LoadingBar className="position-absolute w-100 rounded-0" loading={true} />
        }
      />
      <Row className="mh-100 p-4">
        <Col className="p-0">
          <div className="overflow-auto pe-1" style={{ height: '60vh' }}>
            <Loader loading={fetching1} error={error1}>
              {type1 && data1 && (
                <EntityOrComponentDataTable
                  singleColumn={Boolean(type2 ?? false)}
                  value={value1}
                  onClick={onClick1}
                  entityOrComponentType={type1}
                  data={data1}
                />
              )}
            </Loader>
          </div>
        </Col>

        {value1?.type === 'entity' && type2 && (
          <Col xs="6" className="p-0">
            <div className="overflow-auto-pe-1" style={{ height: '60vh' }}>
              <Loader loading={fetching2} error={error2}>
                {data2 && (
                  <EntityOrComponentDataTable
                    singleColumn={true}
                    value={value2}
                    onClick={onClick2}
                    entityOrComponentType={type2}
                    data={data2}
                  />
                )}
              </Loader>
            </div>
          </Col>
        )}

        <Col xs="12" style={{ height: '2rem' }} />
        <Col>
          <EntityOrComponentTypeSelector
            value={type1 ?? null}
            entityTypes={ENTITY_TYPES}
            componentTypes={COMPONENT_TYPES}
            onSelect={onSelectType1}
          />
        </Col>
        {value1?.type === 'entity' && (
          <Col xl="6">
            <EntityOrComponentTypeSelector
              loading={componentTypesFetching}
              entityTypes={[]}
              componentTypes={componentTypes}
              onSelect={onSelectType2}
              value={type2 ?? null}
            />
          </Col>
        )}
      </Row>
    </Col>
  );
};

export default DataPanel;

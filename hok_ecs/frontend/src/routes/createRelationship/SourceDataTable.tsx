import { ColumnDef, Row } from '@tanstack/react-table';
import React, { useCallback, useMemo } from 'react';
import {
  EntityOrComponentType,
  EntityOrComponentValue,
} from '../CreateRelationship';
import DataTable from '../../components/DataTable';
import {
  CompanyDetails,
  CompanyLocationDetails,
  Payload,
  PersonDetails,
  ProjectDetails,
  ProjectGroup,
  ServiceDetails,
} from '../../parsePayload';

interface ComponentData {
  componentGuid: string;
  payload: Payload;
}

interface EntityData {
  entityGuid: string;
}

type Data = ComponentData | EntityData;

interface Props {
  onClick: (v: EntityOrComponentValue) => void;
  entityOrComponentType: EntityOrComponentType;
  sourceData: Data[];
  sourceValue: EntityOrComponentValue | undefined;
}

const entityColumns: ColumnDef<EntityData>[] = [
  {
    header: 'GUID',
    accessorKey: 'entityGuid',
  },
  {
    header: 'LABEL',
    accessorKey: 'entityGuid',
    id: 'LABEL',
  },
];

const getColumns = (entityOrComponentType: EntityOrComponentType) => {
  if (entityOrComponentType.type === 'entity')
    return entityColumns as ColumnDef<Data>[];

  return getComponentColumns(entityOrComponentType.value) as ColumnDef<Data>[];
};

const getComponentColumns = (
  componentType: string,
): ColumnDef<ComponentData>[] => {
  const columns: ColumnDef<ComponentData>[] = [
    {
      header: 'GUID',
      accessorKey: 'componentGuid',
    },
  ];

  switch (componentType) {
    case 'project.details': {
      return [
        {
          header: 'Name',
          accessorFn: (c) => (c.payload as ProjectDetails).ProjectName,
        },
        {
          header: 'Number',
          accessorFn: (c) => (c.payload as ProjectDetails).ProjectNumber,
        },
        {
          header: 'Alias',
          accessorFn: (c) => (c.payload as ProjectDetails).ProjectNameAlias,
        },
        {
          header: 'LABEL',
          accessorFn: (c) => (c.payload as ProjectDetails).ProjectNameAlias,
          id: 'LABEL',
        },
      ];
    }
    case 'company.details':
      return [
        {
          header: 'Name',
          accessorFn: (c) => (c.payload as CompanyDetails).CompanyName,
        },
        {
          header: 'Acronym',
          accessorFn: (c) => (c.payload as CompanyDetails).CompanyAcronym,
        },
        {
          header: 'LABEL',
          accessorFn: (c) => (c.payload as CompanyDetails).CompanyName,
          id: 'LABEL',
        },
      ];
    case 'company.location.details':
      return [
        {
          header: 'Name',
          accessorFn: (c) => (c.payload as CompanyLocationDetails).LocationName,
        },
        {
          header: 'Alias',
          accessorFn: (c) =>
            (c.payload as CompanyLocationDetails).LocationAlias,
        },
        {
          header: 'LABEL',
          accessorFn: (c) => (c.payload as CompanyLocationDetails).LocationName,
          id: 'LABEL',
        },
      ];
    case 'service.details':
      return [
        {
          header: 'Name',
          accessorFn: (c) => (c.payload as ServiceDetails).ServiceName,
        },
        {
          header: 'Acronym',
          accessorFn: (c) => (c.payload as ServiceDetails).ServiceAcronym,
        },
        {
          header: 'URL',
          accessorFn: (c) => (c.payload as ServiceDetails).BaseURL,
        },
        {
          header: 'LABEL',
          accessorFn: (c) => (c.payload as ServiceDetails).ServiceName,
          id: 'LABEL',
        },
      ];

    case 'project.group':
      return [
        {
          header: 'Group',
          accessorFn: (c) => (c.payload as ProjectGroup).GroupName,
        },
        {
          header: 'LABEL',
          accessorFn: (c) => (c.payload as ProjectGroup).GroupName,
          id: 'LABEL',
        },
      ];
    case 'person.details':
      return [
        {
          header: 'First',
          accessorFn: (c) => (c.payload as PersonDetails).FirstName,
        },
        {
          header: 'Last',
          accessorFn: (c) => (c.payload as PersonDetails).LastName,
        },
        {
          header: 'Email',
          accessorFn: (c) => (c.payload as PersonDetails).EmailAddress,
        },
        {
          header: 'LABEL',
          accessorFn: (c) => (c.payload as PersonDetails).EmailAddress,
          id: 'LABEL',
        },
      ];
    default:
      return columns;
  }
};

const SourceDataTable: React.FC<Props> = ({
  onClick,
  entityOrComponentType,
  sourceData,
  sourceValue,
}) => {
  const columns = useMemo(
    () => getColumns(entityOrComponentType),
    [entityOrComponentType],
  );

  const isRowActive = useCallback(
    (row: Row<Data>) => {
      if (!sourceValue) return false;

      if (sourceValue.type === 'entity') {
        return (
          sourceValue.entityGuid === (row.original as EntityData).entityGuid
        );
      }

      return (
        sourceValue.componentGuid ===
        (row.original as ComponentData).componentGuid
      );
    },
    [sourceValue],
  );

  return (
    <DataTable
      hiddenColumns={['LABEL']}
      columns={columns}
      data={sourceData}
      isRowActive={isRowActive}
      onClickRow={(row) => {
        const { type } = entityOrComponentType;

        if (type === 'entity') {
          onClick({
            type: 'entity',
            entityGuid: (row.original as EntityData).entityGuid,
            label: row.getValue('LABEL'),
          });
        } else {
          onClick({
            type: 'component',
            componentGuid: (row.original as ComponentData).componentGuid,
            label: row.getValue('LABEL'),
          });
        }
      }}
    />
  );
};

export default SourceDataTable;

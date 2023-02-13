import { ColumnDef, Row } from '@tanstack/react-table';
import React, { memo, useCallback, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import { EntityOrComponentType, EntityOrComponentValue } from '../App';
import DataTable from './DataTable';

interface ComponentData {
  componentGuid: string;
  payload: any;
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
    case 'project.details':
      return [
        {
          header: 'Name',
          accessorFn: (c) => c.payload.ProjectName,
        },
        {
          header: 'Number',
          accessorFn: (c) => c.payload.ProjectNumber,
        },
        {
          header: 'Alias',
          accessorFn: (c) => c.payload.ProjectNameAlias,
        },
        {
          header: 'LABEL',
          accessorFn: (c) => c.payload.ProjectNameAlias,
          id: 'LABEL',
        },
      ];
    case 'company.details':
      return [
        {
          header: 'Name',
          accessorFn: (c) => c.payload.CompanyName,
        },
        {
          header: 'Acronym',
          accessorFn: (c) => c.payload.CompanyAcronym,
        },
        {
          header: 'LABEL',
          accessorFn: (c) => c.payload.CompanyName,
          id: 'LABEL',
        },
      ];
    case 'company.location.details':
      return [
        {
          header: 'Name',
          accessorFn: (c) => c.payload.LocationName,
        },
        {
          header: 'Alias',
          accessorFn: (c) => c.payload.LocationAlias,
        },
        {
          header: 'LABEL',
          accessorFn: (c) => c.payload.LocationName,
          id: 'LABEL',
        },
      ];
    case 'service.details':
      return [
        {
          header: 'Name',
          accessorFn: (c) => c.payload.ServiceName,
        },
        {
          header: 'Acronym',
          accessorFn: (c) => c.payload.ServiceAcronym,
        },
        {
          header: 'URL',
          accessorFn: (c) => c.payload.BaseURL,
        },
        {
          header: 'LABEL',
          accessorFn: (c) => c.payload.ServiceName,
          id: 'LABEL',
        },
      ];

    case 'project.group':
      return [
        {
          header: 'Group',
          accessorFn: (c) => c.payload.GroupName,
        },
        {
          header: 'LABEL',
          accessorFn: (c) => c.payload.GroupName,
          id: 'LABEL',
        },
      ];
    case 'person.details':
      return [
        {
          header: 'First',
          accessorFn: (c) => c.payload.FirstName,
        },
        {
          header: 'Last',
          accessorFn: (c) => c.payload.LastName,
        },
        {
          header: 'Email',
          accessorFn: (c) => c.payload.EmailAddress,
        },
        {
          header: 'LABEL',
          accessorFn: (c) => c.payload.EmailAddress,
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
        } else if (type === 'component') {
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

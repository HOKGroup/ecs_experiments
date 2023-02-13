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
  destinationData: Data[];
  destinationValue: EntityOrComponentValue | undefined;
}

const entityColumns: ColumnDef<EntityData>[] = [
  {
    header: 'GUID',
    accessorKey: 'entityGuid',
  },
  {
    header: 'LABEL',
    id: 'LABEL',
    accessorKey: 'entityGuid',
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
    {
      header: 'LABEL',
      id: 'LABEL',
      accessorKey: 'componentGuid',
    },
  ];

  switch (componentType) {
    case 'project.details':
      return [
        {
          header: 'Alias',
          accessorFn: (c) => c.payload.ProjectNameAlias,
        },
        {
          header: 'LABEL',
          id: 'LABEL',
          accessorFn: (c) => c.payload.ProjectNameAlias,
        },
      ];
    case 'company.details':
      return [
        {
          header: 'Name',
          accessorFn: (c) => c.payload.CompanyName,
        },
        {
          header: 'LABEL',
          id: 'LABEL',
          accessorFn: (c) => c.payload.CompanyName,
        },
      ];
    case 'company.location.details':
      return [
        {
          header: 'Name',
          accessorFn: (c) => c.payload.LocationName,
        },
        {
          header: 'LABEL',
          id: 'LABEL',
          accessorFn: (c) => c.payload.LocationName,
        },
      ];
    case 'service.details':
      return [
        {
          header: 'Name',
          accessorFn: (c) => c.payload.ServiceName,
        },
        {
          header: 'LABEL',
          id: 'LABEL',
          accessorFn: (c) => c.payload.ServiceName,
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
          id: 'LABEL',
          accessorFn: (c) => c.payload.GroupName,
        },
      ];
    case 'person.details':
      return [
        {
          header: 'Email',
          accessorFn: (c) => c.payload.EmailAddress,
        },
        {
          header: 'LABEL',
          id: 'LABEL',
          accessorFn: (c) => c.payload.EmailAddress,
        },
      ];
    default:
      return columns;
  }
};

const DestinationDataTable: React.FC<Props> = ({
  onClick,
  entityOrComponentType,
  destinationData,
  destinationValue,
}) => {
  const columns = useMemo(
    () => getColumns(entityOrComponentType),
    [entityOrComponentType],
  );

  const isRowActive = useCallback(
    (row: Row<Data>) => {
      if (!destinationValue) return false;

      if (destinationValue.type === 'entity') {
        return (
          destinationValue.entityGuid ===
          (row.original as EntityData).entityGuid
        );
      }

      return (
        destinationValue.componentGuid ===
        (row.original as ComponentData).componentGuid
      );
    },
    [destinationValue],
  );

  return (
    <DataTable
      hiddenColumns={['LABEL']}
      columns={columns}
      data={destinationData}
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

export default DestinationDataTable;

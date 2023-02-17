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
  entityGuid: string;
  payload: Payload;
}

interface EntityData {
  entityGuid: string;
}

type Data = ComponentData | EntityData;

interface Props {
  onClick: (v: EntityOrComponentValue) => void;
  entityOrComponentType: EntityOrComponentType;
  data: Data[];
  value: EntityOrComponentValue | undefined;
  singleColumn?: boolean;
}

const getColumns = (entityOrComponentType: EntityOrComponentType) => {
  return getComponentColumns(
    entityOrComponentType.componentType,
  ) as ColumnDef<Data>[];
};

const getComponentColumns = (
  componentType: string,
): ColumnDef<ComponentData>[] => {
  const columns: ColumnDef<ComponentData>[] = [
    {
      header: 'GUID',
      id: 'LABEL',
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
          id: 'LABEL',
          accessorFn: (c) => (c.payload as ProjectDetails).ProjectNameAlias,
        },
      ];
    }
    case 'company.details':
      return [
        {
          header: 'Name',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as CompanyDetails).CompanyName,
        },
        {
          header: 'Acronym',
          accessorFn: (c) => (c.payload as CompanyDetails).CompanyAcronym,
        },
      ];
    case 'company.location.details':
      return [
        {
          header: 'Name',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as CompanyLocationDetails).LocationName,
        },
        {
          header: 'Alias',
          accessorFn: (c) =>
            (c.payload as CompanyLocationDetails).LocationAlias,
        },
      ];
    case 'service.details':
      return [
        {
          header: 'Name',
          id: 'LABEL',
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
      ];

    case 'project.group':
      return [
        {
          header: 'Group',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as ProjectGroup).GroupName,
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
          id: 'LABEL',
          accessorFn: (c) => (c.payload as PersonDetails).EmailAddress,
        },
      ];
    default:
      return columns;
  }
};

const EntityOrComponentDataTable: React.FC<Props> = ({
  onClick,
  entityOrComponentType,
  data: destinationData,
  value: destinationValue,
  singleColumn: propsSingleColumn,
}) => {
  const singleColumn = propsSingleColumn ?? false;

  const columns = useMemo(() => {
    const allColumns = getColumns(entityOrComponentType);
    return singleColumn
      ? allColumns.filter((c) => c.id === 'LABEL')
      : allColumns;
  }, [entityOrComponentType, singleColumn]);

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
        } else {
          onClick({
            type: 'component',
            componentGuid: (row.original as ComponentData).componentGuid,
            entityGuid: row.original.entityGuid,
            label: row.getValue('LABEL'),
          });
        }
      }}
    />
  );
};

export default EntityOrComponentDataTable;

import { ColumnDef, Row } from '@tanstack/react-table';
import React, { useCallback, useMemo } from 'react';
import {
  EntityOrComponentType,
  EntityOrComponentValue,
} from '../CreateRelationship';
import DataTable from '../../components/DataTable';
import {
  ClassificationDetails,
  CompanyDetails,
  CompanyLocationDetails,
  JurisdictionDetails,
  Payload,
  PersonDetails,
  ProjectDetails,
  ProjectGroup,
  ScopeOfWorkDetails,
  SpecificationMasterDetails,
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
    case 'specification.master.details':
      return [
        {
          header: 'Name',
          id: 'LABEL',
          accessorFn: (c) =>
            (c.payload as SpecificationMasterDetails).specification_master_name,
        },
        {
          header: 'Specialization',
          accessorFn: (c) =>
            (c.payload as SpecificationMasterDetails).master_specialization,
        },
      ];
    case 'project.details': {
      return [
        {
          header: 'Name',
          accessorFn: (c) => (c.payload as ProjectDetails).project_name,
        },
        {
          header: 'Number',
          accessorFn: (c) => (c.payload as ProjectDetails).project_number,
        },
        {
          header: 'Alias',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as ProjectDetails).project_name_alias,
        },
      ];
    }
    case 'company.details':
      return [
        {
          header: 'Name',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as CompanyDetails).company_name,
        },
        {
          header: 'Short Name',
          accessorFn: (c) => (c.payload as CompanyDetails).company_short_name,
        },
      ];
    case 'company.location.details':
      return [
        {
          header: 'Name',
          id: 'LABEL',
          accessorFn: (c) =>
            (c.payload as CompanyLocationDetails).location_name,
        },
        {
          header: 'Alias',
          accessorFn: (c) =>
            (c.payload as CompanyLocationDetails).location_short_name,
        },
      ];

    case 'project.group':
      return [
        {
          header: 'Group',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as ProjectGroup).group_name,
        },
      ];
    case 'person.details':
      return [
        {
          header: 'First',
          accessorFn: (c) => (c.payload as PersonDetails).first_name,
        },
        {
          header: 'Last',
          accessorFn: (c) => (c.payload as PersonDetails).last_name,
        },
        {
          header: 'Email',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as PersonDetails).email_address,
        },
      ];
    case 'classification.details':
      return [
        {
          header: 'Name',
          id: 'LABEL',
          accessorFn: (c) =>
            (c.payload as ClassificationDetails).classification_name,
        },
        {
          header: 'Number',
          accessorFn: (c) =>
            (c.payload as ClassificationDetails).classification_number,
        },
      ];
    case 'jurisdiction.details':
      return [
        {
          header: 'Name',
          id: 'LABEL',
          accessorFn: (c) =>
            (c.payload as JurisdictionDetails).jurisdiction_name,
        },
      ];
    case 'scopeofwork.details':
      // return [
      //   {
      //     header: 'GUID',
      //     id: 'LABEL',
      //     accessorKey: 'entityGuid'
      //   }
      // ]
      return [
        {
          header: 'Name',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as ScopeOfWorkDetails).scope_name,
        },
        {
          header: 'Description',
          accessorFn: (c) =>
            (c.payload as ScopeOfWorkDetails).scope_description,
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

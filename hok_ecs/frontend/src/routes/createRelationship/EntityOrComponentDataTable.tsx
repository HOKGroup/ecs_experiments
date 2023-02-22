import { ColumnDef, Row } from '@tanstack/react-table';
import React, { useCallback, useMemo } from 'react';
import { EntityOrComponentType, EntityOrComponentValue } from '../CreateRelationship';
import DataTable from '../../components/DataTable';

import { SpecificationMasterDetails } from '../../schemas/specificationMasterDetails';
import { ProjectDetails } from '../../schemas/projectDetails';
import { CompanyDetails } from '../../schemas/companyDetails';
import { CompanyLocationDetails } from '../../schemas/companyLocationDetails';
import { ProjectGroup } from '../../schemas/projectGroup';
import { PersonDetails } from '../../schemas/personDetails';
import { ClassificationDetails } from '../../schemas/classificationDetails';
import { ScopeofworkDetails } from '../../schemas/scopeofworkDetails';
import { JurisdictionDetails } from '../../schemas/jurisdictionDetails';
import { Payload } from '../../parsePayload';

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

// #region(collapsed) columns
const getColumns = (entityOrComponentType: EntityOrComponentType) => {
  if (entityOrComponentType.type === 'entity') {
    return getEntityColumns();
  }
  return getComponentColumns(entityOrComponentType.componentType) as ColumnDef<Data>[];
};

const getEntityColumns = (): ColumnDef<EntityData>[] => {
  return [
    {
      header: 'Context',
      id: 'LABEL',
      accessorKey: 'context',
    },
  ];
};

const getComponentColumns = (componentType: string): ColumnDef<ComponentData>[] => {
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
          accessorFn: (c) => (c.payload as SpecificationMasterDetails).specification_master_name,
        },
        {
          header: 'Specialization',
          accessorFn: (c) => (c.payload as SpecificationMasterDetails).master_specialization,
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
          accessorFn: (c) => (c.payload as CompanyLocationDetails).location_name,
        },
        {
          header: 'Alias',
          accessorFn: (c) => (c.payload as CompanyLocationDetails).location_short_name,
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
          accessorFn: (c) => (c.payload as ClassificationDetails).classification_name,
        },
        {
          header: 'Number',
          accessorFn: (c) => (c.payload as ClassificationDetails).classification_number,
        },
      ];
    case 'jurisdiction.details':
      return [
        {
          header: 'Name',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as JurisdictionDetails).jurisdiction_name,
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
          accessorFn: (c) => (c.payload as ScopeofworkDetails).scope_name,
        },
        {
          header: 'Description',
          accessorFn: (c) => (c.payload as ScopeofworkDetails).scope_description,
        },
      ];
    default:
      return columns;
  }
};
// #endregion

const EntityOrComponentDataTable: React.FC<Props> = ({
  onClick,
  entityOrComponentType,
  data,
  value,
  singleColumn: propsSingleColumn,
}) => {
  const singleColumn = propsSingleColumn ?? false;

  const columns = useMemo(() => {
    const allColumns = getColumns(entityOrComponentType);
    return singleColumn ? allColumns.filter((c) => c.id === 'LABEL') : allColumns;
  }, [entityOrComponentType, singleColumn]);

  const isRowActive = useCallback(
    (row: Row<Data>) => {
      if (!value) return false;

      if (value.type === 'entity') {
        return value.entityGuid === (row.original as EntityData).entityGuid;
      }

      return value.componentGuid === (row.original as ComponentData).componentGuid;
    },
    [value],
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      isRowActive={isRowActive}
      onClickRow={(row) => {
        const { type } = entityOrComponentType;

        if (type === 'entity') {
          onClick({
            type: 'entity',
            entityGuid: row.original.entityGuid,
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
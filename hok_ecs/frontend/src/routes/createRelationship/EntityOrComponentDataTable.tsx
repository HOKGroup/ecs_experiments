import { Row } from '@tanstack/react-table';
import React, { useCallback, useMemo } from 'react';
import { EntityOrComponentType, EntityOrComponentValue } from '../CreateRelationship';
import DataTable from '../../components/DataTable';
import getColumns from './entityOrComponentDataTableColumns';

import { Payload } from '../../parsePayload';

export interface ComponentData {
  componentGuid: string;
  entityGuid: string;
  componentName: string;
  payload: Payload;
}

export interface EntityData {
  entityGuid: string;
}

export type Data = ComponentData | EntityData;

interface Props {
  onClick: (v: EntityOrComponentValue) => void;
  entityOrComponentType: EntityOrComponentType;
  data: Data[];
  value: EntityOrComponentValue | undefined;
  singleColumn?: boolean;
}

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

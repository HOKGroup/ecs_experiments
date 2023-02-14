import { ColumnDef, Row } from '@tanstack/react-table';
import React, { useCallback } from 'react';
import {
  EntityOrComponentType,
  EntityOrComponentValue,
} from '../CreateRelationship';
import DataTable from '../../components/DataTable';
import { Payload } from '../../parsePayload';

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
  destinationData: Data[];
  destinationValue: EntityOrComponentValue | undefined;
  columns: ColumnDef<Data>[];
}

const EntityOrComponentDataTable: React.FC<Props> = ({
  onClick,
  entityOrComponentType,
  destinationData,
  destinationValue,
  columns,
}) => {
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

export default EntityOrComponentDataTable;

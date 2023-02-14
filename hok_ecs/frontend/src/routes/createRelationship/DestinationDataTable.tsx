// import { ColumnDef, Row } from '@tanstack/react-table';
// import React, { useCallback, useMemo } from 'react';
// import {
//   EntityOrComponentType,
//   EntityOrComponentValue,
// } from '../CreateRelationship';
// import DataTable from '../../components/DataTable';
// import {
//   CompanyDetails,
//   CompanyLocationDetails,
//   Payload,
//   PersonDetails,
//   ProjectDetails,
//   ProjectGroup,
//   ServiceDetails,
// } from '../../parsePayload';

// interface ComponentData {
//   componentGuid: string;
//   payload: Payload;
// }

// interface EntityData {
//   entityGuid: string;
// }

// type Data = ComponentData | EntityData;

// interface Props {
//   onClick: (v: EntityOrComponentValue) => void;
//   entityOrComponentType: EntityOrComponentType;
//   destinationData: Data[];
//   destinationValue: EntityOrComponentValue | undefined;
// }

// const entityColumns: ColumnDef<EntityData>[] = [
//   {
//     header: 'GUID',
//     accessorKey: 'entityGuid',
//   },
//   {
//     header: 'LABEL',
//     id: 'LABEL',
//     accessorKey: 'entityGuid',
//   },
// ];

// const getColumns = (entityOrComponentType: EntityOrComponentType) => {
//   if (entityOrComponentType.type === 'entity')
//     return entityColumns as ColumnDef<Data>[];

//   return getComponentColumns(entityOrComponentType.value) as ColumnDef<Data>[];
// };

// const getComponentColumns = (
//   componentType: string,
// ): ColumnDef<ComponentData>[] => {
//   const columns: ColumnDef<ComponentData>[] = [
//     {
//       header: 'GUID',
//       accessorKey: 'componentGuid',
//     },
//     {
//       header: 'LABEL',
//       id: 'LABEL',
//       accessorKey: 'componentGuid',
//     },
//   ];

//   switch (componentType) {
//     case 'project.details':
//       return [
//         {
//           header: 'Alias',
//           accessorFn: (c) => (c.payload as ProjectDetails).ProjectNameAlias,
//         },
//         {
//           header: 'LABEL',
//           id: 'LABEL',
//           accessorFn: (c) => (c.payload as ProjectDetails).ProjectNameAlias,
//         },
//       ];
//     case 'company.details':
//       return [
//         {
//           header: 'Name',
//           accessorFn: (c) => (c.payload as CompanyDetails).CompanyName,
//         },
//         {
//           header: 'LABEL',
//           id: 'LABEL',
//           accessorFn: (c) => (c.payload as CompanyDetails).CompanyName,
//         },
//       ];
//     case 'company.location.details':
//       return [
//         {
//           header: 'Name',
//           accessorFn: (c) => (c.payload as CompanyLocationDetails).LocationName,
//         },
//         {
//           header: 'LABEL',
//           id: 'LABEL',
//           accessorFn: (c) => (c.payload as CompanyLocationDetails).LocationName,
//         },
//       ];
//     case 'service.details':
//       return [
//         {
//           header: 'Name',
//           accessorFn: (c) => (c.payload as ServiceDetails).ServiceName,
//         },
//         {
//           header: 'LABEL',
//           id: 'LABEL',
//           accessorFn: (c) => (c.payload as ServiceDetails).ServiceName,
//         },
//       ];

//     case 'project.group':
//       return [
//         {
//           header: 'Group',
//           accessorFn: (c) => (c.payload as ProjectGroup).GroupName,
//         },
//         {
//           header: 'LABEL',
//           id: 'LABEL',
//           accessorFn: (c) => (c.payload as ProjectGroup).GroupName,
//         },
//       ];
//     case 'person.details':
//       return [
//         {
//           header: 'Email',
//           accessorFn: (c) => (c.payload as PersonDetails).EmailAddress,
//         },
//         {
//           header: 'LABEL',
//           id: 'LABEL',
//           accessorFn: (c) => (c.payload as PersonDetails).EmailAddress,
//         },
//       ];
//     default:
//       return columns;
//   }
// };

// const DestinationDataTable: React.FC<Props> = ({
//   onClick,
//   entityOrComponentType,
//   destinationData,
//   destinationValue,
// }) => {
//   const columns = useMemo(
//     () => getColumns(entityOrComponentType),
//     [entityOrComponentType],
//   );

//   const isRowActive = useCallback(
//     (row: Row<Data>) => {
//       if (!destinationValue) return false;

//       if (destinationValue.type === 'entity') {
//         return (
//           destinationValue.entityGuid ===
//           (row.original as EntityData).entityGuid
//         );
//       }

//       return (
//         destinationValue.componentGuid ===
//         (row.original as ComponentData).componentGuid
//       );
//     },
//     [destinationValue],
//   );

//   return (
//     <DataTable
//       hiddenColumns={['LABEL']}
//       columns={columns}
//       data={destinationData}
//       isRowActive={isRowActive}
//       onClickRow={(row) => {
//         const { type } = entityOrComponentType;

//         if (type === 'entity') {
//           onClick({
//             type: 'entity',
//             entityGuid: (row.original as EntityData).entityGuid,
//             label: row.getValue('LABEL'),
//           });
//         } else {
//           onClick({
//             type: 'component',
//             componentGuid: (row.original as ComponentData).componentGuid,
//             label: row.getValue('LABEL'),
//           });
//         }
//       }}
//     />
//   );
// };

// export default DestinationDataTable;

import React, { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import {
  EntityOrComponentType,
  EntityOrComponentValue,
} from '../CreateRelationship';
import EntityOrComponentDataTable from './EntityOrComponentDataTable';
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
          accessorFn: (c) => (c.payload as ProjectDetails).ProjectNameAlias,
        },
        {
          header: 'LABEL',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as ProjectDetails).ProjectNameAlias,
        },
      ];
    case 'company.details':
      return [
        {
          header: 'Name',
          accessorFn: (c) => (c.payload as CompanyDetails).CompanyName,
        },
        {
          header: 'LABEL',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as CompanyDetails).CompanyName,
        },
      ];
    case 'company.location.details':
      return [
        {
          header: 'Name',
          accessorFn: (c) => (c.payload as CompanyLocationDetails).LocationName,
        },
        {
          header: 'LABEL',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as CompanyLocationDetails).LocationName,
        },
      ];
    case 'service.details':
      return [
        {
          header: 'Name',
          accessorFn: (c) => (c.payload as ServiceDetails).ServiceName,
        },
        {
          header: 'LABEL',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as ServiceDetails).ServiceName,
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
          id: 'LABEL',
          accessorFn: (c) => (c.payload as ProjectGroup).GroupName,
        },
      ];
    case 'person.details':
      return [
        {
          header: 'Email',
          accessorFn: (c) => (c.payload as PersonDetails).EmailAddress,
        },
        {
          header: 'LABEL',
          id: 'LABEL',
          accessorFn: (c) => (c.payload as PersonDetails).EmailAddress,
        },
      ];
    default:
      return columns;
  }
};

const DestinationDataTable: React.FC<Props> = (props) => {
  const columns = useMemo(
    () => getColumns(props.entityOrComponentType),
    [props.entityOrComponentType],
  );

  return <EntityOrComponentDataTable {...props} columns={columns} />;
};

export default DestinationDataTable;

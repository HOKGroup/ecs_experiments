import React, { ReactElement } from 'react';
import Table from 'react-bootstrap/Table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table';
import './dataTable.css';

interface Props<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isRowActive?: (row: Row<T>) => boolean;
  onClickRow?: (row: Row<T>) => void;
  hiddenColumns?: string[];
}

const DataTable: <T>(props: Props<T>) => ReactElement<Props<T>> = ({
  data,
  columns,
  isRowActive,
  onClickRow,
  hiddenColumns,
}) => {
  const hiddenCols = hiddenColumns ?? [];
  const columnVisibility = hiddenCols.reduce(
    (acc, col) => ({ ...acc, [col]: false }),
    {},
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnVisibility,
    },
  });

  return (
    <Table striped bordered hover>
      <thead className="bg-dark data-table__header">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => {
          const isActive = isRowActive?.(row);
          const className = isActive
            ? 'table-active table-primary border-dark'
            : '';
          return (
            <tr
              key={row.id}
              className={className}
              onClick={() => onClickRow?.(row)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default DataTable;

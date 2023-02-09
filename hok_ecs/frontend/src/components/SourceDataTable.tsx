import React from 'react';
import Table from 'react-bootstrap/Table';
import { EntityOrComponentValue } from '../App';

interface Props {
  onClick: (v: EntityOrComponentValue) => void;
}
const SourceDataTable: React.FC<Props> = ({ onClick }) => {
  return (
    <Table bordered hover>
      <thead style={{ position: 'sticky', top: 0 }}>
        <tr>
          <th>First</th>
          <th>Last</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr
          onClick={() => onClick({ type: 'component', component_guid: '1234' })}
        >
          <td>Jim</td>
          <td>Steps</td>
          <td>Jim.steps@example.com</td>
        </tr>
        <tr className="table-active table-primary border-dark">
          <td>Steve</td>
          <td>Whats</td>
          <td>Steve.whats@example.com</td>
        </tr>
        <tr>
          <td>Greg</td>
          <td>Schleusner</td>
          <td>Greg.schleusner@hok.com</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default SourceDataTable;

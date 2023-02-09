import React from "react";
import Table from "react-bootstrap/Table";

const DestinationDataTable = () => {
  return (
    <Table bordered hover style={{tableLayout: "fixed"}}>
      <thead style={{ position: "sticky", top: 0 }}>
        <tr>
          <th className="w-50">First</th>
          <th className="w-50">Last</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Jim</td>
          <td>Steps</td>
        </tr>
        <tr>
          <td>Steve</td>
          <td>Whats</td>
        </tr>
        <tr className="table-active table-primary border-dark">
          <td>Greg</td>
          <td>Schleusner</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default DestinationDataTable;
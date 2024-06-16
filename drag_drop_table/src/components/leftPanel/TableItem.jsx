import React, { useState } from "react";

const TableItem = ({ table }) => {
  const [expandTable, setExpandTable] = useState(false);
  const toggleTableDetails = () => setExpandTable(!expandTable);
  return (
    <div>
      <span onClick={toggleTableDetails}>{expandTable ? "-" : "+"}</span>
      {table.name}
      {expandTable && (
        <div>
          <ul>
            {table?.columns?.map((column) => (
              <li key={column?.id}>{column?.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TableItem;

import React from "react";
import TableItem from "./TableItem";

const TableList = ({ tables }) => {
  const onDragStart = (event, table) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(table));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="table-list">
      {tables.map((table) => (
        <div
          key={table.id}
          className="table-item"
          onDragStart={(event) => onDragStart(event, table)}
          draggable
        >
          <TableItem table={table}/>
        </div>
      ))}
    </div>
  );
};

export default TableList;

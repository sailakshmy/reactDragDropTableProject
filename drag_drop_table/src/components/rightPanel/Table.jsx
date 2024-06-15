import React from "react";
import { FaTimes } from "react-icons/fa";

const Table = ({ table, tables, setTables }) => {
  const handleRemove = () => {
    let currentTableList = tables?.filter((tab) => table?.id !== tab?.id);
    setTables(currentTableList);
  };
  return (
    <div className="table-container">
      <div className="table-header">
        <span className="table-title">{table?.name}</span>
        <FaTimes className="table-close" onClick={handleRemove} />
      </div>
      <div className="table-columns">
        <div className="table-columns-header">
          <div className="column-name">Column</div>
          <div className="column-datatype">Datatype</div>
        </div>
        {table?.columns?.map((column) => (
          <div key={column?.column_id} className="columns">
            <div className="column-name">{column?.name}</div>
            <div className="column-datatype">{column?.column_data_type?.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;

import React, { useRef } from "react";
import { FaGripHorizontal, FaTimes } from "react-icons/fa";
import { ResizableBox } from "react-resizable";

const Table = ({ table, tables, setTables }) => {
  const tableRef = useRef(null);
  console.log("table inside Table", table, tables, setTables);
  const handleRemove = () => {
    let currentTableList = tables?.filter((tab) => table?.id !== tab?.id);
    setTables(currentTableList);
  };

  const handle = (
    <span className="react-resizable-handle react-resizable-handle-se" />
  );
  return (
    <ResizableBox
      ref={tableRef}
      width={300}
      height={200}
      minConstraints={[200, 100]}
      maxConstraints={[500, 400]}
      handle={handle}
      resizeHandles={["e", "s"]}
      className="resizable-table"
      style={{
        position: "absolute",
        left: table?.position?.x ?? 0,
        top: table?.position?.y ?? 0,
      }}
    >
      <div className="table-container">
        <div className="table-header">
          <FaGripHorizontal className="table-drag-handle" />
          <span className="table-title">{table?.data?.name}</span>
          <FaTimes className="table-close" onClick={()=>handleRemove()} />
        </div>
        <div className="table-columns">
          <div className="table-columns-header">
            <div className="column-name">Column</div>
            <div className="column-datatype">Datatype</div>
          </div>
          {table?.data?.columns?.map((column) => (
            <div key={column?.column_id} className="columns">
              <div className="column-name">{column?.name}</div>
              <div className="column-datatype">
                {column?.column_data_type?.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
        <div className="table-footer">Scroll to see more columns</div>
      </div>
    </ResizableBox>
  );
};

export default Table;

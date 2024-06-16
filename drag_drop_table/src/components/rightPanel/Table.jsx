import React, { useRef } from "react";
// import { ResizableBox } from "react-resizable";
import { Handle, Position } from "react-flow-renderer";
const Table = (props) => {
  const tableRef = useRef(null);
  console.log("table inside Table", props);
  // const handleRemove = () => {
  //   let currentTableList = tables?.filter((tab) => table?.id !== tab?.id);
  //   setTables(currentTableList);
  // };

  const handle = (
    <span className="react-resizable-handle react-resizable-handle-se" />
  );

  return (
    <>
  
     <div className="table-container" ref={tableRef}>
     <Handle type="target" position={Position.Left} />
     <div className="table-header">
       {/* <FaGripHorizontal className="table-drag-handle" /> */}
       <span className="table-title">{props?.data?.name}</span>
       {/* <FaTimes className="table-close" onClick={() => handleRemove()} /> */}
     </div>
     <div className="table-columns">
       <div className="table-columns-header">
         <div className="column-name">Column</div>
         <div className="column-datatype">Datatype</div>
       </div>
       {props?.data?.columns?.map((column) => (
         <div key={column?.column_id} className="columns">
           <div className="column-name">{column?.name}</div>
           <div className="column-datatype">
             {column?.column_data_type?.toUpperCase()}
           </div>
         </div>
       ))}
     </div>
     <div className="table-footer">Scroll to see more columns</div>
     <Handle type="source" position={Position.Right} />
   </div>

    </>

  );
};

export default Table;

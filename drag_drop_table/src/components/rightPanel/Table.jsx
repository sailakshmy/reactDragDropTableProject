import React, { useCallback, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { Handle, NodeResizer, Position } from "reactflow";
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};
const Table = (props) => {
  const tableRef = useRef(null);

  const handleResize = useCallback(debounce((size) => {
  }, 100), []);
  return (
    <>
      <NodeResizer
        minWidth={150}
        minHeight={100}
        onResize={(event, { size }) => handleResize(size)}
      />
     <div className="table-container" ref={tableRef}>
     <Handle type="target" position={Position.Left} />
     <div className="table-header">
       <span className="table-title">{props?.data?.name}</span>
       <FaTimes className="table-close" onClick={()=>props?.data?.onDelete()} />
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

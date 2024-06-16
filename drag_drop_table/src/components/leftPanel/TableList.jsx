import React from "react";

const TableList = ({ tables }) => {
  const onDragStart = (event, table) => {
    console.log("Hi");
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
          {table.name}
        </div>
      ))}
    </div>
  );
  // const onDragStart = (event, nodeType) => {
  //   event.dataTransfer.setData('application/reactflow', nodeType);
  //   event.dataTransfer.effectAllowed = 'move';
  // };

  // return (
  //   <aside>
  //     <div className="description">You can drag these nodes to the pane on the right.</div>
  //     <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
  //       Input Node
  //     </div>
  //     <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
  //       Default Node
  //     </div>
  //     <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
  //       Output Node
  //     </div>
  //   </aside>
  // )
};

export default TableList;

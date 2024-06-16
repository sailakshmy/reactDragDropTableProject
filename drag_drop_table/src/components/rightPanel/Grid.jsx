import React, { useCallback } from "react";
import ReactFlow from "reactflow";
import 'reactflow/dist/style.css';
import Table from "./Table";
const nodeTypes = { resizableTable: Table };

const Grid = ({
  nodes,
  edges,
  onConnect,
  onDragEnd,
  setReactFlowInstance,
  reactFlowInstance,
  setNodes,
  onEdgesChange,
  onNodesChange,
  onNodesDelete
}) => {

    const handleRemove = (table) => {
      const nodeList = nodes?.filter((node)=>node?.id !== table?.[0]?.id)
      setNodes(nodeList);
      onNodesDelete(table)
  };
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = event.target.getBoundingClientRect();
      const table = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const existingNodes = nodes?.find((node) => node?.id === table?.id);
      if (!existingNodes) {
        const newNode = {
          id: table.id.toString(),
          type: "resizableTable",
          position,
          data: { ...table},
        };
        newNode.data= {...newNode.data, onDelete: ()=> handleRemove([newNode])}

        setNodes((nds) => nds.concat(newNode));
      } else {
        alert("This table already exists in the grid");
      }
    },
    [reactFlowInstance, setNodes, nodes]
  );

  return (
    <div
      className="grid"
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
    
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        deleteKeyCode={["Backspace","Delete"]}
        onNodesDelete={onNodesDelete}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onInit={setReactFlowInstance}
        fitView
      >
      </ReactFlow>
    </div>
  );
};

export default Grid;

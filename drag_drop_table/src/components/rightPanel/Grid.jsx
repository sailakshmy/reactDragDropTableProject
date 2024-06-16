import React, { useCallback } from "react";
import ReactFlow, { useReactFlow } from "react-flow-renderer";
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
}) => {
  const { setViewport } = useReactFlow();

  const onDrop = useCallback(
    (event) => {
      console.log("Jefewf");
      event.preventDefault();
      console.log("Pheq");
      const reactFlowBounds = event.target.getBoundingClientRect();
      const table = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );
      console.log("table", table);
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const existingNodes = nodes?.find((node) => node?.id === table?.id);
      console.log("nodes", nodes,existingNodes);
      if (!existingNodes) {
        const newNode = {
          id: table.id.toString(),
          type: "resizableTable",
          position,
          data: { ...table },
        };

        setNodes((nds) => nds.concat(newNode));
      } else {
        alert("This table already exists in the grid");
      }
      console.log("YOoo");
    },
    [reactFlowInstance, setNodes, nodes]
  );

  return (
    <div
      className="grid"
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
      style={{ width: 1000, height: 1000 }}
    >
      {console.log("nodes inside", nodes)}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onInit={setReactFlowInstance}
        fitView
        style={{ width: "100%", height: "100%" }}
      >
      </ReactFlow>
    </div>
  );
};

export default Grid;

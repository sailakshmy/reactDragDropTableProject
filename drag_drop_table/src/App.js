import { useCallback, useState } from "react";
import {
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import "./App.css";
import TableList from "./components/leftPanel/TableList";
import Grid from "./components/rightPanel/Grid";
import { tables as tableList } from "./utilities/constants";

const edgesList = [{ id: '1-2', source: '1', target: '2' }];
function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgesList);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  const onDragEnd = useCallback(
    (event, node) => {
      console.log("Burrrr");
      setNodes((nds) => nds.map((n) => (n.id === node.id ? node : n)));
    },
    [setNodes]
  );

  return (
      <ReactFlowProvider>
        <div className="App" style={{ height: 800, width: 800 }}>
          <div className="left-panel">
            <TableList tables={tableList} setNodes={setNodes} />
          </div>
          <div className="right-panel" style={{ width: 1000, height: 1000 }}>
            <Grid
              nodes={nodes}
              setNodes={setNodes}
              edges={edges}
              onConnect={onConnect}
              onDragEnd={onDragEnd}
              setReactFlowInstance={setReactFlowInstance}
              reactFlowInstance={reactFlowInstance}
              onEdgesChange={onEdgesChange}
              onNodesChange={onNodesChange}
            />
          </div>
        </div>
      </ReactFlowProvider>
  );
}

export default App;

import { useCallback, useState } from "react";
import {
  ReactFlowProvider,
  addEdge,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  useEdgesState,
  useNodesState
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
  const onNodesDelete = useCallback(
    (deleted) => {
      console.log("deleted", deleted, nodes)
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );
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
              onNodesDelete={onNodesDelete}
            />
          </div>
        </div>
      </ReactFlowProvider>
  );
}

export default App;

import "./App.css";
import TableList from "./components/leftPanel/TableList";
import Grid from "./components/rightPanel/Grid";

function App() {
  return (
    <div className="App">
      <div className="left-panel">
        <TableList />
      </div>
      <div className="right-panel">
        <Grid />
      </div>
    </div>
  );
}

export default App;

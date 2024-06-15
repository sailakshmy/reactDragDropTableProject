import "./App.css";
import TableList from "./components/leftPanel/TableList";
import Grid from "./components/rightPanel/Grid";
import { tables } from "./utilities/constants";

function App() {
  return (
    <div className="App">
      <div className="left-panel">
        <TableList tables={tables}/>
      </div>
      <div className="right-panel">
        <Grid />
      </div>
    </div>
  );
}

export default App;

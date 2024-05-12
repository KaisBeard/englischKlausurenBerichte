import Header from "./Header";
import CriteriaButtons from "./CriteriaButtons.js";
import jsonData from "./Phrasen.json";

import "./App.css";

function App() {
  const data = jsonData;
  return (
    <div className="App">
      <Header />
      <CriteriaButtons data={data} />
    </div>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import SeatsTable from "./seats/SeatsTable";

const App = () => (
  <div className="container">
    <SeatsTable />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));

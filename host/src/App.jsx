import React from "react";
import ReactDOM from "react-dom";
import Name from "remote/Name";

import "./index.css";

const App = () => (
  <div className="container">
    <div>Name: host</div>
    <div>Framework: react</div>
    <Name/>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));

import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import LoginPage from "./auth/LoginPage";
import {AuthProvider} from "./auth/AuthProvider";

const App = () => (
    <div>AUTH APP</div>
);
ReactDOM.render(<App/>, document.getElementById("app"));

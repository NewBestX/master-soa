import React from "react";
import ReactDOM from "react-dom";

import SeatsElement from "./SeatsElement";

const App = () => (
    <div className="container">
        <SeatsElement token="test" room="1" user="test"/>
    </div>
);
ReactDOM.render(<App/>, document.getElementById("app"));

import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

// @ts-ignore
import LoginPage from "remoteAuth/LoginPage";
// @ts-ignore
import AuthContext from 'remoteAuth/AuthProvider';
import {BrowserRouter, Navigate, Route, Router, Routes} from "react-router-dom";


const App = () => (
    <AuthContext>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/" element={<Navigate replace to="/login"/>}/>
            </Routes>
        </BrowserRouter>
    </AuthContext>
);
ReactDOM.render(<App/>, document.getElementById("app"));

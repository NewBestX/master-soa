import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

// @ts-ignore
import LoginPage from "remoteAuth/LoginPage";
// @ts-ignore
import AuthContext from 'remoteAuth/AuthProvider';
import {BrowserRouter, Navigate, Route, Router, Routes} from "react-router-dom";
import {PrivateRoute} from "./auth/PrivateRoute";
import MainView from "./mainView/MainView";


const App = () => (
    <AuthContext>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrivateRoute/>}>
                    <Route path="/" element={<MainView/>}/>
                </Route>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    </AuthContext>
);
ReactDOM.render(<App/>, document.getElementById("app"));

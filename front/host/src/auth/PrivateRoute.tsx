import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Navigate, Outlet, Route} from 'react-router-dom';
// @ts-ignore
import {AuthContext, AuthState} from 'remoteAuth/AuthProvider';

export interface PrivateRouteProps {
    element: PropTypes.ReactNodeLike
    path: string;
    exact?: boolean;
}

export const PrivateRoute = () => {
    const {isAuthenticated} = useContext<AuthState>(AuthContext);
    console.log('render, isAuthenticated', isAuthenticated);
    return isAuthenticated ? <Outlet/> : <Navigate to={{pathname: '/login'}}/>
}

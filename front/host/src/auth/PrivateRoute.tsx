import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {Navigate, Route} from 'react-router-dom';
// @ts-ignore
import { AuthContext, AuthState } from 'remoteAuth/AuthProvider';

export interface PrivateRouteProps {
    component: PropTypes.ReactNodeLike;
    path: string;
    exact?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useContext<AuthState>(AuthContext);
    console.log('render, isAuthenticated', isAuthenticated);
    return (
        <Route {...rest} render={props => {
            if (isAuthenticated) {
                // @ts-ignore
                return <Component {...props} />;
            }
            return <Navigate to={{ pathname: '/login' }}/>
        }}/>
    );
}

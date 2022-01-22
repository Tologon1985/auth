import React from 'react';
import {Route,Redirect} from "react-router-dom";
import {useSelector} from "react-redux";


const PrivateRoute = ({component:Component,... rest}) => {
    const auth = useSelector(s=> s.user.auth)
    return (
            <Route
        {...rest}
            render={({ location }) =>
            auth ? (
            <Component/>
            ) : (
            <Redirect
            to={{
            pathname: "/signin",
            state: { from: location }
        }}
            />
            )
        }
            />
            )
}

export default PrivateRoute;
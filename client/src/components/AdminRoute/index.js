import React, {Component} from 'react';
import {Redirect, Route} from "react-router-dom";
import {isAuth} from "../../lib/authentication";

const AdminRoute = ({component:Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuth() && isAuth().role === "admin" ? (
                    <Component/>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}

export default AdminRoute;
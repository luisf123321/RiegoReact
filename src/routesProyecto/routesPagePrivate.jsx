import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom'


const RoutesPagePrivate = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem("token");
    const [isAuthenticated, setIsAuthenticated] = useState(null)

    const na = token && token !== '' && token != undefined;

    useEffect(() => {
        if (token) {
            let tokenExpiration = jwtDecode(token).exp;
            let dateNow = new Date();

            if (tokenExpiration < dateNow.getTime() / 1000) {
                setIsAuthenticated(false)
            } else {
                setIsAuthenticated(true)
            }
        } else {
            setIsAuthenticated(false)
        }

    }, []);
    if (isAuthenticated === null) {
        return <></>
    }
    return (
        <Route {...rest} render={props =>
            !isAuthenticated ? (
                <Redirect to='/login' />
            ) : (
                <Component {...props} />
            )
        }
        />
    );
}

export default RoutesPagePrivate;

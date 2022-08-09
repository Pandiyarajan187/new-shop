// import React from 'react'
// import { Navigate, Route } from 'react-router-dom'
// import { isAuthenticated } from './utils/Auth'
// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route
//         {...rest} 
//         render={
//             props => isAuthenticated() ?
//             (<Component {...props} />) :
//             (<Navigate 
//                 to={
//                        { pathname: '/SignIn', state: { from: props.location } }
//                    } />
//             )
//            }
//          />
// )

// export default PrivateRoute

import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'


export default function PrivateRoute() {
    let  userid = localStorage.getItem("token") == null ? false : true;
    return (
        <>
            {userid ? <Outlet  /> : <Navigate to="/SignIn" />};
        </>

    )
}
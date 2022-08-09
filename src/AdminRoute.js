// import React from 'react'
// import { Route, Navigate } from 'react-router-dom'
// import { isAuthenticated } from './utils/Auth'
// const AdminRoute = ({ component: Component, ...rest }) => (
  
//     <Route { ...rest } render={ props => isAuthenticated() && 
//         isAuthenticated().user.role === 1 ? ( <Component { ...props } /> ) : 
//     ( <Navigate to={{ pathname: '/SignIn', state: { from: props.location } }}/> ) }/>
// )

// export default 


import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { isAuthenticated } from './utils/Auth'


export default function AdminRoute() {
    const { user } = isAuthenticated()
    let  userid = localStorage.getItem("token") !== null && isAuthenticated().user.role === 1 ? true : false;
    return (
        <>
            {userid ? <Outlet  /> : <Navigate to="/SignIn" />};
        </>

    )
}
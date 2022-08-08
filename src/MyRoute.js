import React from 'react'
import Navigation from './Navigation';
import SignIn from './user/SignIn';
import SignUp from './user/SignUp';
import Home from './Home';
import Logout from './Logout';
import UserDashboard from './user/UserDashboard';
import PrivateRoute from './PrivateRoute';
import Header from './Header';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function MyRoute() {
    return (
            <div>
                <Header />
                
                <Routes>
                    <>
                    <Route path='/' element={<Home />} />
                    <Route path='/SignUp' element={<SignUp />} />
                    <Route path='/SignIn' element={<SignIn />} />
                    <Route path='/Logout' element={<Logout />} />

                    <Route exact element={<PrivateRoute  />}>
                    <Route path='/userDashboard' element={<UserDashboard />} />
                   </Route>
                    </>
                </Routes>
            </div>
    )
}

export default MyRoute
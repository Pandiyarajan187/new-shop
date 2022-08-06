import React from 'react'
import Navigation from './Navigation';
import SignIn from './user/SignIn';
import SignUp from './user/SignUp';
import Home from './Home';
import Logout from './Logout';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function MyRoute() {
    return (
            <div>
                <Navigation />
                <Routes>
                    <>
                    <Route path='/' element={<Home />} />
                    <Route path='/SignUp' element={<SignUp />} />
                    <Route path='/SignIn' element={<SignIn />} />
                    <Route path='/Logout' element={<Logout />} />
                    </>
                </Routes>
            </div>
    )
}

export default MyRoute
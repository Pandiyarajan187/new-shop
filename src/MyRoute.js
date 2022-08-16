import React, { useContext } from 'react'
import Navigation from './Navigation';
import SignIn from './user/SignIn';
import SignUp from './user/SignUp';
import Home from './Home';
import Logout from './Logout';
import UserDashboard from './user/UserDashboard';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute'
import Header from './Header';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import AdminDashboard from './admin/AdminDashboard';
import ReadAllProducts from './admin/ReadAllProducts';
import UpdateProducts from './admin/UpdateProduct';
import authContext from './context/authContext';
import Product from './core/Product';
import Cart from './core/Cart'
import Shop from './core/Shop';
import Search from './core/Search';

function MyRoute() {
 const {user , allProducts } = useContext(authContext)
    return (
        <div>
            <Header />
            <Routes>
                <>
                    <Route path='/' element={<Home />} />
                    <Route path='/SignUp' element={<SignUp />} />
                    <Route path='/SignIn' element={<SignIn />} />
                    <Route path='/Logout' element={<Logout />} />


                    <Route exact element={<PrivateRoute />}>
                        <Route path='/user/dashboard' element={<UserDashboard />} />
                        <Route path='/product/:productId' element={<Product />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/shop' element={<Shop />} />
                    </Route>

                    <Route exact element={<AdminRoute />}>
                        <Route path='/admin/dashboard' element={<AdminDashboard />} />
                        <Route path='/createcategory' element={<AddCategory />} />
                        <Route path='/addproduct' element={<AddProduct />} />
                        <Route path='/all/product' element={<ReadAllProducts />} />
                        <Route path='/update/product/:id' element={<UpdateProducts />} />
                    </Route>
                    {/* <Route>
            <PrivateRoute path='/user/dashboard' exact element={<UserDashboard />} />
            </Route>
            <Route>
            <AdminRoute path='/create/category' exact element={<AdminDashboard />} />
            </Route> */}
                </>
            </Routes>
        </div>
    )
}

export default MyRoute



{/* <div>
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
</div> */}
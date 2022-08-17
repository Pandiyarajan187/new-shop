// import React , { useContext , useEffect } from 'react'
// import { Link , useNavigate } from 'react-router-dom'
// import { useFormik } from 'formik'
// import * as Yup from 'yup'
// import authContext from '../context/authContext'

// function UserDashboardDetails() {
//   const {user , userDashboard , profileUpdate } = useContext(authContext)

//   const validationArray = Yup.object().shape({
//     email: Yup.string().email("Invalid Email Format").required('Email is Required'),
//     password: Yup.string().min(6).required('Password is Required'),
// })

// const formik = useFormik({
//     initialValues: {
//         email: '',
//         password: '',
//     },
//     validationSchema: validationArray,
//     onSubmit: async (values) => {
//         console.log(values);
//          profileUpdate(values)
//     }
// })
//   useEffect (()=>{
//     userDashboard()
//   },[])
//   return (
//     // <div>
//     // <h3 style={{ textAlign : 'center' , marginTop : '200px'}}>This is use sr Dashboard Page</h3>
//     // {console.log("USER" , user)}
//     // </div>
//     <div className="card-body px-4 py-5 px-md-5">
//                                     <form onSubmit={formik.handleSubmit}>
//                                         <div className="row">
//                                         </div>

//                                         <div className="form-outline mb-4">
//                                             <label className="form-label" for="form3Example3">Email address</label>
//                                             <input
//                                                 type="text"
//                                                 id="form3Example3"
//                                                 className="form-control"
//                                                 name='email'
//                                                 placeholder='Enter your email'
//                                                 onChange={formik.handleChange}
//                                                 value={formik.values.email}
//                                             />
//                                             <div className='text-danger'>
//                                                 {formik.touched.email ? formik.errors.email : null}
//                                             </div>
//                                         </div>

//                                         <div className="form-outline mb-4">
//                                             <label className="form-label" for="form3Example4">Password</label>
//                                             <input
//                                                 type="password"
//                                                 id="form3Example4"
//                                                 className="form-control"
//                                                 name='password'
//                                                 placeholder='Enter your Password'
//                                                 onChange={formik.handleChange}
//                                                 value={formik.values.password}
//                                             />
//                                             <div className='text-danger'>
//                                                 {formik.touched.password ? formik.errors.password : null}
//                                             </div>
//                                         </div>
//                                         <button
//                                             type="submit"
//                                             className="btn btn-primary btn-block mb-4">
//                                            Edit Profile
//                                         </button>
//                                     </form>
//                                 </div>
//   )
// }

// export default UserDashboardDetails

import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authContext from '../context/authContext'
import 'bootstrap-css-only/css/bootstrap.min.css'; 



function UserDashboard() {
    const { signout } = useContext(authContext)
    return (
        <div class="dropdown">
            {/* <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
            </button> */}
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button class="dropdown-item" type="button">Action</button>
                <button class="dropdown-item" type="button">Another action</button>
                <button class="dropdown-item" type="button">Something else here</button>
            </div>
        </div>

    )
}

export default UserDashboard



{/* <div class="row d-flex d-md-block flex-nowrap wrapper">
<div class="col-md-2 float-left col-1 pl-0 pr-0 collapse width show" id="sidebar">
    <div class="list-group border-0 card bg-faded text-center text-md-left">
        
        
        <Link to = "/" class="list-group-item d-inline-block collapsed" data-toggle="collapse" 
        data-parent="#sidebar" aria-expanded="false">
            
            <i class="fa fa-dashboard"></i> <span class="hidden-sm-down">Profile</span> </Link>&nbsp;

         <Link to = "/shop" class="list-group-item d-inline-block collapsed" data-parent="#sidebar">
            <i class="fa fa-film"></i> <span class="hidden-sm-down">Shop</span></Link>&nbsp;
            <Link to = "/cart" class="list-group-item d-inline-block collapsed" data-parent="#sidebar">
            <i class="fa fa-film"></i> <span class="hidden-sm-down">Cart</span></Link>&nbsp;
            <Link to = "" class="list-group-item d-inline-block collapsed" data-parent="#sidebar"  onClick={ signout }>
            <i class="fa fa-film"></i> <span class="hidden-sm-down">Logout</span></Link>&nbsp;
    </div>
</div>
    <Link to = "#" data-target="#sidebar" data-toggle="collapse"><i class="fa fa-navicon fa-lg py-2 p-1"></i></Link>

</div> */}

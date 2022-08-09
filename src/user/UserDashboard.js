import React , { useContext , useEffect } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import authContext from '../context/authContext'

function UserDashboardDetails() {
  const {user , userDashboard , profileUpdate } = useContext(authContext)

  const validationArray = Yup.object().shape({
    email: Yup.string().email("Invalid Email Format").required('Email is Required'),
    password: Yup.string().min(6).required('Password is Required'),
})

const formik = useFormik({
    initialValues: {
        email: '',
        password: '',
    },
    validationSchema: validationArray,
    onSubmit: async (values) => {
        console.log(values);
         profileUpdate(values)
    }
})
  useEffect (()=>{
    userDashboard()
  },[])
  return (
    // <div>
    // <h3 style={{ textAlign : 'center' , marginTop : '200px'}}>This is use sr Dashboard Page</h3>
    // {console.log("USER" , user)}
    // </div>
    <div className="card-body px-4 py-5 px-md-5">
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="row">
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" for="form3Example3">Email address</label>
                                            <input
                                                type="text"
                                                id="form3Example3"
                                                className="form-control"
                                                name='email'
                                                placeholder='Enter your email'
                                                onChange={formik.handleChange}
                                                value={formik.values.email}
                                            />
                                            <div className='text-danger'>
                                                {formik.touched.email ? formik.errors.email : null}
                                            </div>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" for="form3Example4">Password</label>
                                            <input
                                                type="password"
                                                id="form3Example4"
                                                className="form-control"
                                                name='password'
                                                placeholder='Enter your Password'
                                                onChange={formik.handleChange}
                                                value={formik.values.password}
                                            />
                                            <div className='text-danger'>
                                                {formik.touched.password ? formik.errors.password : null}
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block mb-4">
                                           Edit Profile
                                        </button>
                                    </form>
                                </div>
  )
}

export default UserDashboardDetails
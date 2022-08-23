import React , { useContext , useEffect } from 'react'
import { Link , useNavigate , useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import authContext from '../context/authContext'

function UserProfile() {
    const params = useParams()
  const {user , userDashboard , profileUpdate, getAllProducts, getUserDetails , getUserCategory } = useContext(authContext)

  const validationArray = Yup.object().shape({
    name : Yup.string().min(5).required("Name is Required"),
})

const formik = useFormik({
    initialValues: {
        email: user.email,
        name: user.name,
    },
    validationSchema: validationArray,
    onSubmit: async (values) => {
        // console.log(values);
         profileUpdate(values , user._id)
         console.log(user._id);
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
                                    <p className="h4 text-center py-4">Edit Your Name</p>
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
                                                disabled
                                            />
                                            <div className='text-danger'>
                                                {formik.touched.email ? formik.errors.email : null}
                                            </div>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" for="form3Example2">Name</label>
                                            <input
                                                type="text"
                                                id="form3Example2"
                                                className="form-control"
                                                name='name'
                                                placeholder='Enter your Name'
                                                onChange={formik.handleChange}
                                                value={formik.values.name}
                                            />
                                            <div className='text-danger'>
                                                {formik.touched.name ? formik.errors.name : null}
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block mb-4">
                                           Edit Profile
                                        </button>
                                    </form>
                                    {/* {console.log("getUserDetails",getUserDetails)} */}
                                </div>
  )
}

export default UserProfile
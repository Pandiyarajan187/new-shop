import React, { useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Toast } from '../Notify'
import 'react-toastify/dist/ReactToastify.css';
import { isAuthenticated } from '../utils/Auth'
import authContext from '../context/authContext'

//import SignUp from '../user/SignUp.css'

function SignIn() {
  
  let navigate = useNavigate()
  const { login } = useContext(authContext)
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
            // console.log(values);
            login(values)
        }
    })


    // const request = async (values) => {
    //     try {
    //         const res = await axios.post('/signin', values)
    //         console.log(res);
    //         if (res) {
    //           localStorage.setItem('token', (res.data.token))
    //           localStorage.setItem('user' , JSON.stringify(res.data.user))
    //           Toast.fire({ icon: 'success',title: `Welcome back, ${res.data.user.name}`, position: 'top-end' })
    //             return navigate('/')
    //         }
    //     } catch (error) {
    //         Toast.fire('Invalid Username or Password');
    //         console.log(error);
    //     }
    // }

    return (
        <div>
            <section className="background-radial-gradient overflow-hidden">
                <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                    <div className="row gx-lg-5 align-items-center mb-5" style={{ backgroundColor: '#000000' }}>
                        <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
                            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
                                The best offer for<br />
                                <span style={{ color: ' hsl(218, 81%, 75%' }}>your business</span>
                            </h1>
                            <p className="mb-4 opacity-5000" style={{ color: 'hsl(218, 81%, 85%' }}>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                Temporibus, expedita iusto veniam atque, magni tempora mollitia
                                dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                                ab ipsum nisi dolorem modi. Quos?
                            </p>
                        </div>

                        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                            <div className="card bg-glass">
                                <div className="card-body px-4 py-5 px-md-5">
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="row">
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label style={{paddingRight : '310px'}}  className="form-label" for="form3Example3">Email address</label>
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
                                            <label style={{paddingRight : '360px'}}  className="form-label" for="form3Example4">Password</label>
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
                                            Sign In
                                        </button>
                                      <div style={{color : 'black'}}> <h5>Don't have an account</h5><Link to='/SignUp'>Create Account</Link></div>
                                        <div className="text-center">
                                            <p>or sign In with:</p>
                                            <button type="button" className="btn btn-link btn-floating mx-1">
                                                <i className="fab fa-facebook-f"></i>
                                            </button>

                                            <button type="button" className="btn btn-link btn-floating mx-1">
                                                <i className="fab fa-google"></i>
                                            </button>

                                            <button type="button" className="btn btn-link btn-floating mx-1">
                                                <i className="fab fa-twitter"></i>
                                            </button>

                                            <button type="button" className="btn btn-link btn-floating mx-1">
                                                <i className="fab fa-github"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
     
    )
}

export default SignIn

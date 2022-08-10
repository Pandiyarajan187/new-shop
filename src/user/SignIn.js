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
        // <div className='container'>
        //     <div className='register-form'>
        //         <div>
        //             <h3>Registration</h3>
        //         </div>
        //         <form onSubmit={formik.handleSubmit}>
        //             <div className='form-group'>
        //                 <label htmlFor='name'>Name</label>
        //                 <input
        //                     className='form-control'
        //                     type='text'
        //                     name='name'
        //                     placeholder='Enter your name'
        //                     onChange={formik.handleChange}
        //                     value={formik.values.name}
        //                 />
        //                 <div className='text-danger'>
        //                     {formik.touched.name ? formik.errors.name : null}
        //                 </div>
        //             </div>
        //             <div className='form-group'>
        //                 <label htmlFor='email'>Email</label>
        //                 <input
        //                     className='form-control'
        //                     type='text'
        //                     name='email'
        //                     placeholder='Enter your email'
        //                     onChange={formik.handleChange}
        //                     value={formik.values.email}
        //                 />
        //                 <div className='text-danger'>
        //                     {formik.touched.email ? formik.errors.email : null}
        //                 </div>
        //             </div>
        //             <div className='form-group'>
        //                 <label htmlFor='password'>Password</label>
        //                 <input
        //                     className='form-control'
        //                     type='password'
        //                     name='password'
        //                     placeholder='Enter your Password'
        //                     onChange={formik.handleChange}
        //                     value={formik.values.password}
        //                 />
        //                 <div className='text-danger'>
        //                     {formik.touched.password ? formik.errors.password : null}
        //                 </div>
        //             </div>
        //             <div className='form-group'>
        //                 <label htmlFor='confirm_password'>Confirm Password</label>
        //                 <input
        //                     className='form-control'
        //                     type='password'
        //                     name='confirm_password'
        //                     placeholder='Enter your Confirm Password'
        //                     onChange={formik.handleChange}
        //                     value={formik.values.confirm_password}
        //                 />
        //                 <div className='text-danger'>
        //                     {formik.touched.confirm_password ? formik.errors.confirm_password : null}
        //                 </div>
        //             </div>
        //             <div className="form-check">
        //                 <label className="form-check-label">
        //                     <input
        //                         className='check'
        //                         type="checkbox"
        //                         onChange={formik.handleChange}
        //                         checked={formik.values.terms}
        //                         value={formik.values.terms}
        //                         name="terms" />
        //                     {/* <span className="form-check-sign">
        //                         <span className="check"></span>
        //                     </span> */}
        //                 </label>
        //                 <label htmlFor="acceptTerms" className="form-check-label">
        //                     I have read and agree to the Terms
        //                 </label>
        //                 {formik.touched.terms && formik.errors.terms ? (
        //                     <span style={{ color: 'red' }} >{formik.errors.terms}</span>) : null}
        //             </div>
        //             {/* <div className='form-group'>
        //             <label htmlFor='terms'>Accept Terms</label>
        //             <input
        //                 className='form-control'
        //                 type='Checkbox'
        //                 checked={formik.values.terms}
        //                 name='terms'
        //                 onChange={formik.handleChange}
        //                 value={formik.values.terms}
        //             />
        //             <span className="check"></span> 
        //             <label htmlFor="acceptTerms" className="form-check-label">
        //                 I have read and agree to the Terms
        //             </label>
        //             <div className='text-danger'>
        //                 {formik.errors.terms ? formik.errors.terms : null}
        //             </div>
        //         </div> */}
        //             <div className="text-center">
        //                 {/* <Link to='/SignIn'> */}
        //                 <button type="submit" className="btn btn-primary">
        //                     Register
        //                 </button>
        //                 {/* </Link> */}
        //             </div>
        //         </form>
        //     </div>
        // </div>
    )
}

export default SignIn

{/* <section className="background-radial-gradient overflow-hidden">
  <style>
    .background-radial-gradient {
      background-color: hsl(218, 41%, 15%);
      background-image: radial-gradient(650px circle at 0% 0%,
          hsl(218, 41%, 35%) 15%,
          hsl(218, 41%, 30%) 35%,
          hsl(218, 41%, 20%) 75%,
          hsl(218, 41%, 19%) 80%,
          transparent 100%),
        radial-gradient(1250px circle at 100% 100%,
          hsl(218, 41%, 45%) 15%,
          hsl(218, 41%, 30%) 35%,
          hsl(218, 41%, 20%) 75%,
          hsl(218, 41%, 19%) 80%,
          transparent 100%);
    }

    #radius-shape-1 {
      height: 220px;
      width: 220px;
      top: -60px;
      left: -130px;
      background: radial-gradient(#44006b, #ad1fff);
      overflow: hidden;
    }

    #radius-shape-2 {
      border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
      bottom: -60px;
      right: -110px;
      width: 300px;
      height: 300px;
      background: radial-gradient(#44006b, #ad1fff);
      overflow: hidden;
    }

    .bg-glass {
      background-color: hsla(0, 0%, 100%, 0.9) !important;
      backdrop-filter: saturate(200%) blur(25px);
    }
  </style>

  <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
    <div className="row gx-lg-5 align-items-center mb-5">
      <div className="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
        <h1 className="my-5 display-5 fw-bold ls-tight" style="color: hsl(218, 81%, 95%)">
          The best offer <br />
          <span style="color: hsl(218, 81%, 75%)">for your business</span>
        </h1>
        <p className="mb-4 opacity-70" style="color: hsl(218, 81%, 85%)">
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
            <form>
              <!-- 2 column grid layout with text inputs for the first and last names -->
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input type="text" id="form3Example1" className="form-control" />
                    <label className="form-label" for="form3Example1">First name</label>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input type="text" id="form3Example2" className="form-control" />
                    <label className="form-label" for="form3Example2">Last name</label>
                  </div>
                </div>
              </div>

              <!-- Email input -->
              <div className="form-outline mb-4">
                <input type="email" id="form3Example3" className="form-control" />
                <label className="form-label" for="form3Example3">Email address</label>
              </div>

              <!-- Password input -->
              <div className="form-outline mb-4">
                <input type="password" id="form3Example4" className="form-control" />
                <label className="form-label" for="form3Example4">Password</label>
              </div>

              <!-- Checkbox -->
              <div className="form-check d-flex justify-content-center mb-4">
                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                <label className="form-check-label" for="form2Example33">
                  Subscribe to our newsletter
                </label>
              </div>

              <!-- Submit button -->
              <button type="submit" className="btn btn-primary btn-block mb-4">
                Sign up
              </button>

              <!-- Register buttons -->
              <div className="text-center">
                <p>or sign up with:</p>
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
</section> */}
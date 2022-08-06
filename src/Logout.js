// import React from 'react'

// function Logout() {
//   return (
//     <div>
//          <h3 style={{ textAlign : 'center' , marginTop : '200px'}}>Thank You...</h3>
//          <form>
//          <div classNameName='container'>
//              <div classNameName='register-form'>
//                  <div>
//                      <h3>Registration</h3>
//                  </div>
//                  <form onSubmit={formik.handleSubmit}>
//                      <div classNameName='form-group'>
//                          <label htmlFor='name'>Name</label>
//                          <input
//                             className='form-control'
//                             type='text'
//                             name='name'
//                             placeholder='Enter your name'
//                             onChange={formik.handleChange}
//                             value={formik.values.name}
//                         />
//                         <div classNameName='text-danger'>
//                             {formik.touched.name ? formik.errors.name : null}
//                         </div>
//                     </div>
//                     <div className='form-group'>
//                         <label htmlFor='email'>Email</label>
//                         <input
//                             classNameName='form-control'
//                             type='text'
//                             name='email'
//                             placeholder='Enter your email'
//                             onChange={formik.handleChange}
//                             value={formik.values.email}
//                         />
//                         <div classNameName='text-danger'>
//                             {formik.touched.email ? formik.errors.email : null}
//                         </div>
//                     </div>
//                     <div classNameName='form-group'>
//                         <label htmlFor='password'>Password</label>
//                         <input
//                             classNameName='form-control'
//                             type='password'
//                             name='password'
//                             placeholder='Enter your Password'
//                             onChange={formik.handleChange}
//                             value={formik.values.password}
//                         />
//                         <div classNameName='text-danger'>
//                             {formik.touched.password ? formik.errors.password : null}
//                         </div>
//                     </div>
//                     <div classNameName='form-group'>
//                         <label htmlFor='confirm_password'>Confirm Password</label>
//                         <input
//                             classNameName='form-control'
//                             type='password'
//                             name='confirm_password'
//                             placeholder='Enter your Confirm Password'
//                             onChange={formik.handleChange}
//                             value={formik.values.confirm_password}
//                         />
//                         <div classNameName='text-danger'>
//                             {formik.touched.confirm_password ? formik.errors.confirm_password : null}
//                         </div>
//                     </div>
//                     <div className="form-check">
//                         <label className="form-check-label">
//                             <input
//                                 className='check'
//                                 type="checkbox"
//                                 onChange={formik.handleChange}
//                                 checked={formik.values.terms}
//                                 value={formik.values.terms}
//                                 name="terms" />
//                             {/* <span className="form-check-sign">
//                                 <span className="check"></span>
//                             </span> */}
//                         </label>
//                         <label htmlFor="acceptTerms" classNameName="form-check-label">
//                             I have read and agree to the Terms
//                         </label>
//                         {formik.touched.terms && formik.errors.terms ? (
//                             <span style={{ color: 'red' }} >{formik.errors.terms}</span>) : null}
//                     </div>
//                     {/* <div classNameName='form-group'>
//                     <label htmlFor='terms'>Accept Terms</label>
//                     <input
//                         classNameName='form-control'
//                         type='Checkbox'
//                         checked={formik.values.terms}
//                         name='terms'
//                         onChange={formik.handleChange}
//                         value={formik.values.terms}
//                     />
//                     <span className="check"></span> 
//                     <label htmlFor="acceptTerms" classNameName="form-check-label">
//                         I have read and agree to the Terms
//                     </label>
//                     <div classNameName='text-danger'>
//                         {formik.errors.terms ? formik.errors.terms : null}
//                     </div>
//                 </div> */}
//                     <div classNameName="text-center">
//                         {/* <Link to='/SignIn'> */}
//                         <button type="submit" classNameName="btn btn-primary">
//                             Register
//                         </button>
//                         {/* </Link> */}
//                     </div>
//                 </form>
//             </div>
//         </div>
//          </form>
//     </div>
//   )
// }

// export default Logout
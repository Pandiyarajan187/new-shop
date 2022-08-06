import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function SignIn() {

    const validationArray = Yup.object().shape({
        email: Yup.string().email("Invalid Email Format").required('Email is Required'),
        password: Yup.string().min(6).required('Password is required'),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationArray,
        onSubmit: async (values) => {
            console.log(values);
            alert("Register Successfully")
        }
    })

    return (
        <div className='container'>
            <div className='register-form'>
                <div>
                    <h3>Login</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            className='form-control'
                            type='text'
                            name='email'
                            placeholder='Enter your email'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <div className='text-danger'>
                            {formik.touched.email ? formik.errors.email : null}
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            className='form-control'
                            type='password'
                            name='password'
                            placeholder='Enter your Password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <div className='text-danger'>
                            {formik.touched.password ? formik.errors.password : null}
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn
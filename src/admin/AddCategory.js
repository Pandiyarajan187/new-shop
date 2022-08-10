import React, { useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import authContext from '../context/authContext'

function AddCategory() {
    const { addCategory } = useContext(authContext)
    const validationArray = Yup.object().shape({
        name: Yup.string().min(6).required('Category is Required'),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: validationArray,
        onSubmit: async (values) => {
            // console.log(values);
            addCategory(values)
        }
    })
    const CategoryForm = (
        <div>
        <form className='needs-validation' onSubmit={formik.handleSubmit} noValidate>
            <p className="h4 text-center py-4">Create Category</p>
            <div className="grey-text">
                <input
                    type="text"
                    className="form-control"
                    name='name'
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                <div className='text-danger'>
                    {formik.touched.name ? formik.errors.name : null}
                </div>
            </div>
            <div className="text-center py-4 mt-3">
                <button  className="btn btn-primary" color="cyan" type="submit">
                    create
                </button>
            </div>
        </form >
        </div>
    )

    return (
        <div className='container'>
            {CategoryForm}
        </div>
    )
}

export default AddCategory
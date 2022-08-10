import React, { useContext, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import authContext from '../context/authContext'

function AddCategory() {
    const { getAllCategory, addProduct } = useContext(authContext)
    const validationArray = Yup.object().shape({
        name: Yup.string().min(6).required('Name is Required'),
        description: Yup.string().min(10).required('Description is Required'),
        price: Yup.string().required('Price is Required'),
        category: Yup.string().min(6).required('category is Required'),
        quantity: Yup.string().required('quantity is Required'),
        shipping: Yup.string().min(6).required('shipping is Required'),
    })
    useEffect(() => {
        getAllCategory()
    }, [])

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
            category: '',
            quantity: '',
            photo: File,
            shipping: ''
        },
        validationSchema: validationArray,
        onSubmit: async (values) => {
            // console.log(values);
            addProduct(values)
        }
    })
    const CategoryForm = (
        <div>
            <form className='needs-validation' onSubmit={formik.handleSubmit} noValidate>
                <p className="h4 text-center py-4">Create Product</p>
                <div className="grey-text">
                    <label className="form-label" for="form3Example3">Name</label>
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
                <div className="grey-text">
                    <label className="form-label" for="form3Example3">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name='description'
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                    <div className='text-danger'>
                        {formik.touched.description ? formik.errors.description : null}
                    </div>
                </div>
                <div className="grey-text">
                    <label className="form-label" for="form3Example3">Price</label>
                    <input
                        type="text"
                        className="form-control"
                        name='price'
                        onChange={formik.handleChange}
                        value={formik.values.price}
                    />
                    <div className='text-danger'>
                        {formik.touched.price ? formik.errors.price : null}
                    </div>
                </div>
                <div className="grey-text">
                    <label className="form-label" for="form3Example3">Category</label>
                    <input
                        type="text"
                        className="form-control"
                        name='category'
                        onChange={formik.handleChange}
                        value={formik.values.category}
                    />
                    <div className='text-danger'>
                        {formik.touched.category ? formik.errors.category : null}
                    </div>
                </div>
                <div className="grey-text">
                    <label className="form-label" for="form3Example3">Quantity</label>
                    <input
                        type="text"
                        className="form-control"
                        name='quantity'
                        onChange={formik.handleChange}
                        value={formik.values.quantity}
                    />
                    <div className='text-danger'>
                        {formik.touched.quantity ? formik.errors.quantity : null}
                    </div>
                </div>
                <div className="grey-text">
                    <label className="form-label" for="form3Example3">Shipping</label>
                    <input
                        type="text"
                        className="form-control"
                        name='shipping'
                        onChange={formik.handleChange}
                        value={formik.values.shipping}
                    />
                    <div className='text-danger'>
                        {formik.touched.shipping ? formik.errors.shipping : null}
                    </div>
                </div>
                <label for="formFileMultiple" class="form-label">Multiple files input example</label>
                <input
                    class="form-control"
                    type="file"
                    name='photo'
                    id="formFileMultiple"
                    onChange={formik.handleChange}
                    value={formik.values.photo}
                    multiple />
                <div className='text-danger'>
                    {formik.touched.photo ? formik.errors.photo : null}
                </div>
                <div className="text-center py-4 mt-3">
                    <button className="btn btn-primary" color="cyan" type="submit">
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
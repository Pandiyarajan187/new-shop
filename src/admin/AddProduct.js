import React, { useState, useContext, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import authContext from '../context/authContext'

function AddCategory() {

    const { getAllCategory, addProduct, categories } = useContext(authContext)
    useEffect(() => {
        getAllCategory()
        console.log("this is category", categories);
    }, [])

    const [images, setImages] = useState('')
    const validationArray = Yup.object().shape({
        name: Yup.string().min(5).required('Name is Required'),
        description: Yup.string().min(5).required('Description is Required'),
        price: Yup.number().required('Price is Required'),
        category: Yup.string().required('category is Required'),
        quantity: Yup.number().required('quantity is Required'),
        shipping: Yup.string().required('shipping is Required'),
        photo: Yup.string().required("Photo is Required")
    })

    const handleImage = (e) => {
        if (e.target.files[0]) {
            formik.setFieldValue('photo', e.target.files[0])
        }
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
            category: '',
            quantity: '',
            photo: '',
            shipping: ''
        },
        validationSchema: validationArray,
        onSubmit: async (values) => {
            // console.log(values);
            // handleChange(values)
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
                    <label className="form-label" for="form3Example3">Choose Your Category</label>
                    <select className="custom-select mb-3" onChange={formik.handleChange} value={formik.values.category} name="category" >
                        <option value="select" selected>select Category</option>
                        {
                            categories.map((value, key) => {
                                return <option value={value._id} key={key}>{value.name}</option>
                            })
                        }
                    </select>
                    <div style={{color : "red"}}>{formik.touched.category ? formik.errors.category : null}</div>
                    {/* <div className='text-danger'>
                        {formik.touched.category ? formik.errors.category : null}
                    </div> */}
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
                    <div className="mb-3  d-inline p-2 m-1" >
                        <select className="custom-select mb-3" onChange={formik.handleChange}  value={formik.values.shipping} name="shipping" >
                            <option value="" selected>Choose shipping</option>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                        <div style={{color : "red"}}>{formik.touched.shipping ? formik.errors.shipping : null}</div>
                    </div>
                    {/* <div className='text-danger'>
                        {formik.touched.shipping ? formik.errors.shipping : null}
                    </div> */}
                </div>
                <label for="formFileMultiple" class="form-label">Upload Your Image</label>
                <input
                    class="form-control"
                    type="file"
                    name='photo'
                    id="formFileMultiple"
                    onChange={handleImage}
                    multiple />
                <div className='container'>
                    {formik.values.photo && <img src={URL.createObjectURL(formik.values.photo)} alt="" />}
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
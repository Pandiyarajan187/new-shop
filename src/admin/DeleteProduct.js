// import React, { useState } from 'react'
// import {  MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
// import useForm from '../../utils/Hooks/useForm'
// import { validateAddProduct } from '../../utils/Validator'
// import { request } from '../../utils/Request';
// import AdminDashboard from './AdminDashboard'
// import { Toast } from '../../utils/Notification'
// import { useEffect } from 'react';
// const UpdateProduct = (props) => {
//     const { handleChange, handleSubmit, values, errors, state, setValues, initialValues, setState } = useForm( submit, validateAddProduct )

//     const [images, setImages] = useState([])
//     const getAllCategories = async(id) => {
//         try {
//             const res = await request('get', '/categories/read')
//             const resProduct = await request('get', `/product/read/${id}`)
//             if (res) {
//                 setValues({
//                     ...values,
//                     categories: res.data,
//                     name: resProduct.data.name,
//                     description: resProduct.data.description,
//                     category: resProduct.data.category._id,
//                     price: resProduct.data.price,
//                     quantity: resProduct.data.quantity,
//                     shipping: resProduct.data.shipping
//                 })
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     useEffect(() => {
      
//         getAllCategories(props.match.params.id)
//         // eslint-disable-next-line
//     }, [])
//     async function submit() {
//         try {
//             var formData = new FormData()
//             formData.set('name', values.name)
//             formData.set('description', values.description)
//             formData.set('price', values.price)
//             formData.set('category', values.category)
//             formData.set('quantity', values.quantity)
//             if (typeof values.photo === 'object') {
//                 formData.set('photo', values.photo)
//             }
//             formData.set('shipping', values.shipping)
//             const res = await request('put', `/product/update/${props.match.params.id}/`, formData, true, true )
//             if (res.data) {
//                 setValues(initialValues)
//                 setImages([])
//                 setState(false)
//                 props.history.push('/admin/dashboard')
//                 return Toast.fire({ title: 'Product updated successfully.', icon: 'success' })
//             }
//         } catch (error) {
//             return Toast.fire({ title: 'Try again later!', icon: 'error' })
//         }
//     }

//     const onClickImages = (e) => {
//         if(e.target.files[0]) {
//             setImages(oldArray => [...oldArray, URL.createObjectURL(e.target.files[0])])
//         }
//         handleChange(e)
//     }
//     const ProductForm = (
//         <MDBRow>
//             <MDBCol md="6">
//                 <MDBCard style={{ borderTop: '5px solid #0099CC' }}>
//                     <MDBCardBody>
//                         <form className='needs-validation' onSubmit={handleSubmit} noValidate>
//                             <p className="h4 text-center py-4">Create Product</p>
//                             <div className="grey-text">
//                                 <MDBInput
//                                     className="mb-3"
//                                     outline
//                                     name="name"
//                                     label="Product Name"
//                                     icon="archive"
//                                     group
//                                     type="text"
//                                     validate
//                                     error="wrong"
//                                     required
//                                     value={values.name}
//                                     onChange={handleChange}
//                                 >
//                                     {
//                                         state ? (errors.name && <small className='text-danger ml-3 pl-3'> {errors.name} </small>) : null
//                                     }
//                                 </MDBInput>
//                                 <MDBInput
//                                     className="mb-3"
//                                     outline
//                                     name="description"
//                                     label="Description"
//                                     icon="comment-alt"
//                                     group
//                                     type="textarea"
//                                     validate
//                                     error="wrong"
//                                     required
//                                     value={values.description}
//                                     onChange={handleChange}
//                                 >
//                                     {
//                                         state ? (errors.description && <small className='text-danger ml-3 pl-3'> {errors.description} </small>) : null
//                                     }
//                                 </MDBInput>
//                                 <MDBInput
//                                     className="mb-3"
//                                     outline
//                                     name="price"
//                                     label="Price"
//                                     icon="dollar-sign"
//                                     group
//                                     type="text"
//                                     validate
//                                     error="wrong"
//                                     required
//                                     value={values.price}
//                                     onChange={handleChange}
//                                 >
//                                     {
//                                         state ? (errors.price && <small className='text-danger ml-3 pl-3'> {errors.price} </small>) : null
//                                     }
//                                 </MDBInput>
//                                 <MDBInput
//                                     className="mb-3"
//                                     outline
//                                     name="quantity"
//                                     label="Quantity"
//                                     icon="list-ol"
//                                     group
//                                     type="text"
//                                     validate
//                                     error="wrong"
//                                     required
//                                     value={values.quantity}
//                                     onChange={handleChange}
//                                 >
//                                     {
//                                         state ? (errors.quantity && <small className='text-danger ml-3 pl-3'> {errors.quantity} </small>) : null
//                                     }
//                                 </MDBInput>
//                                 <div className="mb-3 d-inline p-2 m-1">
//                                     <select className="custom-select mb-3" onChange={handleChange} name="category" >
//                                         <option value=""selected>Choose category</option>
//                                         {
//                                             values.categories.map((value, key) => {
//                                                 return <option value={value._id} key={key} selected={ value._id === values.category && true}>{ value.name }</option>
//                                             })
//                                         }
//                                     </select>
//                                     {
//                                         state ? (errors.category && <small className='text-danger ml-3 pl-3'> {errors.category} </small>) : null
//                                     }
//                                 </div><br/>
//                                 <div className="mb-3  d-inline p-2 m-1" >
//                                     <select className="custom-select mb-3" onChange={handleChange} name="shipping" placeholder={values.shipping}>
//                                         <option value="">Choose shipping</option>
//                                         <option value="0" selected={!values.shipping && true }>No</option>
//                                         <option value="1" selected={values.shipping && true }>Yes</option>
//                                     </select>
//                                     {
//                                         state ? (errors.shipping && <small className='text-danger ml-3 pl-3'> {errors.shipping} </small>) : null
//                                     }
//                                 </div>
//                             </div>
//                             <div className="text-center py-4 mt-3">
//                                 <MDBBtn color="cyan" type="submit">
//                                     EDIT
//                                 </MDBBtn>
//                             </div>
//                         </form>
//                     </MDBCardBody>
//                 </MDBCard>
//             </MDBCol>
//             <MDBCol md="6" className="pt-5">
//                 <div>
//                     <label htmlFor="photo" className="z-depth-2 bg-info p-5 text-white text-center rounded hoverable btn btn-block" style={{ border: '3px dashed white',  }}>
//                             <MDBIcon icon="upload" /><br />
//                             <p>Upload an image</p>
//                     </label>
//                     <input
//                         type="file"
//                         accept="image/*"
//                         name="photo"
//                         hidden
//                         id="photo"
//                         onChange={onClickImages}
//                     />
//                 </div>
//                 <img src={images} className="img-fluid" alt=""/>
//             </MDBCol>
//         </MDBRow>
//     )

//     return (
//         <div>
//             { <AdminDashboard />}
//             <br/>
//             { ProductForm }
//         </div>
//     )
// }

// export default UpdateProduct

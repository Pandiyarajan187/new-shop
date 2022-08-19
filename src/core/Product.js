import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { request } from '../utils/Request'
import moment from 'moment'
import { addItem } from '../utils/CartHelpers';
import Card from './Card'
import authContext from '../context/authContext'


const Product = (props) => {
    // const [product, setProduct] = useState({})
    // const [related, setRelated] = useState([])
    let params = useParams()
    const { productsLoad, getRelatedProducts, relatedProducts, loadProduct, totalCartFunc ,addCartItem } = useContext(authContext)
    // const relatedProducts = async  (productId) => {
    //     try {
    //         const res = await request('get', `/products/related/${productId}`)
    //         if (res) {
    //             setRelated(res.data)
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }
    const showStock = (quantity) => {
        return quantity > 0 ? <span class="badge badge-success badge-pill">In Stock</span> : <span class="badge badge-warning badge-pill">Out of Stock</span>
    }

    // const loadProduct = async (productId) => {
    //     try {
    //         const res = await request('get', `/product/read/${productId}`)
    //         if (res) {
    //             setProduct(res.data)
    //             relatedProducts(res.data._id)
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const addToCart = () => {
        addCartItem(productsLoad, () => {
            console.log(localStorage.getItem('cart'))
        })
        totalCartFunc()
    }
    useEffect(() => {
        loadProduct(params.productId)
        // relatedProducts(productsLoad._id)
        // eslint-disable-next-line
    }, [])
    return (
        <div class="product-page">
            <div class="page-header header-filter" data-parallax="true" filter-color="magenta" style={{ backgroundImage: "url('../assets/img/bg7.jpg')", backgroundSize: 'cover', backgroundPosition: "top center" }}>
                <div class="container">
                    <div class="row title-row">
                        <div class="col-md-4 ml-auto">

                        </div>
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="container">
                    <div class="main main-raised main-product">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 text-center">
                                <img src={`http://localhost:8000/api/product/photo/${productsLoad._id}`} alt={productsLoad._id} class="img-raised rounded" style={{ height: '250px' }} />
                            </div>
                            <div class="col-md-6 col-sm-6">
                                <h2 class="title"> {productsLoad.name} </h2>
                                <h3 class="main-price">$335</h3>
                                <div id="accordion" role="tablist">
                                    <div class="card card-collapse">
                                        <div class="card-header" role="tab" id="headingOne">
                                            <h5 class="mb-0">
                                                <a class='primary' data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{ color: "#9c27b0" }}>
                                                    Description
                                                    <i class="material-icons">keyboard_arrow_down</i>
                                                </a>
                                            </h5>
                                        </div>
                                        <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div class="card-body">
                                                {productsLoad.description}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card card-collapse">
                                        <div class="card-header" role="tab" id="headingOne">
                                            <h5 class="mb-0">
                                                <a data-toggle="collapse" href="#collapseThree" aria-expanded="true" aria-controls="collapseThree" style={{ color: "#9c27b0" }}>
                                                    Product Details
                                                    <i class="material-icons">keyboard_arrow_down</i>
                                                </a>
                                            </h5>
                                        </div>
                                        <div id="collapseThree" class="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
                                            <div class="card-body">
                                                <div class="table-responsive">
                                                    <table class="table">
                                                        <tbody>
                                                            <tr>
                                                                <th>Category</th>
                                                                <td>{productsLoad.category && productsLoad.category.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Added On</th>
                                                                <td>{moment(productsLoad.createdAt).fromNow()}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Stock</th>
                                                                <td>{showStock(productsLoad.quantity)}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Price</th>
                                                                <td>RS. {productsLoad.price}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row pull-right">
                                    <button class="btn btn-primary btn-round" onClick={addToCart}>Add to Cart &#xA0;<i class="material-icons">shopping_cart</i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="features text-center">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="info">
                                    <div class="icon icon-info">
                                        <i class="material-icons">local_shipping</i>
                                    </div>
                                    <h4 class="info-title">2 Days Delivery </h4>
                                    <p>Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="info">
                                    <div class="icon icon-success">
                                        <i class="material-icons">verified_user</i>
                                    </div>
                                    <h4 class="info-title">Refundable Policy</h4>
                                    <p>Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="info">
                                    <div class="icon icon-rose">
                                        <i class="material-icons">favorite</i>
                                    </div>
                                    <h4 class="info-title">Popular Item</h4>
                                    <p>Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* {getRelatedProducts.length > 0 && <div class="related-products">
                        <h3 class="title text-center">You may also be interested in:</h3>
                        <div class="row">
                            {getRelatedProducts.map((value, key) => <div className="col-md-4 pb-4"><Card key={key} product={value} /></div>)}
                        </div>
                    </div>} */}
                </div>
            </div>
             <div className="row">
            {/* <div className="col-md-8">
                <Card product={productsLoad} showButton={false}/>
            </div> */}
            {/* <div className="col-md-4">
                <h4>Related Products</h4>
                { getRelatedProducts.map((value, key) => <div className="col-md-12 pb-4"><Card key={key} product={value} /></div> ) }
            </div> */}
            </div>
        </div>
    )
}

export default Product



// import React, { useContext } from "react";
// import { CartContext } from "./CartContext";

// const Product = () => {
//   const [contextValue, setContext] = useContext(CartContext);

//   const addToCart = () => {
//     const productId = 10001;
//     setContext((oldValues) => {
//       const productIndex = oldValues.findIndex(
//         (val) => val.productId === productId
//       );

//       let updatedCartItems = [];

//       // If the product already exists in cart, then update the quantity
//       if (productIndex !== -1) {
//         updatedCartItems = [
//           ...oldValues.slice(0, productIndex),
//           {
//             productId,
//             count: oldValues[productIndex].count + 1,
//           },
//           ...oldValues.slice(productIndex + 1),
//         ];
//       } else {
//         //Otherwise add the item to the end of the array
//         updatedCartItems = [...oldValues, { productId, count: 1 }];
//       }

//       try {
//         window.localStorage.setItem(
//           "cartItems",
//           JSON.stringify(updatedCartItems)
//         );
//       } catch (e) {
//         console.error("Error in storing cart items in local storage");
//       }

//       return updatedCartItems;
//     });
//   };
//   return (
//     <div role="main" className="main">
//       <div className="image">
//         <img
//           src="https://res.cloudinary.com/codingdeft/image/upload/v1594182634/medium_daniel_fernandez_ABZE_n_A28v_JI_unsplash_8f472f69bf.jpg"
//           alt="Item"
//         />
//       </div>
//       <div className="details">
//         <p className="manufacturer">Yearin</p>
//         <p className="name">Black And White Broad Checks Shirt</p>
//         <p className="price">$22.99</p>
//         <p className="description">
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae, est.
//           Quo enim hic aliquid, non omnis corrupti dicta. Mollitia reiciendis
//           aperiam aut quia ad recusandae, facere qui! Cumque, voluptatum animi.
//         </p>
//         <p>
//           <button className="atc_btn" onClick={addToCart}>
//             Add to Cart
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Product;
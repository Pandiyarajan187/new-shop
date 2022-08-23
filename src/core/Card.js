import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './ShowImage';
import moment from 'moment'
import { updateItem, removeItem } from '../utils/CartHelpers';
import authContext from '../context/authContext';


const Card = ({ product, showButton = true, cartUpdate = false,showAddToCart = true, showRemoveCartButton = false}) => {
    const [count, setCount] = useState(null)
    const { addCartItem, 
        totalCartFunc, 
         removeProduct,
         removeCartItem,
         } = useContext(authContext)
    const showStock = (quantity) => {
        return quantity > 0 ? <span class="badge badge-success badge-pill">In Stock</span> : <span class="badge badge-warning badge-pill">Out of Stock</span>
    }
    const addToCart = () => {
        addCartItem(product, () => {
            console.log(localStorage.getItem('cart'))
        })
        totalCartFunc()
    }
 
    return (
        <div class="card card-product card-plain">
            <div class="card-header card-header-image">
                <ShowImage item={product} url='product' />
                <div class="colored-shadow" style={{ backgroundImage: `url(http://localhost:8000/api/product/photo/${product._id})`, opacity: 1 }}></div></div>
            <div class="card-body">
                <h4 class="card-title">
                    <Link to="#">{product.name}</Link>
                </h4>

                <p class="card-description">{product.description !== undefined && product.description.slice(0, 20)}...</p>
                <p>Category: {product.category && product.category.name}</p>
                <p>Added on {moment(product.createdAt).fromNow()}</p>
                <div class="price-container">
                    {showStock(product.quantity)}<br /><br />
                    {product.price - 20 < 0 ? null : <span class="price price-old"> RS. {product.price}</span>}
                    <span class="price price-new"> RS. {product.price - 20}</span>
                </div>
            </div>
            <div class="card-footer">
                <div class="stats">
                    {showButton ? <Link className="btn btn-primary btn-sm" to={`/product/${product._id}`}>View Product</Link> : null}
                </div>
                <div class="stats ml-auto">
                    {showAddToCart ? <button className="btn btn-outline-primary btn-sm" onClick={addToCart}><span class="material-icons">shopping_cart</span> Add to Cart</button> : null}
                        {/* {showRemoveCartButton ? <button className="btn btn-outline-primary btn-sm" onClick={() => removeCartItem(product._id)}><span class="material-icons">shopping_cart</span> Remove</button> : null} */}
                    {/* {!showAddToCart ?
                        <button className="btn btn-outline-primary btn-sm"
                            onClick={() => removeProduct(product._id)}>
                            <span class="material-icons">shopping_cart</span>
                            Remove Cart</button> :
                        <button className="btn btn-outline-primary btn-sm" onClick={addToCart}>
                            <span class="material-icons">shopping_cart</span>
                            Add to Cart
                        </button>
                    } */}


                    {/* {showCartUpdate(cartUpdate)} */}
                </div>
            </div>
        </div>
    )
}

export default Card



///
// {!showAddToCart ?
//     <button className="btn btn-outline-primary btn-sm"
//     onClick={() => removeProduct(product._id)}>
//         <span class="material-icons">shopping_cart</span>
//          Remove Cart</button> :
//          <button className="btn btn-outline-primary btn-sm" onClick={addToCart}>
//         <span class="material-icons">shopping_cart</span>
//          Add to Cart
//          </button>
//          }
///
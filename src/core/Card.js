import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './ShowImage';
import moment from 'moment'
import { addItem, updateItem, removeItem } from '../utils/CartHelpers';
const Card = ({ product, showButton = true, showAddToCart = true, cartUpdate = false, showRemoveCartButton = false }) => {
    const [count, setCount] = useState(null)
    const showStock = (quantity) => {
        return quantity > 0 ? <span class="badge badge-success badge-pill">In Stock</span> : <span class="badge badge-warning badge-pill">Out of Stock</span>
    }
    const addToCart = () => {
        addItem(product,() => {
            console.log(localStorage.getItem('cart'))
        })
    }
    const handleChange = (productId) => (e) => {
        setCount(e.target.value < 1 ? 1 : e.target.value)
        if (e.target.value >= 1) {
            updateItem(productId, e.target.value)
        }
    }
    const showCartUpdate = (cartUpdate) => {
        return (
            cartUpdate && <div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            Adjust Quantity
                        </span>
                    </div>
                    <input type="number" name={product._id} className="form-control" value={count} onChange={handleChange(product._id)}/>
                </div>
            </div>
        )
    }
    return (
        <div class="card card-product card-plain">
            <div class="card-header card-header-image">
                <ShowImage item={product} url='product' />
                <div class="colored-shadow" style={{backgroundImage: `url(http://localhost:8000/api/product/photo/${product._id})`, opacity: 1}}></div></div>
                <div class="card-body">
                    <h4 class="card-title">
                        <Link to="#">{product.name}</Link>
                    </h4>

                    <p class="card-description">{product.description !== undefined && product.description.slice(0, 20)}...</p>
                    <p>Category: {product.category && product.category.name}</p>
                    <p>Added on {moment(product.createdAt).fromNow()}</p>
                    <div class="price-container">
                        {showStock(product.quantity)}<br /><br />
                        {product.price - 20 < 0 ? null : <span class="price price-old"> RS. {product.price - 20}</span> }
                        <span class="price price-new"> RS. {product.price}</span>
                    </div>
                </div>
            <div class="card-footer">
                <div class="stats">
                    {showButton ? <Link className="btn btn-primary btn-sm" to={`/product/${product._id}`}>View Product</Link> : null}
                </div>
                    <div class="stats ml-auto">
                        {showAddToCart ? <button className="btn btn-outline-primary btn-sm" onClick={addToCart}><span class="material-icons">shopping_cart</span> Add to Cart</button> : null}
                        {showRemoveCartButton ? <button className="btn btn-outline-primary btn-sm" onClick={() => removeItem(product._id)}><span class="material-icons">shopping_cart</span> Remove</button> : null}
                        {showCartUpdate(cartUpdate)}
                    </div>
                </div>
            </div>
    )
}

export default Card

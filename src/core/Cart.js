import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { updateItem } from '../utils/CartHelpers'
import Card from './Card'
import { Link } from 'react-router-dom'
import Checkout from './Checkout'
import Product from './Product'
import authContext from '../context/authContext'


const Cart = () => {
    const { removeCartItem, getCartItem, getItem, totalCartFunc, totalItem, updateItem, updateCartFunc, handleAdd, handleRemove } = useContext(authContext)
    const [add, setAdd] = useState(null)
    const [remove, setRemove] = useState(null)
    const [items, setItems] = useState([])

    // const handleAdd = (id , e) => {
    //      var add = e + 1
    //     setAdd(add)
    //     updateCartFunc(id , add)
    //     console.log("++++++++++++", add);
    // }
    // const handleRemove = (id , e) => {
    //     var remove = e - 1
    //     setAdd(remove)
    //     updateCartFunc(id , remove)
    //     console.log("-----------", remove);
    // }
    // var data  = JSON.stringify(localStorage.getItem('cart'));
    // var total = data.reduce((total, item) => total + item.price ,0)

    console.log(totalItem, '++++++++++++++')
    var cart = JSON.parse(localStorage.getItem('cart'))
    var val;
    const showItems = (items) => {
        return (

            <div class="shopping-cart">
                <div class="page-header header-filter header-small" data-parallax="true" style={{ backgroundImage: "url('../assets/img/bg2.jpg')" }}>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-8 ml-auto mr-auto text-center">
                                <h2 class="title">Your Cart Has {cart && totalItem?.length} Items</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main main-raised">
                    <div class="container">
                        <div class="card card-plain">
                            <div class="card-body">
                                <h3 class="card-title">Shopping Cart</h3>
                                <br />
                                <div class="table-responsive">
                                    <table class="table table-shopping">
                                        <thead>
                                            <tr>
                                                <th class="text-center"></th>
                                                <th>Product</th>
                                                <th class="text-right">Description</th>
                                                <th class="text-right">Qty</th>
                                                <th class="text-right">Amount</th>
                                                <th class="text-right">Total</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((value, key) => (
                                                <tr>
                                                    <td><div class="img-container"><img src={`http://localhost:8000/api/product/photo/${value._id}`} alt="..." /></div></td>
                                                    <td class="td-name">{value.name}</td>
                                                    <td class="td-number text-right">{value.description}</td>
                                                    <td class="td-number">{value.quantity}</td>
                                                    <td class="td-number">{value.price}</td>
                                                    <td class="td-number">RS. {value.quantity * value.price }</td>
                                                    <td class="td-number">
                                                        <div class="btn-group btn-group-sm">
                                                        <button className="btn btn-primary btn-block mb-2"> <i class="material-icons" onClick={()=>{handleRemove(value._id , value.quantity)}}>remove</i> </button>
                                                            <button className="btn btn-primary btn-block mb-2"> <i class="material-icons" onClick={()=>{handleAdd(value._id , value.quantity)}} >add</i> </button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="img-container">
                                                            <button style={{ width: '60%' }} className="btn btn-primary btn-block mb-2" onClick={() => { removeCartItem(value._id) }}>Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}

                                            <tr>
                                                <td colspan="3"></td>
                                                <td class="td-total">
                                                    Total Price
                                                </td>
                                                <td colspan="1" class="td-price">
                                        <td class="td-number">RS. {items.reduce((total, item) => total + (item.price * item.quantity), 0)}</td>
                                                </td>
                                                <td colspan="1"></td>
                                                <td colspan="2" class="text-right">
                                                    <Link to='/checkout'>
                                            <button type="button" class="btn btn-primary btn-round">Complete Purchase <i class="material-icons">keyboard_arrow_right</i></button></Link>
                                        </td>
                                            </tr>
                                            {/*<tr>
                    <td colspan="6"></td>
                    <td colspan="2" class="text-right">
                      <button type="button" class="btn btn-info btn-round">Complete Purchase <i class="material-icons">keyboard_arrow_right</i></button>
                    </td>
                                  </tr> */}
                                        </tbody>

                                        {/* <div  class="td-number">RS. {items.reduce((total , item)=>total+ (item.price) ,0)}</div> */}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<h2>Your cart has { totalItem() } items</h2>
                <hr/>
        {items.map((value, key) => <Card product={ value } key={key} showAddToCart={false} showRemoveCartButton={true} cartUpdate={true}/>)}*/}
            </div>
        )
    }

    const noItemMessage = () => (
        <div>
            <h2>Your cart is empty</h2>
            <br />
            <button className="btn btn-primary">
                <Link style={{ color: 'white' }} to="/shop">Continue Shopping</Link>
            </button>
        </div>
    )
    useEffect(() => {
        getCartItem()
        totalCartFunc()
        setItems(getItem)
    }, [])
    return (
        <div>
            {cart && totalItem?.length > 0 ? showItems(getItem) : noItemMessage()}
            {/* {console.log("totalItem.length ",totalItem.length )} */}
            <div>

                <div className="row">
                    <div className="col-md-6">

                    </div>
                    {/* <div className="col-md-6">
                    <Checkout product={items}/>
                </div> */}
                </div>
            </div>
        </div>

    )
}

export default Cart
//Quantity added
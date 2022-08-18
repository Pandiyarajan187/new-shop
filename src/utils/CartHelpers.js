
import React from "react"
import { Toast } from '../Notify'
import 'react-toastify/dist/ReactToastify.css';

export const addItem = (item ) => {
    let cart = []
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        // console.log(cart,item,cart.find(element => element._id !== item._id))
        if(!cart.find(element => element._id === item._id) ){
            Toast.fire({ icon: 'success' , title: 'Cart Added Successfully'});
            cart.push(item)
        }else{
            Toast.fire({ icon: 'error' , title: 'Cart is Already Added'});
        }

         localStorage.setItem("cart", JSON.stringify(cart));
}

export const totalItem = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length
        }
    }
    return 0
}

export const getItem = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
    return []
}

export const updateItem = (productId, quantity) => {
    let cart = []
    cart = JSON.parse(localStorage.getItem('cart'))
    for(let value of cart){
       if(value._id === productId){
        value.quantity = quantity;
       }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    // updateItem(10, 80);
 }

// export const updateItem = (productId, quantity) => {
//     let cart = []
//     if (typeof window !== 'undefined') {
//         if (localStorage.getItem('cart')) {
//             cart = JSON.parse(localStorage.getItem('cart'))
//         }
//     }
//     // eslint-disable-next-line
//     cart.map((value, key) => {
//         if (value._id === productId) {
//             cart[key].quantity = quantity + 1
//         }
//         localStorage.setItem('cart', JSON.stringify(cart))
//     })
// }

export const removeItem = (productId) => {
    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
    }
    // eslint-disable-next-line
    cart.map((value, key) => {
        if (value._id === productId) {
            cart.splice(key, 1)
        }
        localStorage.setItem('cart', JSON.stringify(cart))
    })
    return cart
}

export const emptyCart = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('cart')
    }
}





// import React, { useContext } from 'react'
// import authContext from '../context/authContext';

// const help = ({allProducts}) => {

// const {allProducts} =useContext(authContext)

// localStorage.setItem("products", JSON.stringify(allProducts));
// console.log(localStorage.getItem("cart"));
// if(!localStorage.getItem("cart")){
//     localStorage.setItem("cart", "[]");
// }

// let products = JSON.parse(localStorage.getItem("products"));
// let cart = JSON.parse(localStorage.getItem("cart"));

//  const addItem = (productId) => {
	
// 	let product = products.find((product) => {
// 		return product.id == productId;	
// 	});

// 	if(cart.length == 0){
// 		cart.push(product);
// 	}else{
// 		let res = cart.find(element => element.id == productId);
// 		if(res === undefined){
// 			cart.push(product);
// 		}
// 	}
	
// 	localStorage.setItem("cart", JSON.stringify(cart));
// }

//  const totalItem = () => {
//     if (typeof window !== 'undefined') {
//         if (localStorage.getItem('cart')) {
//             return JSON.parse(localStorage.getItem('cart')).length
//         }
//     }
//     return 0
// }

//  const getItem = () => {
//     if (typeof window !== 'undefined') {
//         if (localStorage.getItem('cart')) {
//             return JSON.parse(localStorage.getItem('cart'))
//         }
//     }
//     return []
// }

//  const updateItem = (productId, count) => {
//     let cart = []
//     if (typeof window !== 'undefined') {
//         if (localStorage.getItem('cart')) {
//             cart = JSON.parse(localStorage.getItem('cart'))
//         }
//     }
//     // eslint-disable-next-line
//     cart.map((value, key) => {
//         if (value._id === productId) {
//             cart[key].count = count
//         }
//         localStorage.setItem('cart', JSON.stringify(cart))
//     })
// }

//  const removeItem = (productId) => {
//     let cart = []
//     if (typeof window !== 'undefined') {
//         if (localStorage.getItem('cart')) {
//             cart = JSON.parse(localStorage.getItem('cart'))
//         }
//     }
//     // eslint-disable-next-line
//     cart.map((value, key) => {
//         if (value._id === productId) {
//             cart.splice(key, 1)
//         }
//         localStorage.setItem('cart', JSON.stringify(cart))
//     })
//     return cart
// }

//  const emptyCart = () => {
//     if (typeof window !== 'undefined') {
//         localStorage.removeItem('cart')
//     }
// }
// return{
//     addItem,
//     removeItem,
//     totalItem,
//     getItem,
//     updateItem,
//     emptyCart,
//     removeItem
// }
// }
// export default help;

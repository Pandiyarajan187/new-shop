import React , { useReducer , useEffect , useState} from "react";
import qs from 'query-string'
import { useFormik } from 'formik'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { request } from "../utils/Request";
import AuthContext from "./authContext";
import authReducer from  './authReducer';
import { Toast } from '../Notify'
import 'react-toastify/dist/ReactToastify.css';
import axios from "../api/axios";
import { isAuthenticated } from "../utils/Auth";
import { 
    LOGIN,
    LOGOUT,
    DASHBOARD_PAGE, 
    PROFILE_UPDATE,
    ADD_CATEGORY,
    ADD_PRODUCT,
    GETALL_CATEGORY,
    GET_PRODUCT,
    DELETE_PRODUCT,
    GETUSER_CATEGORY,
    GETPRODUCT_BYSELL,
    GETPRODUCT_BYARRIVAL,
    RELATED_PRODUCTS,
    LOAD_PRODUCT,
    BUYER_CATEGORY,
    SEARCH_SUBMIT,
    ADD_ITEM,
    REMOVE_ITEM,
    GET_ITEM,
    TOTAL_ITEM,
    UPDATE_ITEM,
    REMOVE_PRODUCT,
    DETAILS
} from "./authTypes";

const AuthState = (props) => {
    const navigate = useNavigate()
    const params = useParams()
    const [values, setValues] = useState()
    const [add, setAdd] = useState(null)
    const [price, setPrice] = useState(null)
    const [remove, setRemove] = useState(null)
    const { user, token} = isAuthenticated()
    const initialState = {
        token,
        user,
        orders: [],
        id : null,
        name : null,
        data : [],
        values : null,
        categories : [],
        allProducts : [],
        getAllEditProducts : [],
        getUserDetails : [],
        getProductsForSell : [],
        getProductsForArrival : [],
        getRelatedProducts : [],
            categories: [],
            category: 'All',
            search: '',
            results: [],
            searched: false,
        buyerCategory : [],
        submitSearch : [],
        productsLoad : [],
        addItem : [],
        removeItem : [],
        getItem : [],
        totalItem : [],
        updateItem :[],
        showAddToCart : true,
        showRemoveCartButton : false,
        details : []
    }

    const [state, dispatch] = useReducer(authReducer, initialState)
    //let res = new response(dispatch, DASHBOARD_PAGE)
useEffect(() => {
    // setValues(...user, user.name, user.email )
}, [])

const register = async (values) => {
  try {
    const res = await axios.post('/signup', values)
    console.log(res);
    if (res) {
        Toast.fire({ icon: 'success',title: 'Register successfully' })
        return navigate('/signin')
    }
} catch (error) {
    Toast.fire({ icon: 'warning',title: 'Email already exist!' })
    console.log(error);
}
}
const login = async (values) => {
        try {
          const res = await axios.post('/signin', values)
          //   console.log("VALUES",values);
          if (res) {
              console.log("RESPONSE",res);
          localStorage.setItem('token', (res.data.token))
          localStorage.setItem('user' , JSON.stringify(res.data.user))
          Toast.fire({ icon: 'success',title: `Welcome back, ${res.data.user.name}`, position: 'top-end' })
          dispatch({
            type: LOGIN,
            payload: res.data,
        })
        if(res.data.user.role === 0){
            return navigate('/Home')
        }else{
            return navigate('/admin/dashboard')
        }
    }
    } catch (error) {
        Toast.fire('Invalid Username or Password');
        console.log("THIS IS ERROR",error);
    }
}
  const signout = (data) => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('cart')
    Toast.fire({ icon: 'success' ,title: 'Sign out successfully.' })
    dispatch({
        type: LOGOUT,
        payload: data,
    })
    navigate('/SignIn')
  }
    const userDashboard = async (data) => {
        try {
            const res = await request('get', '/orders/by/user/', {}, true, true)
            if(res.data.length){
                console.log("res", res)
                dispatch({
                    type: DASHBOARD_PAGE,
                    payload: res.data,
                })
           Toast.fire({ icon: 'success',title: 'Success!!!', position: 'top-end' })
            }else{
            //  Toast.fire({ icon: 'error',title: 'something went wrong!!!', position: 'top-end' })
            }
        } catch (error) {
            console.log(error);
        }
    } 
    const profileUpdate = async (values , id) => {
        // const id = true
        // const userToken = true
        try {
            // var formData = new FormData()
            // formData.set('name', values.name)
            const res = await request('put', '/user/update/',  { name: values.name } ,true ,true)
            if(res){
                // dispatch({
                //     type: PROFILE_UPDATE,
                //     payload: res.data,
                // })
                let user = []
                user = JSON.parse(localStorage.getItem('user'))
                if(user){
                    console.log(user);
                        if(user._id === id){
                            user.name = values.name;
                        }
                     localStorage.setItem("user", JSON.stringify(user));
                    Toast.fire({ title: 'Profile Updated Successfully!', icon: 'success' })
            }
            }else{
             Toast.fire({ icon: 'error',title: 'something went wrong!!!', position: 'top-end' })
            }
        } catch (error) {
            console.log(error);
        }
    } 
    const addCategory = async (values) => {
       // '/category/create/'
        const id = true 
        const userToken = true
        try {
            const res = await request('POST', '/category/create/',  { name : values.name}, id, userToken)
            console.log("RESPONSE",res);
            console.log("VALUES",values);
            if (res.status === 200) {
                Toast.fire({ title: 'Category created successfully.', icon: 'success' })
                dispatch({
                    type: ADD_CATEGORY,
                    payload: res.data,
                })
                navigate('/admin/dashboard')
            } else {
                Toast.fire({ title: 'Category Already exists.', icon: 'error' })
            }
        } catch (error) {
            return Toast.fire({ title: 'Try Again later!', icon: 'error' })
        }
    }
    const getAllCategory = async () => {
        try {
            const res = await request('get', '/categories/read' )
            if (res) {
                console.log("CATRGORY RESPONSE" , res);
                dispatch({
                    type: GETALL_CATEGORY,
                    payload: res.data
                })
            }
        } catch (error) {
            console.log(error);
            return Toast.fire({ title: 'Try again later!', icon: 'error' })
        }
    }

    const addProduct = async (values) => {
        const id = true
        const userToken = true
        try {
            var formData = new FormData()
            formData.set('name', values.name)
            formData.set('description', values.description)
            formData.set('price', values.price)
            formData.set('category', values.category)
            formData.set('quantity', values.quantity)
            formData.set('photo', values.photo)
            formData.set('shipping', values.shipping)
            formData.set('photo', values.photo)
            const res = await request('post', '/product/create/', formData , id, userToken)
            console.log("PRODUCT RESPONSE", res);
            console.log("formData from authsate" , formData);
            if (res.data) {
                Toast.fire({ title: 'Product created successfully.', icon: 'success' })
                dispatch({
                    type: ADD_PRODUCT,
                    payload: res.data
                })
                navigate('/admin/dashboard')
            } else {
                Toast.fire({ title: 'Failed', icon: 'error' })
            }
        } catch (error) {
            console.log(error)
            return Toast.fire({ title: 'Try again later!', icon: 'error' })
        }
    }

        const getAllProducts = async () => {
            try {
                const res = await request('get', '/products?limit=undefined', {}, false, true)
                if (res.data) {
                    console.log("ALL PRODUCT RESPONSE", res);
                    dispatch({
                        type: GET_PRODUCT,
                        payload: res.data
                    })
                }
            } catch (error) {
                Toast.fire({ icon: 'error',title: 'Something went wrong' })
                console.log(error)
            }
        }

        const deleteProducts = async (id) => {
        try {
            const res = await request('delete', `/product/delete/${id}/`, {}, true, true)
            if (res.data) {
                getAllProducts()
                dispatch({
                    type: DELETE_PRODUCT,
                    payload: res.data
                })
                return Toast.fire({ title: 'Deleted Successfully!', icon: 'success' })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getUserCategory = async(id) => {
        try {
            const res = await request('get', '/categories/read')
            dispatch({
                type: GETALL_CATEGORY,
                payload: res.data
            })
            const response = await request('get', `/product/read/${id}`)
            if (response) {
                dispatch({
                    type: GETUSER_CATEGORY,
                    payload: response.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const editProduct  = async (values , id) => {
        try {
            var formData = new FormData()
            formData.set('name', values.name)
            formData.set('description', values.description)
            formData.set('price', values.price)
            formData.set('category', values.category)
            formData.set('quantity', values.quantity)
            // if (typeof values.photo === 'object') {
            //     formData.set('photo', values.photo)
            // }
            formData.set('shipping', values.shipping)
            // console.log("THIS IS VALUES",values);
            const res = await request('put', `/product/update/${id}/`, formData, true, true )
            if (res) {
                console.log("POIUYTREWQWERTYUIO");
                Toast.fire({ icon: 'success',title: 'Product updated successfully' })
                dispatch({
                    type: GETUSER_CATEGORY,
                    payload: res.data
                })
                navigate('/admin/dashboard')
                // setValues(initialValues)
                // setImages([])
            }
        } catch (error) {
            console.log(error);
            return Toast.fire({ title: 'Try again later!', icon: 'error' })
        }
    }
    const getProductsBySell = async() => {
        try {
            var queryString = '?sortBy=sold&order=desc&limit=10'
            const res = await request('get','/products', {}, false, false, queryString)
            if (res) {
                dispatch({
                    type: GETPRODUCT_BYSELL,
                    payload: res.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getProductsByArrival = async() => {
        try {
            var queryString = '?sortBy=createdAt&order=desc&limit=10'
            const res = await request('get','/products',{}, false, false, queryString)
            if (res) {
                dispatch({
                    type: GETPRODUCT_BYARRIVAL,
                    payload: res.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    const relatedProducts = async  (productId) => {
        try {
            const res = await request('get', `/products/related/${productId}`)
            if (res) {
                dispatch({
                    type: RELATED_PRODUCTS,
                    payload: res.data
                })
            }
        } catch (error) {
            console.log(error);
        }

    }
    const loadProduct = async (productId) => {
        try {
            const res = await request('get', `/product/read/${productId}`)
            if (res) {
                dispatch({
                    type: LOAD_PRODUCT,
                    payload: res.data
                })
            //  relatedProducts(res.data._id)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getBuyerCategory = async() => {
        try {
            const res = await request('get', '/categories/read')
            if (res) {
                dispatch({
                    type: GETALL_CATEGORY,
                    payload : res.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const searchSubmit = async (values) => {
        try {
            const query = values
            // const query = qs.stringify({ search: data.search || undefined, category : data.category })
            const res = await request('get', `/products/search?${query}`)
            // setData({ ...data, results: res.data, searched: true })
             // results: [],
            // searched: false,
            if (res) {
                dispatch({
                    type: SEARCH_SUBMIT,
                    payload : res.data
                })
            }
            console.log(values);
            
        } catch (error) {
            console.log(error);
        }

    }

  const addCartItem = async ( item , id) => {
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
             if (cart) {
                dispatch({
                    type: ADD_ITEM,
                    payload : cart
                })
            }
    }
    const removeProduct = async ( productId) => {
        let cart = []
        let showRemoveCartButton , showAddToCart;
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.map((value, key) => {
                if (value._id === productId) {
                    cart.splice(key, 1)
                }
                Toast.fire({ icon: 'success' , title: 'Cart Removed Successfully'});
                showRemoveCartButton = false
                showAddToCart = true
                localStorage.setItem('cart', JSON.stringify(cart))
            })
            // if(!cart.find(element => element._id === item._id) ){
            //     Toast.fire({ icon: 'success' , title: 'Cart Removed Successfully'});
            //     showRemoveCartButton = false;
            //     cart.pop(item)
            // }
            // else{
            //     Toast.fire({ icon: 'error' , title: 'Cart is Already Added'});
            // }
    
             localStorage.setItem("cart", JSON.stringify(cart));
             if (cart) {
                dispatch({
                    type: REMOVE_PRODUCT,
                    payload : cart
                })
            }
            totalCartFunc()
    }
 const removeCartItem = async (productId) => {
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
        if (cart) {
            dispatch({
                type: REMOVE_ITEM,
                payload : cart
            })
        }
        getCartItem()
        totalCartFunc()
    }

 const getCartItem = async () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
           let cart = JSON.parse(localStorage.getItem('cart'))
        //    updateCartFunc(productId, quantity)
            if (cart) {
                dispatch({
                    type: GET_ITEM,
                    payload : cart
                })
            }
        }
    }
    return []
}
const totalCartFunc = async () => {
    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            let cart = JSON.parse(localStorage.getItem('cart'))
            // let cartLength = cart.length
            console.log("cart.length=>",cart);
            if (cart.length > 0) {
                dispatch({
                    type: TOTAL_ITEM,
                    payload : cart
                })
        }
        if(cart.length  === 0){
            // console.log("cart.length=======>",cart.length);
            dispatch({
                type: TOTAL_ITEM,
                payload :[]
            })
        }
    }

}
}
const updateCartFunc = async (productId, quantity) => {
    let cart = []
    cart = JSON.parse(localStorage.getItem('cart'))
    if(cart){
        for(let value of cart){
            if(value._id === productId){
             value.quantity = quantity;
            }
         }
         localStorage.setItem("cart", JSON.stringify(cart));
         getCartItem()
         dispatch({
            type: UPDATE_ITEM,
            payload : cart
        })
    }

 // Update Quantity 
 }
 const handleAdd = async (id , quantity) => {
    var add = quantity + 1
   setAdd(add)
   updateCartFunc(id , add)
}
const handleRemove = async (id , quantity) => {
   var remove = quantity - 1
   setAdd(remove)
   updateCartFunc(id , remove)
}
    const Udetails = async () => {
        try {
            const res = await request('get', `/orders/by/user/`, {}, true, true)
            if(res.data.length){
                console.log("res", res)
                dispatch({
                    type: DETAILS,
                    payload: res.data,
                })
        //    Toast.fire({ icon: 'success',title: 'Success!!!', position: 'top-end' })
            }else{
            //  Toast.fire({ icon: 'error',title: 'something went wrong!!!', position: 'top-end' })
            }
        } catch (error) {
            console.log(error);
        }
    } 
 return (
     <AuthContext.Provider value={{
         test : "test",
         token : state.token,
         user : state.user,
         orders: state.orders,
         id : state.id,
         name : state.name,
         data : state.data,
         values : state.values,
         categories : state.categories,
         allProducts : state.allProducts,
         getAllEditProducts : state.getAllEditProducts,
         getUserDetails : state.getUserDetails,
         getProductsForSell : state.getProductsForSell, 
         getProductsForArrival : state.getProductsForArrival,
         getRelatedProducts  : state.getRelatedProducts,
         productsLoad : state.productsLoad,
         datas : state.datas,
         buyerCategory : state.buyerCategory,
         submitSearch : state.submitSearch,
         addItem : state.addItem,
         removeItem : state.removeItem,
         getItem : state.getItem,
         totalItem : state.totalItem,
         updateItem : state.updateItem,
         showAddToCart : state.showAddToCart,
         showRemoveCartButton : state.showRemoveCartButton,
         details : state.details,
         register,
         login,
         signout,
         userDashboard,
         profileUpdate,
         addCategory,
         getAllCategory,
         addProduct,
         getAllProducts,
         deleteProducts,
         getUserCategory,
         editProduct,
         getProductsBySell,
         getProductsByArrival,
         relatedProducts,
         loadProduct,
         getBuyerCategory,
         searchSubmit,
         addCartItem,
         removeCartItem,
         getCartItem,
         totalCartFunc,
         updateCartFunc,
         handleAdd,
         handleRemove,
         removeProduct,
         Udetails
     }}>
         {props.children}
     </AuthContext.Provider>
 )
}
export default AuthState;
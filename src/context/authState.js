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
    SEARCH_SUBMIT
} from "./authTypes";

const AuthState = (props) => {
    const navigate = useNavigate()
    const params = useParams()
    const [values, setValues] = useState()
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
        submitSearch : []
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
        //   console.log("RESPONSE",res);
        //   console.log("VALUES",values);
        if (res) {
          localStorage.setItem('token', (res.data.token))
          localStorage.setItem('user' , JSON.stringify(res.data.user))
          Toast.fire({ icon: 'success',title: `Welcome back, ${res.data.user.name}`, position: 'top-end' })
          dispatch({
            type: LOGIN,
            payload: res.data,
        })
        if(res.data.user.role === 0){
          return navigate('/')
        }else{
            return navigate('/user/dashboard')
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
    const profileUpdate = async (user) => {
        try {
            const res = await request('put', '/user/update/', {  email: user.email }, true, true)
            if(res.data.email ){
                dispatch({
                    type: PROFILE_UPDATE,
                    payload: res.data,
                })
                let user = JSON.parse(localStorage.getItem('token'))
                user.user.name = res.data.name
                localStorage.setItem('token', JSON.stringify(user))
                return Toast.fire({ title: 'Profile Updated Successfully!', icon: 'success' })
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
                navigate('/createcategory')
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
                navigate('/user/dashborad')
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
         datas : state.datas,
         buyerCategory : state.buyerCategory,
         submitSearch : state.submitSearch,
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
         searchSubmit
     }}>
         {props.children}
     </AuthContext.Provider>
 )
}
export default AuthState;
import React , { useReducer , useEffect , useState} from "react";
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
    GETUSER_CATEGORY
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
        getUserDetails : null
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
            return navigate('/')
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
             Toast.fire({ icon: 'error',title: 'something went wrong!!!', position: 'top-end' })
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
            if (typeof values.photo === 'object') {
                formData.set('photo', values.photo)
            }
            formData.set('shipping', values.shipping)
            console.log("THIS IS VALUES",values);
            const res = await request('put', `/products/update/${id}/`, {formData}, true, true )
            if (res.length) {
                console.log("Update Product",res);
                dispatch({
                    type: GETUSER_CATEGORY,
                    payload: res.data
                })
                // setValues(initialValues)
                // setImages([])
                return Toast.fire({ title: 'Product updated successfully.', icon: 'success' })
            }
        } catch (error) {
            console.log(error);
            return Toast.fire({ title: 'Try again later!', icon: 'error' })
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
         editProduct
     }}>
         {props.children}
     </AuthContext.Provider>
 )
}
export default AuthState;
import React , { useReducer , useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
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
    GETALL_CATEGORY
} from "./authTypes";

const AuthState = (props) => {
    const navigate = useNavigate()
    const [values, setValues] = useState()
    const { user, token} = isAuthenticated()
    const initialState = {
        token,
        user,
        orders: [],
        id : null,
        name : null,
        values : null,
        category : null
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
            if (res) {
                Toast.fire({ title: 'Category created successfully.', icon: 'success' })
                dispatch({
                    type: ADD_CATEGORY,
                    payload: res.data,
                })
            }
        } catch (error) {
            return Toast.fire({ title: 'Try Again later!', icon: 'error' })
        }
    }
    const getAllCategory = async (user) => {
        // const id = true
        // const userToken = true
        try {
            const res = await request('get', '/categories/read' , {} , true , true )
            if (res) {
                dispatch({
                    type: GETALL_CATEGORY,
                    payload: {
                        data  : res.data ? res.data : []}
                })
            }
        } catch (error) {
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
            const res = await request('post', '/product/create/', formData , id, userToken)
            console.log(res.data);
            if (res.data) {
                Toast.fire({ title: 'Product created successfully.', icon: 'success' })
                dispatch({
                    type: ADD_PRODUCT,
                    payload: res.data
                })
            }
        } catch (error) {
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
         values : state.values,
         register,
         login,
         signout,
         userDashboard,
         profileUpdate,
         addCategory,
         getAllCategory,
         addProduct
     }}>
         {props.children}
     </AuthContext.Provider>
 )
}
export default AuthState;
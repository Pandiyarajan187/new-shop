import React , { useReducer , useEffect , useState} from "react";
import { request } from "../utils/Request";
import AuthContext from "./authContext";
import authReducer from  './authReducer';
import { Toast } from '../Notify'
import 'react-toastify/dist/ReactToastify.css';
import axios from "../api/axios";
import { isAuthenticated } from "../utils/Auth";
import { setNestedObjectValues } from "formik";
import { 
    DASHBOARD_PAGE , 
    PROFILE_UPDATE ,
    ADD_CATEGORY
} from "./authTypes";

const AuthState = (props) => {
    const [values, setValues] = useState()
    const { user, token} = isAuthenticated()
    const initialState = {
        token,
        user,
        orders: [],
        id : null,
    }

    const [state, dispatch] = useReducer(authReducer, initialState)
    //let res = new response(dispatch, DASHBOARD_PAGE)
useEffect(() => {
    // setValues(...user, user.name, user.email )
}, [])

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
    const addCategory = async (user) => {
        const id = true
        const userToken = true
        try {
            const res = await request('post', '/category/create/', { name: user.name }, id, userToken )
            if (res.data.length) {
                dispatch({
                    type: ADD_CATEGORY,
                    payload: res.data,
                })
                return Toast.fire({ title: 'Category created successfully.', icon: 'success' })
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
         userDashboard,
         profileUpdate,
         addCategory
     }}>
         {props.children}
     </AuthContext.Provider>
 )
}
export default AuthState;
import React , { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from  './authReducer';
import { request } from '../utils/Request'
import { DASHBOARD_PAGE } from "./authTypes";
import { Toast } from '../Notify'
import 'react-toastify/dist/ReactToastify.css';
import axios from "../api/axios";

const AuthState = (props) => {
    const initialState = {
        token : localStorage.getItem('token'),
        user : null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)
    //let res = new response(dispatch, DASHBOARD_PAGE)

    const userDashboard = async (data) => {
        try {
            const res = await axios.request('post', '/user/dashboard', data, true, true )
            if(res.data.status === 'yes'){
                dispatch({
                    type: DASHBOARD_PAGE,
                    payload: res.data.user,
                })
           Toast.fire({ icon: 'success',title: 'Success!!!', position: 'top-end' })
            }else{
             Toast.fire({ icon: 'error',title: 'something went wrong!!!', position: 'top-end' })
            }
        } catch (error) {
            console.log(error);
        }
    } 
 return (
     <AuthContext.Provider value={{
         token : state.token,
         user : state.user,
         userDashboard
     }}>
         {props.children}
     </AuthContext.Provider>
 )
}
export default AuthState;
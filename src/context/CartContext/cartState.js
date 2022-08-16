import React , { useReducer , useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { request } from "../utils/Request";
import CartContext from "./CartContext";
import cartReducer from  './cartReducer';
import { Toast } from '../Notify'
import 'react-toastify/dist/ReactToastify.css';
import axios from "../api/axios";
import { isAuthenticated } from "../utils/Auth";
import { TOTAL_ITEM } from "./cartTypes";


const CartState = (props) => {
    const navigate = useNavigate()
    const params = useParams()
    const [values, setValues] = useState()
    const { user, token} = isAuthenticated()
    const initialState = {
        token,
        user,
        totalitem : []
    }

    const [state, dispatch] = useReducer(cartReducer, initialState)
    //let res = new response(dispatch, DASHBOARD_PAGE)

    const totalItem = () => {
        if (typeof window !== 'undefined') {
            // if (localStorage.getItem('cart')) {
            //     return JSON.parse(localStorage.getItem('cart')).length
            // }
            dispatch({
                type: TOTAL_ITEM,
                payload: res.data
            })
        }
        return 0
    }

return (
    <CartContext.Provider value={{
        test : "test",
        token : state.token,
        user : state.user,
        orders: state.orders,

    }}>
        {props.children}
    </CartContext.Provider>
)
}
export default CartState;
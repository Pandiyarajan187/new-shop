import {
     LOGIN,
     LOGOUT,
     DASHBOARD_PAGE, 
     PROFILE_UPDATE,
     ADD_CATEGORY,
     GETALL_CATEGORY,
     ADD_PRODUCT,
     GET_PRODUCT,
     GETUSER_CATEGORY
    } from "./authTypes";

export default (state, action) => {
    switch (action.type) {
        case LOGIN : 
        return {
            token : action.payload.token,
            user : action.payload.user,
        }
        case LOGOUT : 
        return {
            token : action.payload.token,
            user : action.payload.user,
        }
        case DASHBOARD_PAGE : 
        return {
            ...state,
            isAuthenticated : true,
            token : action.payload.token,
            user : action.payload.data,
            orders : action.payload.orders
        }
        case PROFILE_UPDATE : 
        return {
            ...state,
            isAuthenticated : true,
            token : action.payload.token,
            user : action.payload.data,
        }
        case ADD_CATEGORY : 
        return {
            ...state,
            id : action.payload.id,

        }
        case GETALL_CATEGORY : 
        return {
            ...state,
            categories : action.payload
        }
        case ADD_PRODUCT : 
        return {
            ...state,
            data : action.payload.data
        }
        case GET_PRODUCT : 
        return {
            ...state,
            allProducts : action.payload
        }
        case GETUSER_CATEGORY : 
        return {
            ...state,
            getUserDetails : action.payload
        }
        default : 
        return state;
    }
}
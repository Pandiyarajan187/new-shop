import {
     LOGIN,
     LOGOUT,
     DASHBOARD_PAGE, 
     PROFILE_UPDATE,
     ADD_CATEGORY,
     GETALL_CATEGORY,
     ADD_PRODUCT
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
            // ...state,
            isAuthenticated : true,
            token : action.payload.token,
            id : action.payload.id,
            name : action.payload.name

        }
        case GETALL_CATEGORY : 
        return {
            ...state,
            isAuthenticated : true,
        }
        case ADD_PRODUCT : 
        return {
            ...state,
            isAuthenticated : true,
            // token : action.payload.token,
            // id : action.payload.id,
            data : action.payload.data
        }
        default : 
        return state;
    }
}
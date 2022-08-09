import {
     DASHBOARD_PAGE , 
     PROFILE_UPDATE ,
     ADD_CATEGORY
} from "./authTypes";

export default (state, action) => {
    switch (action.type) {
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
            isAuthenticated : true,
            id : action.payload.data,
            token : action.payload.token,
            user : action.payload.data,
        }
        default : 
        return state;
    }
}
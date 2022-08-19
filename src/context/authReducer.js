import {
     LOGIN,
     LOGOUT,
     DASHBOARD_PAGE, 
     PROFILE_UPDATE,
     ADD_CATEGORY,
     GETALL_CATEGORY,
     ADD_PRODUCT,
     GET_PRODUCT,
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
     UPDATE_ITEM
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
        case GETPRODUCT_BYSELL : 
        return {
            ...state,
            getProductsForSell : action.payload
        }
        case GETPRODUCT_BYARRIVAL : 
        return {
            ...state,
            getProductsForArrival : action.payload
        }
        case RELATED_PRODUCTS : 
        return {
            ...state,
            getRelatedProducts : action.payload
        }
        case LOAD_PRODUCT : 
        return {
            ...state,
            productsLoad : action.payload
        }
        case BUYER_CATEGORY : 
        return {
            ...state,
            buyerCategory : action.payload.data
        }
        case SEARCH_SUBMIT : 
        return {
            ...state,
            // results: [],
            // searched: false,
            submitSearch : action.payload
        }
        case ADD_ITEM : 
        return {
            ...state,
            addItem : action.payload
        }
        case REMOVE_ITEM : 
        return {
            ...state,
            removeItem : action.payload
        }
        case GET_ITEM : 
        return {
            ...state,
            getItem : action.payload
        }
        case TOTAL_ITEM : 
        return {
            ...state,
            totalItem : action.payload
        }
        case UPDATE_ITEM : 
        return {
            ...state,
            updateItem : action.payload
        }
        default : 
        return state;
    }
}
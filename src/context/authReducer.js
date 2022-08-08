import { DASHBOARD_PAGE } from "./authTypes";

const authReducer = (state, action) => {
    switch (action.type) {
        case DASHBOARD_PAGE : 
        return {
            ...state,
            isAuthenticated : true,
            user : action.payload.data
        }
        default : 
        return state;
    }
}
export default authReducer
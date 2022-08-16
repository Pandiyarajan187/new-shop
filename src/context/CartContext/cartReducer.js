import { TOTAL_ITEM } from "./cartTypes";

export default (state, action) => {
   switch (action.type) {
       case TOTAL_ITEM : 
       return {
             ...state,
             totalItem : action.payload
       }
       default : 
       return state;
   }
}
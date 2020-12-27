import { CART_ADD, CART_REMOVE } from "../actions/types";

const initialState = {
  bucket:0
};

 const cart =  (state = initialState, action) => {
  
  switch (action.type) {
    case CART_ADD:
      return { 
          ...state, bucket:state.bucket + 1
       };

    case CART_REMOVE:
      return { 
        ...state, bucket:state.bucket - 1
       };

    default:
      return state;
  }
}

export default cart;

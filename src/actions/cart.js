import { CART_ADD, CART_REMOVE } from "./types";

export const addToCart = () => ({
        type: CART_ADD
});
  
export const removeCart = () => ({
        type: CART_REMOVE
});
  
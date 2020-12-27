import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/";

class LabService {
    getAllLabTest() {
      return axios.get(API_URL + "lab/lab-test-list", { headers: authHeader() });
    }
    addTocart(PostData){
      return axios.post(API_URL + "users/cart/add",PostData, { headers: authHeader() }
       );
    }
    getCartItem(){
      return axios.get(API_URL + "users/cart/view", { headers: authHeader() });
    }
    removeCartItem(cartId){
      if(cartId)
        return axios.delete(API_URL + "users/cart/remove/"+cartId, { headers: authHeader() });
        return axios.delete(API_URL + "users/cart/remove/", { headers: authHeader() });
    }
    saveOrder(PostData){
      return axios.post(API_URL + "order/save",PostData, { headers: authHeader() }
      );
    }

}
export default new LabService();

import axios from "axios";

const API_URL = "http://localhost:3000/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "users/authenticate", { username, password })
      .then((response) => {

       // console.log(response.data.token); return false;
        
       if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();

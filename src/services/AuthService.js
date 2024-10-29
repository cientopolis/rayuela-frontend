import axios from "axios";
import RayuelaService from "@/services/RayuelaService";

class AuthService extends RayuelaService{
    token(user) {
        return axios.post(this.baseUrl + "/token/", user)
            .then( (response) => {
                if(response.status===200){
                    localStorage.setItem("msg_login", "1")
                    localStorage.setItem("token", response.data.access)
                    localStorage.setItem("username", user.username)
                }
                return response.data;
            })
    }

    register(user) {
        return axios.post(this.baseUrl + "/register/", user)
    }

    login() {
        return axios.get(this.baseUrl + "/login/", this.getHeaders())
            .then(res => res.data)
    }
}

export default new AuthService(); // Sinleton pattern

import axios from 'axios';
const PRODUCT_BASE_API_URL = 'http://localhost:8080/customers'
class ProductServices {
    getUser() {
        return axios.get(PRODUCT_BASE_API_URL + '/show/users');
    }
    registerUser(user) {
        return axios.post(PRODUCT_BASE_API_URL + "/add/", user);
    }
    getUserById(userId) {
        return axios.get(PRODUCT_BASE_API_URL + "/show/users/" + userId);
    }
    updateUser(user, userId) {
        return axios.put(PRODUCT_BASE_API_URL + "/update/" + userId, user);
    }
    removeUser(userId) {
        return axios.delete(PRODUCT_BASE_API_URL + "/delete/" + userId);
    }
}
export default new ProductServices();


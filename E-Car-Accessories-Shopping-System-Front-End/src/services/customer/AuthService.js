import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/customers';

class AuthServies {
    addUser(user) {
        return axios.post(USER_API_BASE_URL + '/signup/', user);
    }

    editUser(user) {
        return axios.put(USER_API_BASE_URL + '/edit-profile/' + user.id, user);
    }

    editUserPassword(pwd) {
        return axios.put(USER_API_BASE_URL + '/change_pwd/' , pwd);
     
    }

    forgotUserPassword(pwd) {
        return axios.put(USER_API_BASE_URL + '/forgot_pwd', pwd);
    }


    fetchUserByLoginrequest(loginRequest) {
        return axios.post('http://localhost:8080/auth/login', loginRequest);
    }
   

    getUserAddress(user_id) {
        return axios.get(USER_API_BASE_URL + '/address/' + user_id);
    }


    editUserAddress(userId, address) {
        return axios.put(USER_API_BASE_URL + '/address/' + userId, address);
    }

    
}

export default new AuthServies();
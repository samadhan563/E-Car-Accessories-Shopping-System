import axios from 'axios';
const ORDER_BASE_API_URL = 'http://localhost:8080/orders'
class OrderServices {
    getOrders() {
        return axios.get(ORDER_BASE_API_URL + '/show');

    }

    markAsDelivered(id) {
        return axios.put(ORDER_BASE_API_URL + "/delivered/" + id);
    }
    getOrderDetailsById(id) {
        return axios.get(ORDER_BASE_API_URL + '/orderdetailslist/' + id);

    }
    getPaymentDetailsByOrder(id) {
        return axios.get(ORDER_BASE_API_URL + '/orderdpaymentlist/' + id);

    }


}
export default new OrderServices();


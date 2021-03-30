import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ApiCustomerService from "../../services/customer/ApiServices";

class OrderHistoryScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            orders: [],
        }
        this.getOrdersList = this.getOrdersList.bind(this);
        this.orderDetails = this.orderDetails.bind(this);
    }

    componentDidMount() {
        this.getOrdersList();
    }

    getOrdersList() {
        ApiCustomerService.fetchOrdersList(window.localStorage.getItem("user_id"))
            .then((res) => {
                this.setState({ orders: res.data.result })
            });
    }

    orderCancel(orderId) {
        ApiCustomerService.cancelOrders(orderId)
       // window.localStorage.setItem("orderIdForDetails", orderId)
        window.location.reload();
    }

    orderDetails(orderId) {
        window.localStorage.setItem("orderIdForDetails", orderId)
        this.props.history.push('/orderDetailsPage');
    }

    render() {
        var i = 0;
        return (
            <div>
                <Navigation />
                <div className="container">
                    <h2 className="text-center">Orders History</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Orders Amount</th>
                                <th>Order Date</th>
                                <th>Order Status</th>
                                <th>Delivery Date</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.orders.map(
                                order =>
                                    <tr key={order.id}>
                                        <td>{++i}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.orderDate}</td>
                                        <td className="nameColor1"><h5>{order.orderDeliveryStatus}</h5></td>
                                        <td>{order.deliveryDate}</td>
                                        <td>
                                            <button className="btn " style={{ backgroundColor: 'lightcoral' }} onClick={() => this.orderCancel(order.id)}>Cancel</button>
                                            <button className="btn " style={{ marginLeft: '20px', backgroundColor: 'green' }} onClick={() => this.orderDetails(order.id)}>Details</button>

                                        </td>

                                    </tr>
                            )
                            }
                        </tbody>
                    </table>

                </div>
                <Footer />
            </div>
        );
    }
}
export default OrderHistoryScreen
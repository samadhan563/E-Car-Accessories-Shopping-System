import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ApiCustomerService from "../../services/customer/ApiServices";

class OrderDetailsPageScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            orderDetails: [],
        }
        this.getOrdersDetails = this.getOrdersDetails.bind(this);
        this.backToOrderHistory = this.backToOrderHistory.bind(this);
    }

    componentDidMount() {
        this.getOrdersDetails();
    }

    getOrdersDetails() {
        ApiCustomerService.fetchOrdersdetails(window.localStorage.getItem("orderIdForDetails"))
            .then((res) => {
                this.setState({ orderDetails: res.data.result })
            });
    }

    backToOrderHistory() {
        this.props.history.push('/myaccount/orderhistory');
    }

    render() {
        var i = 0;
        return (
            <div>
                <Navigation />
                <div className="container">
                    <h2 className="text-center">Orders Details</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Final Price</th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.state.orderDetails.map(
                                order =>
                                    <tr>
                                        <td>{++i}</td>
                                        <td>{order.productName}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.finalPrice}</td>
                                    </tr>
                            )
                            }
                        </tbody>
                        <br />
                        <button className="btn btn-success" style={{ backgroundColor: 'lightcoral' }} onClick={() => this.backToOrderHistory()}>Back</button>
                    </table>

                </div>
                <Footer />
            </div>
        );
    }
}
export default OrderDetailsPageScreen
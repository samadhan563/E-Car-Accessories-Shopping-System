
import React, { Component } from 'react'
import OrderServices from '../Services/OrderServices'
import Navigation from "../Navbar/index"
class OrderListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],

        }
        //  this.pending = this.pending.bind(this);
        this.delivered = this.delivered.bind(this);
        this.viewDetails = this.viewDetails.bind(this);
        this.paymentStatus=this.paymentStatus.bind(this);
    }

    delivered(id) {
        OrderServices.markAsDelivered(id).then((res) => {
            window.location.reload();
        });
    }
    /*pending(id) {
        this.props.history.push(`/view-product/${id}`);
    }*/
    viewDetails(id) {
        this.props.history.push(`/view-details/${id}`);
    }
    paymentStatus(id) {
        OrderServices.getPaymentDetailsByOrder(id).then((res) => {
            //console.log(this.props.orders);
            let payment= JSON.stringify(res.data );
            console.log("payment  "+id+ payment.paymentStatus)
            return (payment.paymentStatus);
        });
    }
    componentDidMount() {
        OrderServices.getOrders().then((res) => {
            this.setState({ orders: res.data });
            console.log(this.state.orders);
        });
    }
    render() {
        return (
            <div  >
                <Navigation ></Navigation>
                <br />
                <br />
                <br />
                <br />
                <div style={{ marginLeft: "100px", marginRight: "100px" }}>
                    <br />
                    <h3 className="text-center">Orders List</h3>
                    <br />
                    <div className="row" >
                        <table className="table table-striped table-bordered table-light" >
                            <thead className="text-center">
                                <tr className="text-center">
                                    <th> Order Id </th>
                                    <th> Order Date </th>
                                    <th> Delivery Date </th>
                                    <th> Order Status </th>
                                    <th> Total Price </th>
                                   {/* <th> Payment Status </th>*/}
                                    <th> Action</th>
                                </tr>

                            </thead>
                            <tbody>
                                {

                                    this.state.orders.map(
                                        order =>
                                            <tr className="text-center" key={order.id}>
                                                <td>{order.id}</td>
                                                <td>{order.orderDate}</td>
                                                <td>{order.deliveryDate}</td>
                                                <td>{order.orderDeliveryStatus}</td>
                                                <td className="text-center">{order.totalPrice}</td>
                                               {/* <td>{this.paymentStatus(order.id)}</td>*/}
                                                <td >
                                                    <button className="btn btn-info" style={{ backgroundColor: "lightsalmon", marginLeft: "10px" }} onClick={() => this.delivered(order.id)} >Delivered</button>
                                                    <button style={{ backgroundColor: "darkcyan", marginLeft: "10px" }} className="btn btn-info" onClick={() => this.viewDetails(order.id)} >View Details</button>
                                                </td>

                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default OrderListComponent;

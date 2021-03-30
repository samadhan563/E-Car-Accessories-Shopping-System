import React, { Component } from 'react'
import OrderServices from '../Services/OrderServices'
import Navigation from "../Navbar/index"
class ViewOrderDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            orderDetails: [],
        }
        this.back = this.back.bind(this);
    }
    back() {
        this.props.history.push('/order-list')
    }

    componentDidMount() {
        OrderServices.getOrderDetailsById(this.state.id).then((res) => {
            this.setState({ orderDetails: res.data });
        });
    }
    render() {
        let i = 0;
        return (
            <div>
                <Navigation></Navigation>
                <br />
                <br />
                <br />
                <br />
                <div style={{ marginLeft: "50px", marginRight: "50px" }}>
                    <br />
                    <h2 className="text-center">!!!!!! Order Details !!!!!!!</h2>
                    <div >


                        <table className="table table-striped text-center table-light">
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

                        </table>

                    </div> <button className="btn btn-info" onClick={this.back.bind(this)} style={{ marginLeft: "10px" }}>Back</button>
                </div>
            </div>
        )
    }
}
export default ViewOrderDetails;

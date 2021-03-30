/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ApiCustomerService from "../../services/customer/ApiServices";
import ApiService from "../../services/customer/AuthService";

class CartScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cart: [],
            st: false,
            tamt: 0,
            samt: 0,
            pinCode: null,
            sts: 'Cart Is Empty',
        }
        this.getStatus = this.getStatus.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentDidMount() {
        this.getStatus();
        let size = JSON.parse(window.localStorage.getItem("cart_size"))
        if (size !== 0) {
            ApiCustomerService.getCartByUserId(JSON.parse(window.localStorage.getItem("user_id")))
                .then((res) => {
                    this.setState({ cart: res.data.result })
                });

            ApiCustomerService.getTAmtUserId(JSON.parse(window.localStorage.getItem("user_id")))
                .then((res) => {
                    this.setState({ tamt: res.data.result })
                });

            ApiCustomerService.getSAmtByUserId(JSON.parse(window.localStorage.getItem("user_id")))
                .then((res) => {
                    this.setState({ samt: res.data.result })
                });

            ApiService.getUserAddress(window.localStorage.getItem("user_id"))
                .then(res => {
                    let address = res.data.result;
                    address !== null && this.setState({
                        pinCode: address.pinCode,
                    })
                });
        }

    }

    getStatus() {
        this.setState(prevState => ({ st: window.localStorage.getItem("status") == 'true' }))
    }

    back() {
        this.props.history.push('/product-category');
    }
    placeOrder() {
        let size = JSON.parse(window.localStorage.getItem("cart_size"))
        if (size === 0) {
            alert(" !!! Cart Is Empty !!!")
        }
        if (size !== 0) {
            window.localStorage.setItem("add", this.state.pinCode)
            if (this.state.pinCode !== null) {
                !this.state.st && this.props.history.push('/login');

                window.localStorage.setItem("total_price",parseFloat(this.state.tamt).toFixed(2))
                //this.props.history.push('/payment');
                this.state.pinCode !== null &&  this.props.history.push('/stripe');
            }

            if (this.state.pinCode === null) {
                alert(" !!! Enter Valid Address !!!")
            }
        }

    }

    deleteProduct(cartId) {
        ApiCustomerService.deleteCartByUserId(cartId)
            .then((res) => {
                window.location.reload();
                JSON.stringify(window.localStorage.setItem("cart_size", JSON.parse(window.localStorage.getItem("cart_size")) - 1));
            });

    }

    render() {
        let i = 0;
        return (
            <div>
                <Navigation />
                <div className="container">
                    <br />
                    <h3 className="text-center">Cart Details</h3>
                    {this.state.cart.length == 0 &&
                        <div className="container"><h5 className="nameColor1">{JSON.parse(window.localStorage.getItem("cart_size")) == 0 && this.state.sts}</h5></div>
                    }
                    {this.state.cart.length > 0 &&
                        <table className="table table-striped">
                            <thead>
                                <th className="hidden">Sr. No.</th>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Final Price</th>
                                <th>QTY</th>
                                <th>Delete</th>
                            </thead>
                            <tbody >

                                {this.state.cart.map(product =>
                                    <tr key={product.id} className="text-center">
                                        <td>{++i}</td>
                                        <td ><img style={{ marginLeft: "60px" }} src={'/images/' + product.productName + '.jpg'} className="d-block w-20 " alt="image" height="70px" width="100px" /></td>
                                        <td>{product.productName}</td>
                                        <td>{product.productPrice}</td>
                                        <td>{product.finalPrice}</td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            <button className="btn btn-danger" style={{ backgroundColor: "red" }} onClick={() => this.deleteProduct(product.id)}>Remove</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    }
                    <button className="btn float-start " style={{ backgroundColor: "lightslategrey", margin: "left" }} onClick={() => this.back()}> Add More</button>
                    <div className="float-end">
                        <h5>Total Price : {parseFloat(this.state.tamt).toFixed(2)}</h5>
                        <h5>Savings Amount : {parseFloat(this.state.samt).toFixed(2)}</h5>
                        <button className="btn btn-primary" onClick={() => this.placeOrder()}>Place Order</button>
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <br />
                </div>
                <Footer />
            </div>
        );
    }
}
export default CartScreen









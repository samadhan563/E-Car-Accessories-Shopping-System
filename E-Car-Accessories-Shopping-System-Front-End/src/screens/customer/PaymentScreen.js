/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import ApiCustomerService from "../../services/customer/ApiServices";
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer';

import StripeButton from "../../components/StripeDemo";
class PaymentScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            paymentInfo: '',
            message: ''
        }
        this.payment = this.payment.bind(this);
        this.addOrder = this.addOrder.bind(this);
        this.addOrderDetail = this.addOrderDetail.bind(this);
        this.paymentDetails = this.paymentDetails.bind(this);
        this.selectCredit = this.selectCredit.bind(this);
        this.selectDebit = this.selectDebit.bind(this);
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    addOrder() {
        ApiCustomerService.addorders(window.localStorage.getItem("total_price"), window.localStorage.getItem("user_id"))
            .then(res => {
                res.data.result === null && this.props.history.push("/home")
                JSON.stringify(window.localStorage.setItem("orderId", res.data.result))
                this.addOrderDetail();
            });

    }

    addOrderDetail() {
        ApiCustomerService.addDetails(window.localStorage.getItem("user_id"), JSON.parse(window.localStorage.getItem("orderId")))
            .then(res => {
                this.paymentDetails();
            });

    }

    paymentDetails() {
        this.state.payment = {
            paymentType: this.state.paymentInfo,
            userId: JSON.parse(window.localStorage.getItem("user_id")),
            orderId: JSON.parse(window.localStorage.getItem("orderId"))
        };
        ApiCustomerService.addpaymentDetails(this.state.payment);
    }

    payment() {
        this.addOrder();
        this.state.paymentInfo !== "COD" && alert('Payment Done.....')
        this.state.paymentInfo === "COD" && alert('Please pay payment on delivery.....')
        window.localStorage.removeItem("cart_size");
        window.localStorage.removeItem("orderId");
        this.props.history.push('/home');
    }

    selectCredit() {
        this.state.paymentInfo = "CREDIT";
    }

    selectDebit() {
        this.state.paymentInfo = "DEBIT";
    }
    selectCod() {
        this.state.paymentInfo = "COD";
    }

    render() {
        return (
            <div >
                <Navigation />
                <div className="payment">
                    <div className="float-center">
                        <h5>Total Price : {window.localStorage.getItem("total_price")}</h5>
                        <br />
                        <div className="position1"  >
                            <div className="dropdown" >
                                <a className="btn btn-light dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    Payment Type
                             </a>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <li ><a style={{ color: "white" }} className="dropdown-item" onClick={() => { this.selectCredit() }}>CREDIT</a></li>
                                    <li ><a style={{ color: "white" }} className="dropdown-item" onClick={() => { this.selectDebit() }}>DEBIT</a></li>
                                    <li ><a style={{ color: "white" }} className="dropdown-item" onClick={() => { this.selectCod() }}>Cash On Delivery</a></li>
                                </ul>
                            </div>
                        </div>
                        <br />

                        <button className="btn btn-primary" style={{ width: '150px', backgroundColor: "green" }} onClick={() => this.payment()}>Pay Now</button>
                    </div>
                    
                </div>
                <Footer/>
            </div>

        );
    }
}

export default PaymentScreen
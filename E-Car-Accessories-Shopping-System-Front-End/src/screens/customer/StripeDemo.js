import React, { Component } from 'react'
import ApiCustomerService from "../../services/customer/ApiServices"
import StripeCheckout from "react-stripe-checkout";
import logo from "../../components/logo.jpg"
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer"
//import Payment from "../screens/customer/PaymentScreen"

class StripeDemo extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
        this.handleToken = this.handleToken.bind(this);
        this.payment = this.payment.bind(this);
        this.addOrder = this.addOrder.bind(this);
        this.addOrderDetail = this.addOrderDetail.bind(this);
        this.paymentDetails = this.paymentDetails.bind(this);

    }
    addOrder(token) {
        ApiCustomerService.addorders(window.localStorage.getItem("total_price"), window.localStorage.getItem("user_id"))
            .then(res => {
                res.data.result === null && this.props.history.push("/home")
                JSON.stringify(window.localStorage.setItem("orderId", res.data.result))
                this.addOrderDetail(token);
            });

    }

    addOrderDetail(token) {
        ApiCustomerService.addDetails(window.localStorage.getItem("user_id"), JSON.parse(window.localStorage.getItem("orderId")))
            .then(res => {
                this.paymentDetails(token);
            });
    }

    paymentDetails(token) {
        if (token === null) {
            let payment = {
                paymentType: "COD",
                userId: JSON.parse(window.localStorage.getItem("user_id")),
                orderId: JSON.parse(window.localStorage.getItem("orderId"))
            };
            ApiCustomerService.addpaymentDetails(payment).then(res => {
                res.data.result !== null && alert("Please pay on delivery........Thank you !!!");
            });
        }
        else {
            let amount = (window.localStorage.getItem("total_price"));
            let payment = ({
                stripeEmail: token.email, stripeToken: token.id, amount: amount,
                userId: JSON.parse(window.localStorage.getItem("user_id")),
                orderId: JSON.parse(window.localStorage.getItem("orderId"))
            })
            console.log(payment);
            ApiCustomerService.addStripeDetails(payment).then(res => {
                res.data.result !== null && alert("Payment done successfully........Thank you !!!")
                res.data.result === null && alert("Payment process failed........Sorry  !!!")
            });
        }
    }
    payment() {
        this.addOrder(null);
        window.localStorage.removeItem("cart_size");
        window.localStorage.removeItem("orderId");
        this.props.history.push('/home');
    }

    back() {
        this.props.history.push('/cart');
    }

    handleToken(token) {
        this.addOrder(token);
        window.localStorage.removeItem("cart_size");
        window.localStorage.removeItem("orderId");
        console.log(token)
        this.props.history.push('/home');

    }
    render() {
        return (

            <div>
                <Navigation />

                <div className="container">
                    <h2 className="text-center">Payment Option</h2>
                    <br />
                    <StripeCheckout 
                        amount={window.localStorage.getItem("total_price") * 100}
                        name="E-CASS"
                        image={logo}
                        panelLabel="Pay Now "
                        currency="INR"
                        stripeKey="pk_test_51IY0XeSHIBmpaOchlLj8aNBFtO49OjI3NqtKiRFXPAlpohH5f5tEZQgc2rmGxDpAdlIk3svp3USfostJd1V5n8YX00HpqnCWXf"
                        token={this.handleToken}
                    >
                        <button className="btn " style={{ backgroundColor: "lightseagreen", width: "200px" }} >
                            Pay With Card
                        </button>
                    </StripeCheckout>
                    <br />
                    <br />
                    <button className="btn " style={{ backgroundColor: "lightslategray", width: "200px" }} onClick={() => this.payment()} >
                        Cash On Delivery
                    </button>

                </div>
                <br />
                <button className="btn float-start " style={{ backgroundColor: "lightsalmon", marginLeft: "200px" }} onClick={() => this.back()}> Back to cart</button>

                <br />
                <br />
                <br />

                <Footer style={{ position: "fixed" }} />
            </div>
        )
    }
}
export default StripeDemo
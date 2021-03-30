import { Link } from 'react-router-dom'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import React, { Component } from 'react'
import ApiCustomerService from "../../services/customer/ApiServices";

class ProductDetailsScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      product: [],
      message: ""
    }
    this.addProductToCart = this.addProductToCart.bind(this);
  }

  componentDidMount() {
    ApiCustomerService.fetchProductsById(window.localStorage.getItem("product_id"))
      .then((res) => {
        this.setState({ product: res.data.result })
      });
  }

  addProductToCart() {
    let productCartId = {
      userId: JSON.parse(window.localStorage.getItem("user_id")),
      productId: this.state.product.id
    };
    ApiCustomerService.addProductToCart(productCartId)
      .then((res) => {
        this.setState({ message: res.data.result })
      });
    alert("!!! Items Added to Cart !!!");
    JSON.stringify(window.localStorage.setItem("cart_size", JSON.parse(window.localStorage.getItem("cart_size")) + 1));
    this.props.history.push('/product-category');
  }

  render() {
    return (
      <div>

        <Navigation />
        <br />

        <div className="container">
 
          <div className="main" style={{ backgroundColor: "lightgoldenrodyellow" }}>
            <h4> {window.localStorage.getItem("category_name")} part  </h4>
            <h4>Product Name :  {this.state.product.productName}</h4>
            <img src={'/images/' + this.state.product.productName + '.jpg'} className="d-block w-100 " alt="image" height="250px" width="100px" />
            <h5 className="nameColor">Product Name : {this.state.product !== null && this.state.product.productName}</h5>
            <h5 className="nameColor">Product Model : {this.state.product !== null && this.state.product.productModel}</h5>
            <h5 className="nameColor">Manufacture : {this.state.product !== null && this.state.product.manufacture}</h5>
            <h5 className="nameColor">
              Product Price : <strike>{this.state.product !== null && this.state.product.productPrice}</strike>
            </h5>
            <h5 className="nameColor1">Discount Offer : {this.state.product !== null && this.state.product.discountOffer}% off</h5>
            <h5 className="nameColor">Final Price : {this.state.product !== null && this.state.product.finalPrice}</h5>
            <h5 className="nameColor">
              Description : {this.state.product !== null && this.state.product.description}
            </h5>
            <button
              onClick={() => {
                this.addProductToCart()
              }}
              className="btn btn-sm btn-success btn-add-to-cart" style={{ backgroundColor: "forestgreen" }}>
              Add To Cart
                    </button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

}
export default ProductDetailsScreen;

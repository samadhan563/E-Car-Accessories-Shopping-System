/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
//import { Link } from 'react-router-dom'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import React, { Component } from 'react'
import ApiCustomerService from "../../services/customer/ApiServices";
class ProductCategoryScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message: "",
      products: [],
    }
    this.productDetails = this.productDetails.bind(this);
    this.reloadProductsList = this.reloadProductsList.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
    this.selectProductsByLowtoHigh = this.selectProductsByLowtoHigh.bind(this);
    this.selectProductsByHightoLow = this.selectProductsByHightoLow.bind(this);
  }

  componentDidMount() {
    this.reloadProductsList();
  }

  reloadProductsList() {
    ApiCustomerService.fetchProductsByCategoryId(window.localStorage.getItem("category_id"))
      .then((res) => {
        window.localStorage.setItem("msg", res.data.message)
        this.setState({ products: res.data.result })
      });
  }

  addProductToCart(product) {

    let productCartId = {
      userId: JSON.parse(window.localStorage.getItem("user_id")),
      productId: product.id
    };
    if ((!window.localStorage.getItem("status")) && productCartId.userId === 9999) { this.props.history.push('/login'); }
    else {
      ApiCustomerService.addProductToCart(productCartId)
        .then((res) => {
          this.setState({ message: res.data.result })
        });
      alert("!!! Items Added to Cart !!!");
      JSON.stringify(window.localStorage.setItem("cart_size", JSON.parse(window.localStorage.getItem("cart_size")) + 1));
      this.props.history.push('/product-category');
    }
  }

  productDetails(product) {
    window.localStorage.setItem("product_id", product.id);
    this.props.history.push('/product-details');
  }

  selectProductsByLowtoHigh() {
    ApiCustomerService.sortProductsByLowToHigh(window.localStorage.getItem("category_id"))
      .then((res) => {
        this.setState({ products: res.data.result })
        console.log(this.state.products);
      });
  }

  selectProductsByHightoLow() {
    ApiCustomerService.sortProductsByHighToLow(window.localStorage.getItem("category_id"))
      .then((res) => {
        this.setState({ products: res.data.result })
        console.log(this.state.products);
      });
  }

  render() {
    return (
      <div>
        <Navigation />
        <div className="container">
          <div className="container">
            <h4>This All The {window.localStorage.getItem("category_name")} Parts</h4>
            <div className="position " >
              <div className="dropdown">
                <a className="btn btn-light dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                  Sort
                         </a>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li><a className="dropdown-item" onClick={() => { this.selectProductsByLowtoHigh() }}>Sort By Price : Low to High</a></li>
                  <li><a className="dropdown-item" onClick={() => { this.selectProductsByHightoLow() }}>Sort By Price : High to Low</a></li>
                </ul>
              </div>
            </div>
            <br />
            <hr />
            <br />


            <div className="container ">
              <div className="row row-center ">
                {this.state.products.map(product =>
                  <div className="product col-md-3" key={product.id} style={{ backgroundColor: "lightgoldenrodyellow", width: "297px" }}>
                    <div className="title">
                      <img src={'/images/' + product.productName + '.jpg'} className="d-block w-100 " alt="image" height="150px" width="90px" />
                      <a className="nav-link" onClick={() => { this.productDetails(product) }}><h5 className="nameColor">{product.productName}</h5></a>

                      <h5 className="nameColor">{product.productModel}</h5>
                      <h5 className="nameColor">{product.manufacture}</h5>
                      <h5 className="nameColor"> <strike>{product.productPrice} Rs.</strike></h5>
                      <h5 className="nameColor1">{product.discountOffer}% off</h5>
                      <h5 className="nameColor">{product.finalPrice} Rs.</h5>
                      <h5 className="nameColor">{1} nos</h5>
                    </div>
                    <button
                      onClick={() => {
                        this.addProductToCart(product)
                      }}
                      className="btn btn-sm btn-success btn-add-to-cart">
                      Add To Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

}
export default ProductCategoryScreen


/*














<div className="container">
              <div className="row">

                {this.state.products.map((product) => (
                  <div className="product col-md-3" key={product.id}>
                            <div className="title">
                                <img src={'/images/'+product.productName+'.jpg'} className="d-block w-100 " alt="image" height="150px" width="50px" />
                                <a className="nav-link" onClick={() => { this.productDetails(product) }}><h5 className="nameColor">{product.productName}</h5></a>
                      <h5 className="nameColor">{product.productModel}</h5>
                      <h5 className="nameColor">{product.manufacture}</h5>
                      <h5 className="nameColor"> <strike>{product.productPrice} Rs.</strike></h5>
                      <h5 className="nameColor1">{product.discountOffer}% off</h5>
                      <h5 className="nameColor">{(product.productPrice - ((product.productPrice * product.discountOffer) / 100))} Rs.</h5>
                      <h5 className="nameColor">{1} nos</h5>
                    </div>
                    <button
                            onClick={() => {
                            this.addProductToCart(product)
                            }}
                            className="btn btn-sm btn-success btn-add-to-cart">
                            Add To Cart
                        </button>
                  </div>
                ))}
                */
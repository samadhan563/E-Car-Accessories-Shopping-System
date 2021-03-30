import React, { Component } from 'react';
import CategoryServices from '../Services/CategoryServices';
import ProductServices from "../Services/ProductServices"
import ImageUploader from 'react-images-upload';
//import { Form, Modal, Button, Header, Dropdown } from "semantic-ui-react";
import Navigation from "../Navbar/index"

class AddUpdateProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //step 2
            id: this.props.match.params.id,
            productName: '',
            productModel: '',
            manufacture: '',
            productPrice: '',
            quantity: '',
            finalPrice: '',
            description: '',
            discountOffer: ''

        }
        this.changeProductNameHandler = this.changeProductNameHandler.bind(this);
        this.changeProductModelHandler = this.changeProductModelHandler.bind(this);
        this.changeManufactureHandler = this.changeManufactureHandler.bind(this);
        this.changeProductPriceHandler = this.changeProductPriceHandler.bind(this);
        this.changeQuantityHandler = this.changeQuantityHandler.bind(this);
        this.changeFinalPriceHandler = this.changeFinalPriceHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeDiscountOfferHandler = this.changeDiscountOfferHandler.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.cancel = this.cancel.bind(this);
        this.getTitle = this.getTitle.bind(this);

    }
    componentDidMount() {

        ProductServices.getProductById(this.state.id).then((res) => {
            let product = res.data;
            console.log(product)
            this.setState({
                productName: product.productName,
                productModel: product.productModel,
                manufacture: product.manufacture,
                productPrice: product.productPrice,
                quantity: product.quantity,
                finalPrice: product.finalPrice,
                description: product.description,
                discountOffer: product.discountOffer
            });
        });
    }


    saveProduct = (e) => {
        e.preventDefault()

        let product = {
            productName: this.state.productName, productModel: this.state.productModel, manufacture: this.state.manufacture,
            productPrice: this.state.productPrice, quantity: this.state.quantity, finalPrice: this.state.finalPrice, description: this.state.description,
            discountOffer: this.state.discountOffer
        }
        console.log('product => ' + JSON.stringify(product))

        ProductServices.updateProduct(product, this.state.id).then(res => {
            this.props.history.push(`/products/${this.state.id}`);
        });


    }
    cancel() {
        this.props.history.push(`/products/-1`)
    }

    getTitle() {
        return <h3 className="text-center">Update Product</h3>
    }
    changeProductNameHandler = (event) => {
        this.setState({ productName: event.target.value });
    }
    changeProductModelHandler = (event) => {
        this.setState({ productModel: event.target.value });
    }
    changeManufactureHandler = (event) => {
        this.setState({ manufacture: event.target.value });
    }
    changeProductPriceHandler = (event) => {
        this.setState({ productPrice: event.target.value });
        this.changeFinalPriceHandler(this.state.discountOffer, event.target.value)
    }
    changeQuantityHandler = (event) => {
        this.setState({ quantity: event.target.value });
    }
    changeFinalPriceHandler = (discount, price) => {
       let tempPrice= parseFloat((price - ((price * discount) / 100))).toFixed(2)
        this.setState({ finalPrice: tempPrice });
    }
    changeDescriptionHandler = (event) => {
        this.setState({ description: event.target.value });
    }
    changeDiscountOfferHandler = (event) => {
        this.setState({ discountOffer: event.target.value });
        this.changeFinalPriceHandler(event.target.value, this.state.productPrice)
    }

    render() {
        return (
            <div>
                <Navigation />
                <div className="container">
                    <div className="row">
                    <br/>
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="row mb-3">
                                        <label className="col-sm-4 col-form-label">Product Name :</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" name="lastName" value={this.state.productName} onChange={this.changeProductNameHandler} />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                    <label className="col-sm-4 col-form-label"> Product Model</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" name="productModel" value={this.state.productModel} onChange={this.changeProductModelHandler} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-4 col-form-label">Manufacture </label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" name="manufacture"  value={this.state.manufacture} onChange={this.changeManufactureHandler} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-4 col-form-label">Quantity </label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" name="quantity" value={this.state.quantity} onChange={this.changeQuantityHandler} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-4 col-form-label">Product Price</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" name="productPrice" value={this.state.productPrice} onChange={this.changeProductPriceHandler} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-4 col-form-label">Discount</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" name="discountOffer" value={this.state.discountOffer} onChange={this.changeDiscountOfferHandler} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-4 col-form-label">Product Final Price</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" name="finalPrice" value={this.state.finalPrice} readOnly />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-4 col-form-label">Product Description</label>
                                    <div className="col-sm-8">
                                        <textarea type="text" className="form-control" name="description" value={this.state.description} onChange={this.changeDescriptionHandler} />
                                    </div>
                                </div>
                                    <button className="btn btn-success" onClick={this.saveProduct} >Save</button>
                                    <button className="btn btn-dager" style={{ marginLeft: "30px",backgroundColor: 'lightcoral'  }} onClick={this.cancel.bind(this)} >Cancel</button>

                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default AddUpdateProduct;
import React, { Component } from 'react';
import CategoryServices from '../Services/CategoryServices';
import ProductServices from "../Services/ProductServices"
//import ImageUploader from 'react-images-upload';
//import { Form, Modal, Button, Header, Dropdown } from "semantic-ui-react";
import Navigation from "../Navbar/index"

class AddProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //step 2
            id: this.props.match.params.id,
            categoryName: '',
            productName: '',
            productModel: '',
            manufacture: '',
            productPrice: '',
            quantity: '',
            finalPrice: '',
            description: '',
            discountOffer: '',
            category: null,

        }
        this.changeProductNameHandler = this.changeProductNameHandler.bind(this);
        this.changeProductModelHandler = this.changeProductModelHandler.bind(this);
        this.changeManufactureHandler = this.changeManufactureHandler.bind(this);
        this.changeProductPriceHandler = this.changeProductPriceHandler.bind(this);
        this.changeQuantityHandler = this.changeQuantityHandler.bind(this);
        this.changeFinalPriceHandler = this.changeFinalPriceHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeDiscountOfferHandler = this.changeDiscountOfferHandler.bind(this);
        this.changeCategoryNameHandler = this.changeCategoryNameHandler.bind(this);
        this.changeImageUrlHandler = this.changeImageUrlHandler.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.cancel = this.cancel.bind(this);
        this.getTitle = this.getTitle.bind(this);
        this.changeFileUpload = this.changeFileUpload.bind(this);
    }


    saveProduct = (e) => {
        e.preventDefault()
        this.changeFileUpload();
        let product = {
            productName: this.state.productName, productModel: this.state.productModel, manufacture: this.state.manufacture,
            productPrice: this.state.productPrice, quantity: this.state.quantity, finalPrice: this.state.finalPrice, description: this.state.description,
            discountOffer: this.state.discountOffer
        }
        console.log('product => ' + JSON.stringify(product))
        ProductServices.createProductByCategory(product, this.state.categoryName).then(res => {
            this.props.history.push(`/products/${this.state.id}`);
        });
    }
    cancel() {
        this.props.history.push('/products-under-category')
    }
    componentDidMount() {
        CategoryServices.getCategory().then((res) => {
            this.setState({ category: res.data });
            console.log(res.data)
        });
        this.state.id !== null && CategoryServices.getCategoryById(this.state.id).then((res) => {
            let category = res.data;
            this.setState({ categoryName: category.categoryName });
            console.log(category)
        });

    }
    getTitle() {
        return <h3 className="text-center">Add Product</h3>
    }
    changeCategoryNameHandler = (event) => {
        this.setState({ categoryName: event.target.value });
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
        let tempPrice = parseFloat((price - ((price * discount) / 100))).toFixed(2)
        this.setState({ finalPrice: tempPrice });
    }
    changeDescriptionHandler = (event) => {
        this.setState({ description: event.target.value });
    }
    changeDiscountOfferHandler = (event) => {
        this.setState({ discountOffer: event.target.value });
        this.changeFinalPriceHandler(event.target.value, this.state.productPrice)
    }

    changeFileUpload() {
        const formData = new FormData()
        formData.append(
            "file",
            this.state.productImage,
            this.state.productImage.name
        );
        console.log(JSON.stringify(formData));
        console.log(JSON.stringify(formData) + URL.createObjectURL(this.state.productImage));

        //let imageData={productName:this.state.productName, productImage:this.state.productImage}
        ProductServices.addProductFile(this.state.productName, formData).then(res => {
            this.props.history.push(`/all-category`);
        });
    }


    changeImageUrlHandler = (event) => {
        this.setState({ productImage: event.target.files[0] })
    }
    render() {
        return (
            <div>
                <Navigation />
                <br />
                <br />
                <br />
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="row mb-3">
                                        <label className="col-sm-4 col-form-label">Select Category Name :</label>
                                        <div className="col-sm-8">
                                            <select type="text" categoryName="form-control" placeholder="Select Category" name="categoryName" value={this.state.categoryName} onChange={this.changeCategoryNameHandler}>
                                                {this.state.category !== null && this.state.category.map(category =>
                                                    <option>{category.categoryName}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-sm-4 col-form-label">Product Name :</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" name="productName" value={this.state.productName} onChange={this.changeProductNameHandler} />
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
                                            <input type="text" className="form-control" name="manufacture" value={this.state.manufacture} onChange={this.changeManufactureHandler} />
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
                                    <div className="row mb-3">
                                        <label className="col-sm-4 col-form-label">Choose images :</label>
                                        <div className="col-sm-8">
                                            <input type="file" onChange={this.changeImageUrlHandler} />
                                        </div>
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveProduct} >Save</button>
                                    <button className="btn btn-dager" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>

                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default AddProductComponent;
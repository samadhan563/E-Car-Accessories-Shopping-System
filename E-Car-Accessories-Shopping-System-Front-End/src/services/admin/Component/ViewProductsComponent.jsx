import React, { Component } from 'react'
import ProductServices from '../Services/ProductServices'
import Navigation from "../Navbar/index"
class ListProductsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            products: {},
        }
        this.back = this.back.bind(this);
    }
    back() {
        this.props.history.push('/products/-1')
    }

    componentDidMount() {
        ProductServices.getProductById(this.state.id).then((res) => {
            this.setState({ products: res.data });
        });
    }
    render() {
        return (
            <div>
                <Navigation></Navigation>
                <br />
                <br />
                <br />
                <br />
                <div className="card col-md-6 offset-md-3 table-light" style={{borderRadius:"25px"}}>
                <br/>
                    <h2 className="text-center">Products Info</h2>
                    <div className="cart-body">
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Product Name</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="lastName" value={this.state.products.productName} readOnly />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label"> Product Model</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="lastName" value={this.state.products.productModel} readOnly />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Manufacture </label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="lastName" value={this.state.products.manufacture} readOnly />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Quantity </label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="lastName" value={this.state.products.quantity} readOnly />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Product Price</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="lastName" value={this.state.products.productPrice} readOnly />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Discount</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="lastName" value={this.state.products.discountOffer} readOnly />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Product Final Price</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="lastName" value={this.state.products.finalPrice} readOnly />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Product Description</label>
                            <div className="col-sm-8">
                                <textarea type="text" className="form-control" name="lastName" value={this.state.products.description} readOnly />
                            </div>
                        </div>
                    </div> <button className="btn btn-info" onClick={this.back.bind(this)} style={{ marginLeft: "10px",width:"100px",backgroundColor: 'lightcoral'  }}>Back</button>
                </div>
            </div>
        )
    }
}
export default ListProductsComponent;

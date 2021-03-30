import React, { Component } from 'react'
import ProductServices from '../Services/ProductServices'
import Navigation from "../Navbar/index"
class ListProductsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],

        }
        //this.addProduct = this.addProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.viewProduct = this.viewProduct.bind(this);
        this.getCategory = this.getCategory.bind(this);

    }
    getCategory(products) {
    }
    deleteProduct(id) {
        ProductServices.deleteProduct(id).then((res) => {
            this.setState({ products: this.state.products.filter(products => products.id !== id) });
            window.location.reload();
        });
    }
    viewProduct(id) {
        this.props.history.push(`/view-product/${id}`);
    }
    editProduct(id) {
        this.props.history.push(`/add-update-product/${id}`);
    }
    componentDidMount() {
        ProductServices.getProduct().then((res) => {
            this.setState({ products: res.data });
            console.log(this.props.products);
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
                <div style={{ marginLeft: "40px", marginRight: "40px" }}>
                    <br />
                    <h2 className="text-center">Products List</h2>

                    <div className="row" >
                        <table className="table table-striped text-center table-light table-bordered" >
                            <thead className="text-center ">
                                <tr>
                                    <th> Product Name </th>
                                    <th> Product Model </th>
                                    <th> Product Manufacture </th>
                                    <th> Product Quantity </th>
                                    <th> Product Price </th>
                                    <th> Product Description </th>
                                    <th> Discount Offer </th>
                                    <th>Action</th>
                                </tr>

                            </thead>
                            <tbody>
                                {

                                    this.state.products.map(
                                        products =>
                                            <tr key={products.id}>
                                                <td>{products.productName}</td>
                                                <td>{products.productModel}</td>
                                                <td>{products.manufacture}</td>
                                                <td>{products.quantity}</td>
                                                <td>{products.productPrice}</td>
                                                <td>{products.description}</td>
                                                <td>{products.discountOffer}</td>

                                                <td>
                                                    <button className="btn btn-info" onClick={() => this.editProduct(products.id)} >Update</button>
                                                    <button style={{ backgroundColor: "darkcyan", marginLeft: "10px" }} className="btn btn-info" onClick={() => this.viewProduct(products.id)} >View</button>
                                                    <button style={{ marginLeft: "10px", backgroundColor: "red" }} className="btn btn-danger" onClick={() => this.deleteProduct(products.id)} >Delete</button>
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
export default ListProductsComponent;

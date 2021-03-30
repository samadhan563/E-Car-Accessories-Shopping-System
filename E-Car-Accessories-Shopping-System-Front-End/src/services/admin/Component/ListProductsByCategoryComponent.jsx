import React, { Component } from 'react'
import ProductServices from '../Services/ProductServices'
//import car from './images/Engine/Engine9.jpg'
import car from '../../admin/logo.svg'
import Navigation from "../Navbar/index"
class ListProductsByCategoryComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            products: [],
            catId: ''

        }
        this.addNewProduct = this.addNewProduct.bind(this);
        this.editOldProduct = this.editOldProduct.bind(this);
        this.deleteOldProduct = this.deleteOldProduct.bind(this);
        this.viewOldProduct = this.viewOldProduct.bind(this);

    }

    deleteOldProduct(id) {
        ProductServices.deleteProduct(id).then((res) => {
            this.setState({ products: this.state.products.filter(products => products.id !== id) });
            window.location.reload();
        });
    }
    viewOldProduct(id) {
        this.props.history.push(`/view-product/${id}`);
    }
    editOldProduct(id) {
        this.props.history.push(`/add-update-product/${id}`);
    }
    addNewProduct(id) {
        // let catId=window.localStorage.getItem("cat_id");
        this.props.history.push(`/add-product-in-category/${id}`);
    }
    componentDidMount() {
        // window.localStorage.getItem("cat_id");

        //this.setState({ id: (window.localStorage.getItem("cat_id")) });

        ProductServices.fetchProductsByCategoryId(this.state.id).then((res) => {
            this.setState({ products: res.data });
        });
    }
    render() {
        let i = 0;
        return (

            <div >
                <Navigation ></Navigation>
                <br />
                <br />
                <br />
                <br />
                <div style={{ marginLeft: "40px", marginRight: "40px" }}>
                    <br />
                    <h2 className="text-center">Products List</h2>
                    <div className="row ">
                        <h2><button className="btn btn-primary" onClick={() => this.addNewProduct(this.state.id)} >Add Product</button></h2>
                    </div>
                    <div className="row" >
                        <table className="table table-striped  table-light table-bordered" >
                            <thead className="text-center" >
                                <tr>
                                    <th> Sr. No </th>
                                    <th> Product Category </th>
                                    <th> Product Name </th>
                                    <th> Product Model </th>
                                    <th> Product Manufacture </th>
                                    <th> Product Quantity </th>
                                    <th> Product Price </th>
                                    <th> Product Description </th>
                                    <th> Discount Offer </th>
                                    <th className="md-6">Action</th>
                                </tr>

                            </thead>
                            <tbody>
                                {

                                    this.state.products.map(
                                        products =>
                                            <tr key={products.id}>
                                                <td>{++i}</td>
                                                <td>{window.localStorage.getItem("cat_name")}</td>
                                                <td>{products.productName}</td>
                                                <td>{products.productModel}</td>
                                                <td>{products.manufacture}</td>
                                                <td>{products.quantity}</td>
                                                <td>{products.productPrice}</td>
                                                <td>{products.description}</td>
                                                <td>{products.discountOffer}</td>

                                                <td>
                                                    <button className="btn btn-info" onClick={() => this.editOldProduct(products.id)} >Update</button>
                                                    <button style={{ backgroundColor: "darkcyan", marginLeft: "10px" }} className="btn btn-info" onClick={() => this.viewOldProduct(products.id)} >View</button>
                                                    <button style={{ marginLeft: "10px", backgroundColor: "red" }} className="btn btn-danger" onClick={() => this.deleteOldProduct(products.id)} >Delete</button>
                                                </td>

                                            </tr>
                                    )
                                }
                            </tbody>
                            <br />
                            <button style={{ marginLeft: "10px", backgroundColor: "skyblue" }}
                                className="btn btn-danger" onClick={() => {
                                    window.localStorage.removeItem("cat_id");
                                    window.localStorage.removeItem("cat_name")
                                    this.props.history.push("/all-category")
                                }} >Back</button>
                        </table>

                    </div>
                </div>
            </div>
        )
    }
}
export default ListProductsByCategoryComponent;

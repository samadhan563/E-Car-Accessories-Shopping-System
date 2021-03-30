import React, { Component } from 'react'
import CategoryServices from '../Services/CategoryServices';
import Navigation from "../Navbar/index"
class ListECategoryComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: [],
            categoryName: '',

        }
        this.addNewCategory = this.addNewCategory.bind(this);
        this.viewOldProduct = this.viewOldProduct.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
    }

    onChangeCategory = (event) => {
        this.setState({ categoryName: event.target.value });
    }

    viewOldProduct(id, name) {
        window.localStorage.setItem("cat_id", id);
        window.localStorage.setItem("cat_name", name);
        this.props.history.push(`/products-under-category/${id}`);
    }

    removeCategory(id) {
        CategoryServices.removeCategory(id).then((res) => {
            res.data.result !== null && alert("category removed successfully....")
            res.data.result === null && alert("category remove failed....")
            window.location.reload();

        });
    }

    addNewCategory(categoryName) {
        let category1 = { categoryName: categoryName }
        CategoryServices.createCategory(category1).then((res) => {
            this.setState({ categoryName: "" });
            res.data.result !== null && alert("Category added successfully.......");
            res.data.result === null && alert("Add category opration failed....")
            window.location.reload();
        });
    }
    componentDidMount() {

        CategoryServices.getCategory().then((res) => {
            this.setState({ category: res.data });
            console.log(res.data)
        });
    }
    render() {
        let i = 0;
        return (
            <div >
                <Navigation />
                <br />
                <br />
                <br />
                <br />
                <div style={{ marginLeft: "100px", marginRight: "100px" }}>
                    <br />
                    <h2 className="text-center">Category List</h2>
                    <div className="row">
                        <table className="table table-striped text-center table-light">
                            <thead className="text-center ">
                                <tr>
                                    <th> Sr. No.</th>
                                    <th> Category Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.category.map(
                                        category =>
                                            <tr key={category.id}>
                                                <td className="text-center ">{++i}</td>
                                                <td>{category.categoryName}</td>
                                                <td>
                                                    <button style={{ backgroundColor: "darkcyan", marginLeft: "30px" }} className="btn btn-info" onClick={() => this.viewOldProduct(category.id, category.categoryName)} >View Products</button>
                                                    <button className="btn btn-danger" style={{ backgroundColor: "red", marginLeft: '10px' }} onClick={() => this.removeCategory(category.id)}>Remove</button>
                                                </td>

                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <br />
                        <br />
                        <br />
                        <div className="center ">
                            <div class="row mb-4">
                                <label className="col-sm-3 col-form-label">Enter Category Name ::</label>
                                <div className="col-sm-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="categoryName"
                                        value={this.state.categoryName}
                                        onChange={this.onChangeCategory}
                                        required
                                    />
                                </div>
                            </div>
                            <h2><button className="btn btn-primary md-col-4" onClick={() => this.addNewCategory(this.state.categoryName)} >Add Category </button></h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListECategoryComponent
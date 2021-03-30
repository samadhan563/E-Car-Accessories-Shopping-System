import React, { Component } from 'react'
import UserServices from '../Services/UserServices'
import Navigation from "../Navbar/index"
class ViewUserComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            user: {},
        }
        this.back = this.back.bind(this);
    }
    back() {
        this.props.history.push('/list')
    }

    componentDidMount() {
        UserServices.getUserById(this.state.id).then((res) => {
            this.setState({ user: res.data.result });
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
                <div className="card col-md-6 offset-md-3 table-light" style={{ borderRadius: "25px" }}>
                    <br />
                    <h2 className="text-center">User Info</h2>
                    <div className="cart-body table-light">


                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">User Name</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="lastName" value={this.state.user.firstName} readOnly />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label"> Last Name</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="lastName" value={this.state.user.lastName} readOnly />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Date Of Birth </label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="lastName" value={this.state.user.dateOfBirth} readOnly />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Email Id </label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="lastName" value={this.state.user.email} readOnly />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Phone Number</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="lastName" value={this.state.user.phoneNumber} readOnly />
                            </div>
                        </div>
                    </div> <button className="btn btn-info float-lg-start" onClick={this.back.bind(this)} style={{ marginLeft: "10px", width: "100px", backgroundColor: 'lightcoral' }}>Back</button>
                </div>
            </div>
        )
    }
}
export default ViewUserComponent;

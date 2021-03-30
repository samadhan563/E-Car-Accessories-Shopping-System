import Navigation from "../admin/Navbar/index";
import Footer from "../../components/Footer";
import Header from "../../components/Header"
import React, { Component } from "react";
class ProfileScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    }
  }

  componentDidMount() {
    this.setState({
      id: window.localStorage.getItem("user_id"),
      firstName: window.localStorage.getItem("user_fname"),
      lastName: window.localStorage.getItem("user_lname"),
      email: window.localStorage.getItem("user_email"),
    })
  }

  render() {
    return (
      <div>
        <Navigation></Navigation>
        <br/>
        <br/>
        <br/>
        <div>
        <div className="main">
          {/*<Header title="!!! User Details !!!" />*/}
          <h2>Hello , {window.localStorage.getItem("user_fname")}</h2>
          <br />
          <div className="form">
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">First Name</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" name="firstName" value={this.state.firstName} readOnly />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Last Name</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" name="lastName" value={this.state.lastName} readOnly />
              </div>
            </div>

            <div class="row mb-3">
              <label className="col-sm-4 col-form-label">Email</label>
              <div className="col-sm-8">
                <input type="email" className="form-control" name="email" value={this.state.email} readOnly />
              </div>
            </div>
          </div>
        </div>
        <div style={{display:"fixed"}}>
        <br/>
        <br/>
        <Footer  />
        </div>
        </div>
      </div>
    )
  }

}
export default ProfileScreen
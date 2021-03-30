import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

import viewIcon from "./images/viewProfile.jpg"
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
      dateOfBirth: '',
      phone: '',
      message: ''
    }
  }

  componentDidMount() {
    this.setState({
      id: window.localStorage.getItem("user_id"),
      firstName: window.localStorage.getItem("user_fname"),
      lastName: window.localStorage.getItem("user_lname"),
      dateOfBirth: window.localStorage.getItem("user_dob"),
      email: window.localStorage.getItem("user_email"),
      phone: window.localStorage.getItem("user_phone"),
    })
  }

  render() {
    return (
      <div>

        <Navigation />
        <div className="main" style={{backgroundColor:"LightGrey"}}>
          <Header title=" User Profile " />
          <img style={{ width: "190px" }} 
            src={viewIcon}
            alt="profile-img"
            className="profile-img-card"
          />
          <div className="form" >
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">First Name</label>
              <div className="col-sm-8" >
                <input type="text" className="form-control" style={{backgroundColor:"white"}} name="firstName" value={this.state.firstName} readOnly />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Last Name</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" style={{backgroundColor:"white"}} name="lastName" value={this.state.lastName} readOnly />
              </div>
            </div>

            <div class="row mb-3">
              <label className="col-sm-4 col-form-label">Date of Birth</label>
              <div className="col-sm-8">
                <input type="email" className="form-control" style={{backgroundColor:"white"}} name="dateOfBirth" value={this.state.dateOfBirth} readOnly />
              </div>
            </div>
            <div class="row mb-3">
              <label className="col-sm-4 col-form-label">Email</label>
              <div className="col-sm-8">
                <input type="email" className="form-control" style={{backgroundColor:"white"}} name="email" value={this.state.email} readOnly />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Phone</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" style={{backgroundColor:"white"}} name="phone" value={this.state.phone} readOnly />
              </div>
            </div>
          </div>
      
        </div>
        <Footer />
      </div>
    )
  }

}
export default ProfileScreen
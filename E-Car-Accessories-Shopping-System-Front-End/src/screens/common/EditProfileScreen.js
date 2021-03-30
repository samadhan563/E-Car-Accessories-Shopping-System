import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import editProfileIcon from "./images/editProfile.jpg";
import ApiCustomerService from "../../services/customer/AuthService";
import React, { Component } from "react";
import Header from "../../components/Header";

class EditProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state ={
      id : '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      message: ''
  }
    this.editUser = this.editUser.bind(this);
}

componentDidMount() {
    this.setState({
        id: window.localStorage.getItem("user_id"),
        firstName: window.localStorage.getItem("user_fname"),
        lastName: window.localStorage.getItem("user_lname"),
        email: window.localStorage.getItem("user_email"),
        dateOfBirth: window.localStorage.getItem("user_dob"),
        phoneNumber: window.localStorage.getItem("user_phone"),
        })
}


onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    editUser = (e) => {
      e.preventDefault();
      let user = {id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, phoneNumber: this.state.phoneNumber, dateOfBirth: this.state.dateOfBirth};
      ApiCustomerService.editUser(user)
          .then(res => {
              let user = res.data.result;
              user != null && window.localStorage.setItem("user_fname", user.firstName);
              user != null && window.localStorage.setItem("user_lname", user.lastName);
              user != null && window.localStorage.setItem("user_email", user.email);
              user != null && window.localStorage.setItem("user_phone", user.dateOfBirth);
              user != null && window.localStorage.setItem("user_phone", user.phoneNumber);
              alert("Profile Update successfully")
              window.localStorage.getItem("user_role") === 'CUSTOMER' && this.props.history.push('/home');
              window.localStorage.getItem("user_role") === 'ADMIN' && this.props.history.push('/admin');
          });
  }
  render() {
    return (
      <div>
        <Navigation />
        <div className="main" style={{backgroundColor:'OldLace'}}>
          <Header title="Edit Profile" />
          <img style={{ width: "190px" }} 
            src={editProfileIcon}
            alt="profile-img"
            className="profile-img-card"
          />
          <div className="form">
            <div class="row mb-4" >
              <label className="col-sm-3 col-form-label ">First Name</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.onChange}
                  required
                />

              </div>
            </div>

            <div class="row mb-4">
              <label className="col-sm-3 col-form-label">Last Name</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.onChange}
                  required
                />

              </div>
            </div>
            <div class="row mb-4">
              <label className="col-sm-3 col-form-label">Date Of Birth</label>
              <div className="col-sm-9">
                <input
                  type="date"
                  className="form-control"
                  name="dateOfBirth"
                  value={this.state.dateOfBirth}
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>
            <div class="row mb-4">
              <label className="col-sm-3 col-form-label">Phone Number</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={this.onChange}
                  required
                />

              </div>
            </div>

            <div class="row mb-4">
              <label className="col-sm-3 col-form-label">Email</label>
              <div className="col-sm-9">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  readOnly = {true} 
                  value={this.state.email}
                  onChange={this.onChange}
                  required
                />

              </div>
            </div>

            <div class="row mb-4">
              <label className="col-sm-3 col-form-label">Password</label>
              <div className="col-sm-9">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>

            <div class="row mb-4">
              <label className="col-sm-3 col-form-label">Confirm Password</label>
              <div className="col-sm-9">
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <button
                className="btn btn-success float-end"
                onClick={this.editUser}
              >
                Edit Profile
              </button>
              <br></br>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default EditProfileScreen;

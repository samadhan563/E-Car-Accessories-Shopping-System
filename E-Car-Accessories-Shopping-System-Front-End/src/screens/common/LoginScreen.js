import "../../App.css"
import React, { Component } from 'react'
import SigninIcon from "./images/login-icon-png.png"
import { Link } from 'react-router-dom'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ApiCustomerService from "../../services/customer/ApiServices";
import AuthService from "../../services/customer/AuthService";
class LoginScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      dateOfBirth: '',
      admin: '',
      message: '',
    }
    this.authenticateUser = this.authenticateUser.bind(this);
    this.getCartSize = this.getCartSize.bind(this);
    this.updateUserCart = this.updateUserCart.bind(this);
  }

  onChange = (e) =>
    this.setState({ [e.target.name]: e.target.value });

  getCartSize() {
    setTimeout(() => {
      ApiCustomerService.getCartByUserId(JSON.parse(window.localStorage.getItem("user_id")))
        .then((res) => {
          JSON.stringify(window.localStorage.setItem("cart_size", res.data.result.length));
        });
    }, 1000);

  }

  updateUserCart() {
    let cartUserId = JSON.parse(window.localStorage.getItem("user_id"));
    let cartSize = JSON.parse(window.localStorage.getItem("cart_size"));
    if (cartSize > 0) {
      ApiCustomerService.updateCartUserId(cartUserId);
    }
    this.getCartSize();
  }
  authenticateUser = (e) => {
    e.preventDefault();
    let loginRequest = { email: this.state.email, password: this.state.password };
    AuthService.fetchUserByLoginrequest(loginRequest)
      .then(res => {
        let user = res.data.result;
        user == null && this.setState({ message: 'Invalid Login Credentials', email: "", password: "" });
        user !== null && this.setState({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          dateOfBirth: user.dateOfBirth,
          phoneNumber: user.phoneNumber,
          admin: user.admin,
          message: '',
          cart: [],
        })
        user != null && alert("User Login successfully")
        user != null && this.setState({ message: 'User Login successfully.' });
        user != null && window.localStorage.setItem("status", true);
        user != null && window.localStorage.setItem("user_fname", user.firstName);
        user != null && window.localStorage.setItem("user_lname", user.lastName);
        user != null && window.localStorage.setItem("user_email", user.email);
        user != null && window.localStorage.setItem("user_dob", user.dateOfBirth);
        user != null && window.localStorage.setItem("user_phone", user.phoneNumber);

        user != null && window.localStorage.setItem("user_id", user.id);
        user != null && user.admin === false && this.updateUserCart();
        if (user != null && user.admin) {
          user != null && window.localStorage.setItem("user_role", 'ADMIN');
          user != null && user.admin === true && this.props.history.push('/admin');
        }
        else {
          user != null && window.localStorage.setItem("user_role", 'CUSTOMER');
          user != null && user.admin === false && this.props.history.push('/home');
        }


      })
  }


  render() {
    return (
      <div>
        <Navigation />
        <div className="card img-rounded col-md-4 offset-md-4 offset-md-4 " style={{borderRadius:"25px",backgroundColor:"OldLace" }}>
          <h2 className="text-center card-title"> <b>Sign In </b></h2>
          <br/>
          <img style={{ width: "190px" }}
            src={SigninIcon}
            alt="profile-img"
            className="profile-img-card"
          />
          <br />
          <h5 className="nameColor1 text-center">{this.state.message}</h5>
          <div class="row mb-3">
            <label className="col-sm-4 col-form-label">Email</label>
            <div className="col-sm-8">
              <input type="email"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                required
              />
            </div>
          </div>
          <div class="row mb-3">
            <label className="col-sm-4 col-form-label">Password</label>
            <div className="col-sm-8">
              <input type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                required />
            </div>
          </div>
          <div className="mb-3">
            <button className="btn btn-success float-start" onClick={this.authenticateUser}>
              Login
             </button>
            <div className="float-end" style={{ marginLeft: "10px" }}>
              Click here to <Link to="/forgot">Forgot Password</Link>
            </div>
            <div className="float-end">
              New User? <Link to="/create-account">Create Account here</Link>
            </div>
            <br></br>
          </div>

        </div>
        <Footer />
      </div>
    );
  }
}
export default LoginScreen

/*

import "../../App.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ApiCustomerService from "../../services/customer/ApiCustomerService";
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNumber: "",
      email: "",
      imageUrl: "",
      admin: ""
    }
    this.authenticateUser = this.authenticateUser.bind(this);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  authenticateUser = (e) => {
    e.preventDefault();
    let loginRequest = {
      email: this.state.email,
      password: this.state.password,
    };
    ApiCustomerService.fetchUserByLoginrequest(loginRequest).then((res) => {
      let user = res.data;
      console.log(user);
      res == null && this.setState({ message: "Invalid Login Credentials" });
      this.setState({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        phoneNumber: user.phoneNumber,
        email: user.email,
        imageUrl: user.imageUrl,
        admin: user.admin,
      });
      if (this.state.admin === false) {

        user != null && alert("User Login successfully");
        user != null && this.setState({ message: "User Login successfully." });
        user != null && window.localStorage.setItem("status", true);
        user != null && window.localStorage.setItem("user_details", JSON.stringify(this.state));
        user != null && window.localStorage.setItem("user_id", user.id);
        this.props.history.push("/home");
      }
      else {
        user != null && alert("Admin Login successfully");
        user != null && window.localStorage.setItem("user_details", JSON.stringify(this.state));
        this.props.history.push("/admin");
      }
    }).catch(error => {
    alert(error.response.data);
    return error;
  });
  }
  render() {
    return (
      <div>
        <Navigation />
        <div className="main">
        <h2>Sign In </h2>
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <div className="form">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email "
                className="form-control mb-6"
                placeholder="name@gmail.com"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                validations={[required]}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="********"
                name="password"
                value={this.state.password}
                onChange={this.onChange} required
              ></input>
            </div>
            <div className="mb-3">
              <button
                className="btn btn-success float-start"
                onClick={this.authenticateUser}
                validations={[required]}
              >
                Login
              </button>
              <div className="float-end">
                New User? <Link to="/create-account">Create Account here</Link>
              </div>
              <br></br>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default LoginScreen;
*/
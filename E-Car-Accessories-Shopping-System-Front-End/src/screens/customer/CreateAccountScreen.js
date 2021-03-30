import "../../App.css";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ApiCustomerService from "../../services/customer/AuthService";
import React, { Component } from "react";
import RegisterIcon from "../common/images/registerNew.jpg"
//import { lighten } from "@material-ui/core";


class CreateAccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      message: "",
      errors: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
      }
    };
    this.registerUser = this.registerUser.bind(this);
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  registerUser = (e) => {
    e.preventDefault();

    let user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      dateOfBirth: this.state.dateOfBirth,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    ApiCustomerService.addUser(user).then((res) => {
      res.data.result != null && alert("SignUp successfully");
      if (res.data.result === null) {
        alert(" Sign up failed..............." + res.data.message);
        this.setState({
          firstName: "", lastName: "", dateOfBirth: "", phoneNumber: "", email: "", password: "",
          confirmPassword: ""
        });
        this.props.history.push("/create-account");
      } else {
        // this.setState({ message: "SignUp successfully." });
        this.props.history.push("/login");
      }
    })/*.catch(error => {
          this.setState ({firstName:"",lastName:"", dateOfBirth: "", phoneNumber: "",email: "", password: "",
          confirmPassword: ""});
          console.log(error)
        alert();
        
        return error;
      });*/

  };


  cancel() {
    this.props.history.push('/home')
  }


  render() {
    return (

      <div>
        <Navigation />
        <div className="main " style={{ backgroundColor: 'OldLace' }} >
            <h2 style={{ color: "chocolate" }}>Sign Up New User </h2>
          <div className="card-body ">
            <img style={{ width: "190px" }}
              src={RegisterIcon}
              alt="profile-img"
              className="profile-img-card"
            />
            <br />
            <div className="form">
              <div class="row mb-4" >
                <label className="col-sm-3 col-form-label ">First Name</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChange}
                    required=""
                  />

                </div>
              </div>

              <div class="row mb-4">
                <label className="col-sm-3 col-form-label">Last Name</label>
                <div className="col-sm-8">
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
                <div className="col-sm-8">
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
                <div className="col-sm-8">
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
                <div className="col-sm-8">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    required
                  />

                </div>
              </div>

              <div class="row mb-4">
                <label className="col-sm-3 col-form-label">Password</label>
                <div className="col-sm-8">
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
                <div className="col-sm-8">
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
                <button className="btn btn-success float-start" onClick={this.registerUser} >
                  Register
               </button>
                <button className=" btn-danger btn" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px", backgroundColor: "Tomato" }}>Cancel</button>
                <div className="float-end">
                  Existing User? <Link to="/login">Login here </Link>
                </div>
                <br></br>


              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default CreateAccountScreen;




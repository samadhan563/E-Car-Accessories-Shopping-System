import "../../App.css"
import React, { Component } from 'react'
import Icon from "./images/forgot-password.png"
import { Link } from 'react-router-dom'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ApiCustomerService from "../../services/customer/AuthService";
class ForgotPasswordScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',

    }
    this.forgotPassword = this.forgotPassword.bind(this);
  }

  onChange = (e) =>
    this.setState({ [e.target.name]: e.target.value });


  forgotPassword = (e) => {
    e.preventDefault();
    let forgotRequest = { email: this.state.email, password: this.state.password, confirmPassword: this.state.confirmPassword };
    ApiCustomerService.forgotUserPassword(forgotRequest)
      .then(res => {
        let user = res.data.result;
        user == null && this.setState({ message: 'Invalid Login Credentials', email: "", password: "", confirmPassword: "" });
        user !== null && this.props.history.push('/login');
        // user != null && alert("User Login successfully By ")
        //user != null && this.setState({ message: 'User Login successfully.' })
      })
  }


  render() {
    return (
      <div>
        <Navigation />
        <div className="card col-md-4 offset-md- offset-md-3" style={{ borderRadius: "25px",backgroundColor:"LightYellow" }}>
          <h2 className="text-center" style={{color:"blueviolet"}}> <b>Forgot Password</b></h2>
          <img style={{ width: "170px" ,height:"130px"}}
            src={Icon}
            alt="profile-img"
            className="profile-img-card"
          />
          <h5 className="nameColor1 text-center">{this.state.message}</h5>
          <div class="row mb-3">
            <label className="col-sm-4 col-form-label">Email</label>
            <div className="col-sm-7">
              <input type="email"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                required />
            </div>
          </div>
          <div class="row mb-3">
            <label className="col-sm-4 col-form-label">Password</label>
            <div className="col-sm-7">
              <input type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                required />
            </div>
          </div>
          <div class="row mb-3">
            <label className="col-sm-4 col-form-label">Confirm Password</label>
            <div className="col-sm-7">
              <input type="password"
                className="form-control"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.onChange}
                required />
            </div>
          </div>
          <div className="mb-3">
            <button className="btn btn-success float-start" onClick={this.forgotPassword}>
              Forgot Now
             </button>
            <div className="float-end" style={{ marginLeft: "10px" }}>
              Click here to <Link to="/login">Sign In</Link>
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
export default ForgotPasswordScreen

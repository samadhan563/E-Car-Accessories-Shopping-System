/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import logo from "./logo.jpg";
import "./Navbar/Navbar.css"
import "./Navbar/Dropdown.css";
import React, { Component } from "react";
import ApiCustomerService from "../services/customer/ApiServices";
import Slider from "./Slider"

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      st: false,
      searchProduct: "",
      products: [],
    };
    this.getStatus = this.getStatus.bind(this);
    this.searchProductByName = this.searchProductByName.bind(this);

    
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  componentDidMount() {
    this.getStatus();
  }
  getStatus() {
    this.setState((prevState) => ({
      st: window.localStorage.getItem("status") === "true",
    }));
  }

  searchProductByName = (e) => {
      e.preventDefault();
      window.localStorage.setItem("searchProductName", this.state.searchProduct);
      window.open("/show-search-product");

  };

  render() {
    return (
      <div style={{backgroundColor:'lightcyan'}}>
      <header  >
      
        <nav className="navbar navbar-expand-lg navbar-light bg-warning" style={{backgroundColor:'lightcyan'}} >
          <div className="container-fluid"  >
            <Link to="/home">
              <a className="navbar-brand">
                <img
                  src={logo}
                  class="img-fluid"
                  alt="Logo"
                  width="90px"
                  height="90px"
                />
              </a>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 " >
                <li className="nav-item">
                  <Link to="/home">
                    <a className="nav-link">
                      <h5 style={{ color: "white" }}>Home</h5>
                    </a>
                  </Link>
                </li>
                <li className="nav-item" style={{marginLeft:"30px"}}>
                <Link to="/home">
                  <a className="nav-link">
                    <h5 style={{ color: "white" }}>ECASS</h5>
                  </a>
                </Link>
              </li>
                {this.state.st && (
                  <li class="nav-item dropdown">
                    <h5>
                      <a style={{ color: "white" }}
                        class="nav-link dropdown-toggle"
                        href="myaccount"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        My Account
                      </a>
                      <ul style={{ color: "white" }}
                        class="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <a class="dropdown-link" href="/myaccount/profile">
                            Profile
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-link"
                            href="/myaccount/editprofile"
                          >
                            Edit Profile
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-link"
                            href="/myaccount/change-password"
                          >
                            Update Password
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-link"
                            href="/myaccount/changeaddress"
                          >
                            Change Address
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-link"
                            href="/myaccount/orderhistory"
                          >
                            Order History
                          </a>
                        </li>
                       
                        <li>
                          <a class="dropdown-link" href="/logout">
                            Sign Out
                          </a>
                        </li>
                      </ul>
                    </h5>
                  </li>
                )}
              </ul>

              <ul className="nav justify-content-end">


              {!this.state.st && (
                  <li className="nav-item">
                    <Link to="/contactus" className='nav-links'>  
                       Contact Us 
                    </Link>
                  </li>
                )}

              {!this.state.st && (
                  <li className="nav-item">
                    <Link to="/product" className='nav-links'>
                      
                       Product
                      
                    </Link>
                  </li>
                )}
                 {!this.state.st && (
                  <li className="nav-item">
                    <Link to="/login" className='nav-links'>  
                       <ShoppingCartIcon/>          
                    </Link>
                  </li>
                )}
                {!this.state.st && (
                  <li className="nav-item">
                    <Link to="/create-account" className='nav-links'>
                      
                       Sign Up
                      
                    </Link>
                  </li>
                )}
                {!this.state.st && (
                  <li className='nav-item'>
                    <Link
                      to='/login'
                      className='nav-links'
                    >
                      Sign In
                  </Link>
                  </li>
                )}
                 {this.state.st && (
                  <li className="nav-item">
                    <Link to="/cart">
                      <a className="nav-link">
                        <h5 className="nameColor" style={{ color: "white" }}><ShoppingCartIcon style={{ color: "white" }}/></h5>
                      </a>
                    </Link>
                  </li>
                )}
                 {this.state.st && (
                  <li className="nav-item">
                    <Link to="/logout">
                      <a className="nav-link">
                        <h5 className="nameColor" style={{ color: "white" }}>Sign Out</h5>
                      </a>
                    </Link>
                  </li>
                )}
             

                {this.state.st && (
                  <li className="nav-item">
                    <Link to="/myaccount/profile">
                      <a className="nav-link">
                        <h5 className="nameColor" style={{ color: "white" }}>WelCome {/*window.localStorage.getItem("user_fname")*/}</h5>
                      </a>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
       
        <Slider/>
        <br />
      
        <div className="row md-col-1" style={{backgroundColor:'lightcyan'}}  >
          <table >
            <tr>
              <td className="col-md-2 text-start"></td>
              <td className="col-md-2 text-end">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="searchProduct"
                    value={this.state.searchProduct}
                    onChange={this.onChange}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={this.searchProductByName}
                  >
                    Search
                  </button>
                </div>
              </td>
              <td className="col-md-2 text-end"></td>
            </tr>
          </table>

          <br />
        </div>
        </header>
      </div>
    );
  }
}

export default Navigation;

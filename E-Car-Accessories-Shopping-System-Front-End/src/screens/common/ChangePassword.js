import { Link } from 'react-router-dom'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ApiCustomerService from "../../services/customer/AuthService";
import React, { Component } from 'react'
import Header from "../../components/Header"

class ChangePasswordScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      password:'',
      message: ''
    }
    this.changePassword = this.changePassword.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: window.localStorage.getItem("user_id"),
    })
  }


  onChange = (e) =>{
    this.setState({ password: e.target.value });
    
}
changePassword = (e) => {
  console.log(this.state.password,this.state.id);
  e.preventDefault();

  let pass={id:this.state.id, password:this.state.password}
  ApiCustomerService.editUserPassword(pass)
    .then(res => {
      alert("Password Changed successfully")
      window.localStorage.getItem("user_role") === 'CUSTOMER' && this.props.history.push('/home');
      //window.localStorage.getItem("user_role") === 'ADMIN' && this.props.history.push('/admin');
    });
}

render(){
  return (
    <div>
      <Navigation />
      <div className="main">
        <Header title="Change Password" />
        <br />
        <div className="form">
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Enter New Password</label>
            <div className="col-sm-8">
              <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.onChange} />
            </div>
          </div>
          <div className="mb-3">
            <button className="btn4 btn-success float-end" onClick={this.changePassword}>
              Change Password
          </button>
            <br></br>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
}

export default ChangePasswordScreen
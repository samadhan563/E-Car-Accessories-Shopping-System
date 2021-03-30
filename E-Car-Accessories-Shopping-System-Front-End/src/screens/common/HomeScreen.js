/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../App.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiCustomerService from "../../services/customer/ApiServices";
import BreakSystem from "../images/Engine/Engine5.jpg";
import ClouthSystem from "../images/Engine/Engine2.jpg";
import Engine from "../images/Engine/Engine11.jpg";
//import Transmission from "../images/Car1.jpg";
import Navigation from "../../components/Navigation";
//import Navigation from "../../components/Navbar/Navbar";
import Slider from "../../components/Slider";
import Footer from "../../components/Footer";

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: [],
      message: "",
    }
    this.selectcategory = this.selectcategory.bind(this);
    this.reloadCategoryList = this.reloadCategoryList.bind(this);

  }

  componentDidMount() {
    let size = JSON.parse(window.localStorage.getItem("cart_size"))
    if (size === null)
      JSON.stringify(window.localStorage.setItem("cart_size", 0));
    if (size !== null)
      JSON.stringify(window.localStorage.setItem("cart_size", size));

    let uId = JSON.parse(window.localStorage.getItem("user_id"))
    if (uId === null)
      JSON.stringify(window.localStorage.setItem("user_id", 9999));
    if (uId !== null)
      JSON.stringify(window.localStorage.setItem("user_id", uId));

    this.reloadCategoryList();
  }

  reloadCategoryList() {
    ApiCustomerService.fetchAllCategory()
      .then((res) => {
        this.setState({ category: res.data.result })
      });
  }

  selectcategory(id, name) {
    window.localStorage.setItem("category_id", id);
    window.localStorage.setItem("category_name", name);
    this.props.history.push('/product-category');
  }

  render() {
    return (
      <div >
        <Navigation />
        <br></br>
        <div className="container"  >
          <table>
            <tr className="container-fluid" >
              <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" >
                <div class="carousel-indicators w-100">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div className="container"  >

                  <div className="carousel-inner w-100"   >
                    <div className="carousel-item active" data-bs-interval="2000">
                      <Link to="/home">
                        <img src={BreakSystem} className="d-block w-100 " alt="image1" height="500px" />
                      </Link>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                      <img src={ClouthSystem} className="d-block w-100 " alt="image2" height="500px" width="2000px" />
                    </div>
                    <div className="carousel-item" >
                      <img src={Engine} className="d-block w-100 " alt="image3" height="500px" width="2000px" />
                    </div>{/*}
                    <div className="carousel-item">
                      <img src={Transmission} className="d-block w-100 " alt="image4" height="500px" width="2000px" />
    </div>*/}
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </tr>
          </table>
        </div>
        <br />
        <div className="container">
          <table>
            <tr>
              <td className="col-md-5"><hr></hr></td>
              <td className="col-md-1"><h4>Category</h4></td>
              <td className="col-md-5"><hr></hr></td>
            </tr>
          </table>
        </div>


        <div className="container">

          <div className="row row-center">
            {this.state.category.map(cat =>
              <div className="product col-md-3" style={{ width: "305px" }} key={cat.id}>
                <div className="title" style={{ backgroundColor: "lightgoldenrodyellow" }}>
                  <Link to="/product-category">
                    <a className="navbar-brand" name="fruitsnvegtables" onClick={() => { this.selectcategory(cat.id, cat.categoryName) }}>
                      <img src={'/images/' + cat.categoryName + '.jpg'} className="d-block w-100 " alt="image" height="270px" width="200px" />
                    </a>
                  </Link>
                  <a className="nav-link" onClick={() => { this.selectcategory(cat.id, cat.categoryName) }}><b><h5 className="nameColor">{cat.categoryName}</h5></b></a>
                </div>
              </div>
            )}
          </div>
        </div>
        <Slider />
        <Footer />
      </div>
    )
  }

}


export default HomeScreen;

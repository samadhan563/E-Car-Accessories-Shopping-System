/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom'
import "./footer.css"

const Footer = () => {
    return (
        <div className="main-footer">
            <div className="container">
                <div className="row ">
                    {/* Column1 */}
                    <div className="col">
                        <Link to="/aboutus">
                            <a className="nav-link"><h5 style={{ color: "white" }}>About Us</h5></a>
                        </Link>
                        <h6 className="list-unstyled">
                            <li>+91 9527644283</li>
                            <li>Pune, India</li>
                            <li>Kothrud 411038</li>
                        </h6>
                    </div>
                    {/* Column2 */}
                    <div className="col">
                        <Link to="/contactus">
                            <a className="nav-link"><h5 style={{ color: "white" }}>Contact Us</h5></a>
                        </Link>
                        <h6 className="list-unstyled">
                            <li>Samadhan and Achal </li>
                            <li>+91 9527644283</li>
                            <li>samadhan563@gmail.com</li>
                        </h6>
                    </div>
                    {/* Column3 */}
                    <div className="col">
                        <Link to="/termsnconditions">
                            <a className="nav-link"><h5 style={{ color: "white" }}>Terms & Conditions</h5></a>
                        </Link>
                        <h6 className="list-unstyled">
                            <li>Personal Information</li>
                            <li>Services overview</li>
                            <li>Eligibility</li>
                        </h6>
                    </div>
                    <div className="col">
                        <Link to="/privacypolicy">
                            <a className="nav-link"><h5 style={{ color: "white" }}>Privacy Policy</h5></a>
                        </Link>
                        <h6 className="list-unstyled">
                            <li>Personal Information</li>
                            <li></li>
                            <li></li>
                        </h6>
                    </div>
                    {/* Column3 */}
                    <div className="col">
                        <Link to="/faqs">
                            <a className="nav-link"><h5 style={{ color: "white" }}>FAQs</h5></a>
                        </Link>
                        <h6 className="list-unstyled">
                            <li>Registration</li>
                            <li>Eligibility</li>
                            <li></li>
                        </h6>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row text-center">
                <p className="col-sm">
                    &copy;{new Date().getFullYear()} THICC MEMES | All rights reserved |
                    Terms Of Service | Privacy
                </p>
            </div>
        </div>



    );

}


export default Footer

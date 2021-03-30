import Navigation from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer"; 
import image from "../images/CategoryImg/Engine/cylinder.gif"

const ContactUsScreen = () => {
    return (
        <div>
            <Navigation/>
            <div  styles={{ backgroundImage:`url(../images/CategoryImg/Engine/cylinder.gif)` }}>
            <div className="main" >
                <h3>Contact Us  </h3>
                <h5>Name : Samadhan</h5>
                <h5>Email : samadhan563@gmail.com</h5>
                <h5>Contact No : +91 9527644283</h5>
                <h5>or</h5>
                <h5>Name : Miss. Achal</h5>
                <h5>Email : achal@gmail.com</h5>
                <h5>Contact No : +91 9527644283</h5>
            </div> 
            </div>
            <Footer/>
        </div>    
    );
}
export default ContactUsScreen
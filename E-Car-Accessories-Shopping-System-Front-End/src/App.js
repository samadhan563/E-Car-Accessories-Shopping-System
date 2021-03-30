import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomeScreen from "./screens/common/HomeScreen";
import CreateAccountScreen from "./screens/customer/CreateAccountScreen";
import LoginScreen from "./screens/common/LoginScreen";
import ForgotPasswordScreen from "./screens/common/ForgotPasswordScreen";
import AboutUsScreen from "./screens/common/AboutUsScreen";
import ContactUsScreen from "./screens/common/ContactUsScreen";
import TermAndConditionScreen from "./screens/common/TermAndConditionScreen";
import FAQSScreen from "./screens/common/FAQSScreen";
import PrivacyPolicyScreen from "./screens/common/PrivacyPolicyScreen";
import ProductCategoryScreen from "./screens/customer/ProductCategoryScreen";
import CartScreen from "./screens/customer/CartScreen";
import PaymentScreen from "./screens/customer/PaymentScreen";
import LogoutScreen from "./screens/common/LogoutScreen";
import ShowSearchProductScrreen from "./screens/customer/ShowSearchProductScrreen";
import ProductDetailsScreen from "./screens/customer/ProductDetailsScreen";
import ProfileScreen from "./screens/common/ProfileScreen";
import AllProductDetailsScreen from "./screens/common/AllProducts";
import EditProfileScreen from "./screens/common/EditProfileScreen";
import ChangeAddressScreen from "./screens/common/ChangeAddressScreen";
import OrderHistoryScreen from "./screens/common/OrderHistoryScreen";
import ChangePasswordScreen from "./screens/common/ChangePassword";
import OrderDetailsPageScreen from './screens/common/OrderDetailsPage';
import Stripe from "./screens/customer/StripeDemo";

import Admin from './services/admin/ProfileScreen';
import ListProductsComponent from './services/admin/Component/ListProductsComponent'
import AddUpdateProduct from './services/admin/Component/AddUpdateProduct'
import ListUserComponent from './services/admin/Component/ListUserComponent'
import ViewProduct from './services/admin/Component/ViewProductsComponent'
import ListECategoryComponent from './services/admin/Component/ListECategoryComponent'
import AddProductComponent from './services/admin/Component/AddProductComponent'
import ListProductsByCategoryComponent from './services/admin/Component/ListProductsByCategoryComponent';
import ViewUserComponent from "./services/admin/Component/ViewUserComponent"
import OrderListComponent from "./services/admin/Component/OrderListComponent"
import ViewOrderDetails from "./services/admin/Component/ViewOrderDetails"

function App() {
  return (
    <div style={{ backgroundColor: "lavender" }}>
      <Router>
        <div >
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/home" component={HomeScreen} />
            <Route path="/create-account" component={CreateAccountScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/forgot" component={ForgotPasswordScreen} />
            <Route path="/aboutus" component={AboutUsScreen} />
            <Route path="/contactus" component={ContactUsScreen} />
            <Route path="/termsnconditions" component={TermAndConditionScreen} />
            <Route path="/faqs" component={FAQSScreen} />
            <Route path="/privacypolicy" component={PrivacyPolicyScreen} />
            <Route path="/product-category" component={ProductCategoryScreen} />
            <Route path="/cart" component={CartScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/logout" component={LogoutScreen} />
            <Route path="/myaccount/change-password" component={ChangePasswordScreen} />
            <Route path="/orderDetailsPage" component={OrderDetailsPageScreen} />
            <Route path="/stripe" component={Stripe} />
            <Route path="/show-search-product" component={ShowSearchProductScrreen} />
            <Route path="/product-details" component={ProductDetailsScreen} />
            <Route path="/product" component={AllProductDetailsScreen} />
            <Route path="/myaccount/profile" component={ProfileScreen} />
            <Route path="/myaccount/editprofile" component={EditProfileScreen} />
            <Route path="/myaccount/changeaddress" component={ChangeAddressScreen} />
            <Route path="/myaccount/orderhistory" component={OrderHistoryScreen} />



            <Route path="/admin" component={Admin} />
           {/** <Route path="/admin-panel" component={AdminPanel} />*/} 
           {/*} <Route path="/admin-panel-dash" component={AdminDashBoard} />*/} 
            <Route path="/products" component={ListProductsComponent} />
            <Route path="/products-under-category/:id" component={ListProductsByCategoryComponent} />
            <Route path="/add-update-product/:id" component={AddUpdateProduct} />
            <Route path="/add-product-in-category/:id" component={AddProductComponent} />
            <Route path="/view-product/:id" component={ViewProduct} />
            <Route path="/list" component={ListUserComponent} />
            <Route path="/all-category" component={ListECategoryComponent} />

            <Route path="/view-user/:id" component={ViewUserComponent} />
            <Route path="/order-list" component={OrderListComponent} />
            <Route path="/view-details/:id" component={ViewOrderDetails} />

          </Switch>
        </div>

      </Router>
    </div>
  );
}

export default App;

import './App.css';
import Header  from "./component/layout/Header/Header.js";
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import WebFont from "webfontloader";
import React, { useEffect, useState } from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js";
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store.js";
import { loadUser } from './action/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js"; 
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import axios from 'axios';
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import MyOrders from "./component/Order/MyOrders.js"
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js"
import NewProduct from './component/admin/NewProduct';
import UpdateProduct from './component/admin/UpdateProduct';
import OrderList from "./component/admin/OrderList";
import ProcessOrder from "./component/admin/ProcessOrder"; 
import UserList from './component/admin/UserList';
import UpdateUser from "./component/admin/UpdateUser";
import ProductReviews from "./component/admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";



function App() {
const {isAuthenticated, user } = useSelector((state) => state.user);
const [stripeApiKey, setStripeApiKey] = useState("");

async function getStripeApiKey() {
  const { data } = await axios.get("/api/v1/stripeapikey");

  setStripeApiKey(data.stripeApiKey);
}

useEffect(() => {
 WebFont.load({
  google: {
    families: ["Roboto", "Droid Sans", "Chilanka"],
  },
 });

 store.dispatch(loadUser());  
 getStripeApiKey();
}, [])


  return (
  <Router>
    <Header />

    {isAuthenticated && <UserOptions user={user} />}
    <Routes>
    <Route exact path="/" Component={Home} />
    <Route exact path="/product/:id" Component={ProductDetails} />
    <Route exact path="/products" Component={Products} />
    <Route path="/products/:keyword" Component={Products} />

    <Route exact path="/contact" Component={Contact} />

<Route exact path="/about" Component={About} />
    
    <Route exact path="/search" Component={Search}  />

     <Route exact path="/account" element={ <ProtectedRoute>
      <Profile />
     </ProtectedRoute> } />


     <Route exact path="/me/update" element={ <ProtectedRoute>
      <UpdateProfile />
     </ProtectedRoute> } />

     <Route exact path="/password/update" element={ <ProtectedRoute>
      <UpdatePassword />
     </ProtectedRoute> } />

     <Route exact path="/password/forgot" Component={ ForgotPassword } />

     <Route exact path="/password/reset/:token" Component={ ResetPassword } />


    <Route exact path="/login" Component={LoginSignUp} />

    <Route exact path="/cart" Component={Cart} />

    <Route exact path="/shipping" element={ <ProtectedRoute>
      <Shipping />
     </ProtectedRoute> } />

     

     
      <Route exact path="/process/payment" element={ <ProtectedRoute>
        <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment />
        </Elements>
       </ProtectedRoute> } />
     

<Route exact path="/success" element={ <ProtectedRoute>
      <OrderSuccess />
     </ProtectedRoute> } />

     <Route exact path="/orders" element={ <ProtectedRoute>
      <MyOrders />
     </ProtectedRoute> } />

     
     <Route exact path="/order/confirm" element={ <ProtectedRoute>
      <ConfirmOrder />
     </ProtectedRoute> } />

     <Route exact path="/order/:id" element={ <ProtectedRoute>
      <OrderDetails/>
     </ProtectedRoute> } />

     <Route  isAdmin={true} exact path="/admin/dashboard" element={ <ProtectedRoute>
      <Dashboard/>
     </ProtectedRoute> } />
     
     <Route isAdmin={true} exact path="/admin/products" element={ <ProtectedRoute>
      <ProductList />
     </ProtectedRoute> } />

     <Route isAdmin={true} exact path="/admin/product" element={ <ProtectedRoute>
      <NewProduct />
     </ProtectedRoute> } />

     <Route isAdmin={true} exact path="/admin/product/:productId" element={ <ProtectedRoute>
      <UpdateProduct />
     </ProtectedRoute> } />

     <Route isAdmin={true} exact path="/admin/orders" element={ <ProtectedRoute>
      <OrderList />
     </ProtectedRoute> } />


     <Route isAdmin={true} exact path="/admin/order/:id" element={ <ProtectedRoute>
      <ProcessOrder />
     </ProtectedRoute> } />


     <Route isAdmin={true} exact path="/admin/users" element={ <ProtectedRoute>
      <UserList />
     </ProtectedRoute> } />

     <Route isAdmin={true} exact path="/admin/user/:userId" element={ <ProtectedRoute>
      <UpdateUser />
     </ProtectedRoute> } />

     <Route isAdmin={true} exact path="/admin/reviews" element={ <ProtectedRoute>
      <ProductReviews />
     </ProtectedRoute> } />


    </Routes>
    

    <Footer />
  </Router>
  );
 
}

export default App;

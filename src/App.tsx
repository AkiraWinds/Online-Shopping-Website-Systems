import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProductDetails from "./components/ProductDetails/Product";
import Home from "./components/Home/Home";
import Login from "./components/Home/Login";
import Navbar from "./components/Home/Navbar";
import Shopping from "./components/ProductList/Shopping";
import Cart from "./components/Cart/Cart";

import "./components/ProductList/Shopping.module.css";
import "./components/ProductDetails/Product.css";
import "./styles/home.css";
import "./styles/navbar.css";
import "./styles/login.css";
import "./styles/cart.css";

// Define the main component of the application
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/basket/:basketId" exact component={Cart} />
        <Route path="/products/:productId" exact component={ProductDetails} />
        <Route path="/products" exact component={Shopping} />
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

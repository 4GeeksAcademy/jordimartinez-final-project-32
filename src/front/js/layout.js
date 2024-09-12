import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { AddProduct } from "./pages/addProduct.jsx";
import { BackOffice } from "./pages/backOffice.jsx";
import { ProductView } from "./pages/productView.jsx";
import injectContext from "./store/appContext";

import { SearchResults } from "./component/searchResult.jsx";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import CategoriesTemplate from "./pages/categoryTemplate";

import { Login } from "./pages/login.js";
import { Register } from "./pages/register.js";
import { ResetPass } from "./pages/resetpass.js";
import { UpdatePassword } from "./pages/updatepass.js";
import { Profile } from "./pages/profile.js";

const Layout = () => {

    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <br />
                    <br />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />                       
                        <Route element={<BackOffice />} path="/backoffice" />            
                        <Route element={<AddProduct />} path="/addproduct" />                        
						<Route element={<AddProduct />} path="/editproduct/:id" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<CategoriesTemplate />} path="/category/:theid" />
                        <Route element={<ProductView />} path="/product/:theid" />
                        <Route element={<SearchResults />} path="/search-results" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<ResetPass />} path="/resetPass" />
                        <Route element={<UpdatePassword />} path="/passwordUpdate" />
                        <Route element={<Profile />} path="/profile" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { AddProduct } from "./pages/addProduct.jsx";
import { BackOffice } from "./pages/backOffice.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import CategoriesTemplate from "./pages/categoryTemplate";

const Layout = () => {
  
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <br/>                    
                    <br/>
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />                       
                        <Route element={<BackOffice />} path="/backoffice" />            
                        <Route element={<AddProduct />} path="/addproduct" />                        
						<Route element={<AddProduct />} path="/editproduct/:id" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<CategoriesTemplate />} path="/category/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

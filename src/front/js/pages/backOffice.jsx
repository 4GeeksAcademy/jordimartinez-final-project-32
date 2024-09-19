import React, { useState, useEffect, useContext } from "react";
import ProductView from "../component/productview.jsx";
import UserView from "../component/userview.jsx";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const BackOffice = () => {    
    const { store } = useContext(Context);
    const [activeTab, setActiveTab] = useState("products");

    const navigate = useNavigate();

    useEffect(() => {
        if (!store.token || store.user.rol === "CLIENT") {
            navigate("/login");
        }
    }, [store.token, store.user.rol, navigate]);

    return (
        <div className="container">
            <ul className="nav nav-pills nav-justified mt-3">
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === "products" ? "active" : ""}`} onClick={() => setActiveTab("products")}>Productos</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>Usuarios</a>
                </li>
            </ul>

            {activeTab === "products" && <ProductView />}
            {activeTab === "users" && <UserView />}
        </div>
    );
};

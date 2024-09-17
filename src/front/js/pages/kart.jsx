import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { EnvironmentPlugin } from "webpack";

export const Kart = () => {
    const { store, actions } = useContext(Context);
    const [PayPalButton, setPayPalButton] = useState(null);

    useEffect(() => {
        // Asegúrate de que el SDK de PayPal esté cargado
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=AZds00aWFN3sUQQbk6z17SS3f3VyOfpCEMLmOO9nZJfW4bo3ZGNeZXXvUVsndMak4XTKHYaXn-7VWfa3";

        script.addEventListener("load", () => {
            const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
            setPayPalButton(() => PayPalButton);
        });

        script.addEventListener("error", () => {
            console.error("Error al cargar el SDK de PayPal");
        });

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleQuantityChange = (productId, quantity) => {
        if (quantity > 0) {
            actions.updateKartQuantity(productId, quantity);
        }
    };

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "0.01",
                    },
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture();
    };

    return (
        <section className="h-100">
            <div className="container h-100 py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-10">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3 className="fw-normal mb-0">Shopping Cart</h3>
                        </div>
                        {store.kart.map((product, index) => (
                            <div key={index} className="card rounded-3 mb-4">
                                <div className="card-body p-4">
                                    <div className="row d-flex justify-content-between align-items-center">
                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                            <img src={product.image_url} className="img-fluid rounded-3" alt={product.generic_name} />
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                            <p className="lead fw-normal mb-2">{product.generic_name}</p>
                                            <p><span className="text-muted">Price: </span>${product.price}.00</p>
                                        </div>
                                        <div className="col-md-3 col-lg-2 col-xl-2 d-flex">
                                            <button className="btn btn-link px-2" onClick={() => handleQuantityChange(product.product_id, product.quantity - 1)}>
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <input type="number" min="1" value={product.quantity} onChange={(e) => handleQuantityChange(product.product_id, parseInt(e.target.value))} className="form-control form-control-sm" />
                                            <button className="btn btn-link px-2" onClick={() => handleQuantityChange(product.product_id, product.quantity + 1)}>
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                            <h5 className="mb-0">${product.price * product.quantity}.00</h5>
                                        </div>
                                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                            <button className="btn btn-danger" onClick={() => actions.removeFromKart(product.product_id)}>
                                                <i className="fas fa-trash fa-lg"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="card mb-4">
                            <div className="card-body p-4 d-flex flex-row">
                                <div data-mdb-input-init className="form-outline flex-fill">
                                    <input type="text" id="form1" className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="form1">Discount code</label>
                                </div>
                                <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-warning btn-lg ms-3">Apply</button>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                {PayPalButton && (
                                    <PayPalButton
                                        createOrder={(data, actions) => createOrder(data, actions)}
                                        onApprove={(data, actions) => onApprove(data, actions)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
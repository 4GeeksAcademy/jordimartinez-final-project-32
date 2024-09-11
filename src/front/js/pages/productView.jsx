import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const ProductView = () => {
    const { store } = useContext(Context);
    const { theid } = useParams();

    const [details, setDetails] = useState(null);

    const searchProduct = () => {
        let product = store.product.find((item) => item.product_id === parseInt(theid));
        setDetails(product);
    };

    useEffect(() => {
        searchProduct();
    }, [theid, store.product]);

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-5 mt-2">
                        
                            <img className="col-10" src={`${details.image_url}`}  alt={`${details.generic_name}`} />
                        
                    </div>
                    <div className="col-7 mt-5">
                        <h2 className="mb-3">{details.generic_name}</h2>
                        <p><strong>Ingrediente Activo:</strong> {details.active_ingredient}</p>
                        <p><strong>Categoría:</strong> {details.category_id}</p>
                        <p><strong>Precio:</strong> ${details.price}</p>
                        <p><strong>Cantidad en Stock:</strong> {details.stock_quantity}</p>
                        <p><strong>Descripción:</strong> {details.description}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

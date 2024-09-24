import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";

export const ProductView = () => {
    const { store, actions } = useContext(Context);
    const { theid } = useParams();

    const [details, setDetails] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);

    const searchProduct = () => {
        let product = store.product.find((item) => item.product_id === parseInt(theid));
        setDetails(product);
        if (product) {
            getSimilarProducts(product.category_id);
        }
    };

    const getSimilarProducts = (categoryId) => {
        let products = store.product.filter((item) => item.category_id === categoryId && item.product_id !== parseInt(theid));
        setSimilarProducts(products.sort(() => 0.5 - Math.random()).slice(0, 4));
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
                        <img className="col-10" src={`${details.image_url}`} alt={`${details.generic_name}`} />
                    </div>
                    <div className="col-7 mt-5">
                        <h2 className="mb-3">{details.generic_name}</h2>
                        <p><strong>Ingrediente Activo:</strong> {details.active_ingredient}</p>
                        {/* <p><strong>Categoría:</strong> {details.category_id}</p> */}
                        <p><strong>Precio:</strong> ${details.price}.00</p>
                        <p><strong>Cantidad en Stock:</strong> {details.stock_quantity}</p>
                        <p><strong>Descripción:</strong> {details.description}</p>
                        <button className="btn btn-success ms-5" onClick={() => actions.addToKart(details)}>
                            Agregar al carrito
                        </button>
                    </div>
                </div>
                <div className="row mt-5">
                    <h3>Productos similares</h3>
                    <div className="d-flex flex-row overflow-auto">
                        {similarProducts.map((product, index) => (
                            <div key={index} className="card mt-4 mx-2" style={{ minWidth: "200px" }}>
                                <img src={product.image_url} style={{ width: "80%", height: "200px", objectFit: "contain" }} className="card-img-top" alt={product.generic_name} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.generic_name}</h5>
                                    <p className="card-text col-5">${product.price}.00</p>
                                    <p className="card-text">{product.description}</p>
                                    <Link to={`/product/${product.product_id}`} className="btn btn-primary">Ver Producto</Link>
                                    <button className="btn btn-success ms-5" onClick={() => actions.addToKart(product)}>
                                        <i className="fas fa-shopping-cart"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};


import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const SearchResults = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container mt-5">
            <h2>Resultados de Búsqueda</h2>
            <div className="row">
                {store.search.map((product, index) => (
                    <div key={index} className="col-3">
                        <div className="card mt-4">
                            <img src={product.image_url} style={{ width:"80%", height:"200px", objectFit:"contain"}} className="card-img-top" alt={product.generic_name} />
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
                    </div>
                ))}
            </div>
        </div>
    );
};

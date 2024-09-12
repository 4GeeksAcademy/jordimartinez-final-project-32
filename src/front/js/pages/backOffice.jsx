import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

export const BackOffice = () => {
    const { store, actions } = useContext(Context);
    const { theid } = useParams();
    const [details, setDetails] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    const searchProduct = () => {
        let product = store.product.find((item) => item.product_id === parseInt(theid));
        setDetails(product);
    };

    useEffect(() => {
        searchProduct();
    }, [theid, store.product]);

    const filteredProducts = store.product.filter(product =>
        product.generic_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.active_ingredient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category_id.toString().includes(searchTerm)
    );

    const deleteProduct = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (confirmed) {
            const success = await actions.deleteProduct(id);
            if (success) {
                alert("Product deleted successfully");
                actions.getAllProducts();
            } else {
                alert("Error deleting product");
            }
        }
    };

    return (
        <>
            <div className="container">
                <div className="row mt-5 d-flex justify-content-between">
                    <form className="d-flex justify-content-center col-8 me-3" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="¿Qué estás buscando?"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-outline-success" type="submit">Buscar</button>
                    </form>
                    <Link className="col-3 ms-4 d-flex justify-content-end text-decoration-none" to={`/addproduct`}>
                        <button className="btn btn-outline-success">Agregar producto</button>
                    </Link>
                </div>
                
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre genérico</th>
                            <th scope="col">Ingrediente activo</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Edicion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product, index) => (
                            <tr key={product.product_id}>
                                <th scope="row">{index + 1}</th>
                                <td>{product.generic_name}</td>
                                <td>{product.active_ingredient}</td>
                                <td>{product.category_id}</td>
                                <td>{product.price}</td>
                                <td>{product.stock_quantity}</td>
                                <td>
                                    <div className="d-flex justify-content-evenly">
                                        <Link to={`/editproduct/${product.product_id}`}><i className="fas fa-pencil-alt right-icons me-2"></i></Link>
                                        <a onClick={() => deleteProduct(product.product_id)}><i className="fas fa-trash-alt right-icons"></i></a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const initialProduct = {
    generic_name: "",
    active_ingredient: "",
    category_id: "",
    price: "",
    stock: "",
    description: "",
    image: ""
};

export const AddProduct = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [product, setProduct] = useState(initialProduct);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (product.generic_name.trim() !== "" && product.active_ingredient.trim() !== "" && product.category_id.trim() !== "" && product.price.trim() !== "" && product.stock.trim() !== "" && product.description.trim() !== "") {
                let response = await actions.addProduct(product);

                if (response) {
                    setProduct(initialProduct);
                    Swal.fire({
                        text: "Product Added",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        text: "Error at saving new product",
                        icon: "error"
                    });
                }
            } else {
                Swal.fire({
                    text: "All parameters are needed",
                    icon: "error"
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <form className="row needs-validation" onSubmit={handleSubmit}>
                <h3 className="d-flex justify-content-center mt-5 mb-5">
                    Agregar productos    
                </h3>

                <div className="mb-3 col-6">
                    <label htmlFor="genericName" className="form-label">Nombre genérico</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="genericName" 
                        name="generic_name"
                        value={product.generic_name}
                        onChange={handleChange}
                        aria-describedby="inputGroupPrepend" 
                        required 
                    />
                    <div className="invalid-feedback">
                        Debe tener un nombre.
                    </div>
                </div>

                <div className="mb-3 col-6">
                    <label htmlFor="active_ingredient" className="form-label">Ingrediente activo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="active_ingredient"                         
                        name="active_ingredient"                        
                        value={product.active_ingredient}
                        onChange={handleChange}
                        aria-describedby="inputGroupPrepend" 
                        required 
                    />
                    <div className="invalid-feedback">
                        Debe tener un nombre.
                    </div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="category_id" className="form-label">Categoría</label>
                    <select 
                        className="form-select" 
                        id="category_id" 
                        name="category_id"                        
                        // value={product.category_id}
                        onChange={handleChange}
                        required
                    >
                        <option selected disabled value="">Categorías</option>
                        <option value="1">Analgésico</option>
                        <option value="2">Antibiótico</option>
                        <option>Dermatológico y cosmético</option>
                        <option>Nutrición/suplementos</option>
                        <option>Pediátrico</option>
                        <option>Primeros auxilios</option>
                        <option>Salud digestiva</option>
                        <option>Tratamientos</option>
                        <option>Vitaminas</option>
                        <option>1</option>
                    </select>
                    <div className="invalid-feedback">
                        Please select a valid state.
                    </div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="precio" className="form-label">Precio</label>
                    <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">$</span>
                        <input 
                            type="number" 
                            className="form-control" 
                            pattern="(\d)([\.])(\d{2})" 
                            id="precio" 
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            aria-describedby="inputGroupPrepend" 
                            required
                        />
                        <div className="invalid-feedback">
                            Debes agregar un precio.
                        </div>
                    </div>
                </div>

                <div className="mb-3 col-4">
                    <label htmlFor="stockquantity" className="form-label">Cantidad en stock</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="stockquantity" 
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        aria-describedby="inputGroupPrepend" 
                        required 
                    />
                    <div className="invalid-feedback">
                        Debe tener un nombre.
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Descripción</label>
                    <textarea 
                        className="form-control" 
                        id="exampleFormControlTextarea1" 
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        rows="3" 
                        required
                    ></textarea>
                    <div className="invalid-feedback">
                        Debes agregar descripción.
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Seleccionar imagen</label>
                    <input 
                        className="form-control" 
                        type="file" 
                        name="image"     
                        id="formFile"
                        onChange={handleChange}
                    />
                </div>

                <div className="col-6">
                    <button className="btn btn-primary" type="submit">Agregar producto</button>
                </div>

                <div className="col-6">
                    <Link className="ms-4 d-flex justify-content-end text-decoration-none" to={`/backoffice`}>
                        <button className="btn btn-outline-success">Regresar al back office</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};
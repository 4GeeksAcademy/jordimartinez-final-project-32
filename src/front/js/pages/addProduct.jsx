import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, redirect, useParams, useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'


const initialProduct = {
    generic: "",
    activeingredient: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: ""

    
};

export const AddProduct = () => {
    
    const { store, actions } = useContext(Context)
    const params = useParams()
    const [product, setProduct] = useState(initialProduct);

    const handleSubmit = async () => {
        try {
            if (product.generic.trim() !== "" && product.activeingredient.trim() !== "" && product.category.trim() !== "" && product.price.trim() !== "" && product.stock.trim() !== "" && product.description.trim() !== "") {

                let response = await actions.addProduct(product)

                if (response) {
                    setProduct(initialProduct)
                    // alert("Contact Added")
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
            }
            
            else {
                // alert("Error at saving de new contact")

                Swal.fire({
                    text: "All paramaters are needed",
                    icon: "error"
                });
            }
        }
        catch (error) {
            console.log(error)
        }

    }



    return (
        <div className="container">
            <form className="row needs-validation">
                <h3 className="d-flex justify-content-center mt-5 mb-5">
                    Agregar productos    
                </h3>

                <div className="mb-3 col-6">
                    <label htmlFor="genericName" className="form-label">Nombre genérico</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="genericName" 
                        name="generic"
                        value={product?.generic}
                        aria-describedby="inputGroupPrepend" 
                        required 
                    />
                    <div className="invalid-feedback">
                        Debe tener un nombre.
                    </div>
                </div>

                <div className="mb-3 col-6">
                    <label htmlFor="activeIngredient" className="form-label">Ingrediente activo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="activeIngredient"                         
                        name="activeingredient"                        
                        value={product?.activeingredient}
                        aria-describedby="inputGroupPrepend" 
                        required 
                    />
                    <div className="invalid-feedback">
                        Debe tener un nombre.
                    </div>
                </div>

                <div className="col-md-4">
                    <label 
                        for="category" 
                        className="form-label">
                            Categoría
                    </label>
                    <select 
                        className="form-select" 
                        id="category" 
                        name="category"                        
                        value={product?.category}
                        required
                    >
                        <option selected disabled value="">Categorías</option>
                        <option>Analgésico</option>
                        <option>Antibiótico</option>
                        <option>Dermatológico y cosmético</option>
                        <option>Nutrición/suplementos</option>
                        <option>Pediátrico</option>
                        <option>Primeros auxilios</option>
                        <option>Salud digestiva</option>
                        <option>Tratamientos</option>
                        <option>Vitaminas</option>
                    </select>
                    <div className="invalid-feedback">
                    Please select a valid state.
                    </div>
                </div>

                <div className="col-md-4">
                    <label for="precio" className="form-label">Precio</label>
                    <div className="input-group has-validation">
                    <span className="input-group-text" id="inputGroupPrepend">$</span>
                    <input 
                        type="number" 
                        className="form-control" 
                        pattern="(\d)([\.])(\d{2})" 
                        id="precio" 
                        name="price"
                        value={product?.price}
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
                        aria-describedby="inputGroupPrepend" 
                        name="stock"
                        value={product?.stock}
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
                        value={product?.description}
                        rows="3" 
                        required>
                    </textarea>
                    <div className="invalid-feedback">
                        Debes agregar descripción.
                    </div>
                </div>

                <div class="mb-3">
                    <label for="formFile" className="form-label">Seleccionar imagen</label>
                    <input 
                        className="form-control" 
                        type="file" 
                        name="image" 
                        id="formFile"
                    />
                </div>

                <div className="col-6">
                    <button className="btn btn-primary" type="submit">Agregar producto</button>
                </div>

                <div className="col-6">
                    <Link className="ms-4 d-flex justify-content-end" to={`/backoffice`}>
                        <button className="btn btn-outline-success" >Regresar al back office</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

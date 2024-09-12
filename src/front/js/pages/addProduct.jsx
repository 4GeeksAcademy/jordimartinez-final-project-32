// import React, { useState, useContext, useEffect } from "react";
// import { Context } from "../store/appContext";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';

// const initialProduct = {
//     generic_name: "",
//     active_ingredient: "",
//     category_id: "",
//     price: "",
//     stock: "",
//     description: "",
//     image: ""
// };

// export const AddProduct = () => {
//     const { store, actions } = useContext(Context);
//     const params = useParams();
//     const navigate = useNavigate();
//     const [product, setProduct] = useState(initialProduct);

//     useEffect(() => {
//         if (params.id) {
//             const existingProduct = store.product.find((item) => item.product_id === parseInt(params.id));
//             if (existingProduct) {
//                 setProduct(existingProduct);
//             }
//         }
//     }, [params.id, store.product]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setProduct({
//             ...product,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (product.generic_name.trim() !== "" && product.active_ingredient.trim() !== "" && product.category_id.trim() !== "" && product.price.trim() !== "" && product.stock.trim() !== "" && product.description.trim() !== "") {
                
//                 const formData = new FormData();
//                 formData.append("generic_name", product.generic_name);
//                 formData.append("active_ingredient", product.active_ingredient);
//                 formData.append("category_id", product.category_id);
//                 formData.append("price", product.price);
//                 formData.append("stock", product.stock);
//                 formData.append("description", product.description);
//                 formData.append("image", product.image);

//                 let response;
//                 if (params.id) {
//                     response = await actions.updateProduct(formData, params.id);
//                 } else {
//                     response = await actions.addProduct(formData);
//                 }

//                 if (response) {
//                     setProduct(initialProduct);
//                     Swal.fire({
//                         text: params.id ? "Product Updated" : "Product Added",
//                         icon: "success"
//                     }).then(() => { navigate("/backoffice"); });
//                 } else {
//                     Swal.fire({
//                         text: "Error at saving product",
//                         icon: "error"
//                     });
//                 }
//             } else {
//                 Swal.fire({
//                     text: "All parameters are needed",
//                     icon: "error"
//                 });
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <div className="container">
//             <form className="row needs-validation" onSubmit={handleSubmit}>
//                 <h3 className="d-flex justify-content-center mt-5 mb-5">
//                     {params.id ? "Editar producto" : "Agregar productos"}
//                 </h3>

//                 <div className="mb-3 col-6">
//                     <label htmlFor="genericName" className="form-label">Nombre genérico</label>
//                     <input 
//                         type="text" 
//                         className="form-control" 
//                         id="genericName" 
//                         name="generic_name"
//                         value={product.generic_name}
//                         onChange={handleChange}
//                         aria-describedby="inputGroupPrepend" 
//                         required 
//                     />
//                     <div className="invalid-feedback">
//                         Debe tener un nombre.
//                     </div>
//                 </div>

//                 <div className="mb-3 col-6">
//                     <label htmlFor="active_ingredient" className="form-label">Ingrediente activo</label>
//                     <input 
//                         type="text" 
//                         className="form-control" 
//                         id="active_ingredient"                         
//                         name="active_ingredient"                        
//                         value={product.active_ingredient}
//                         onChange={handleChange}
//                         aria-describedby="inputGroupPrepend" 
//                         required 
//                     />
//                     <div className="invalid-feedback">
//                         Debe tener un nombre.
//                     </div>
//                 </div>

//                 <div className="col-md-4">
//                     <label htmlFor="category_id" className="form-label">Categoría</label>
//                     <select 
//                         className="form-select" 
//                         id="category_id" 
//                         name="category_id"                        
//                         value={product.category_id}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option selected disabled value="">Categorías</option>
//                         <option value="1">Analgésico</option>
//                         <option value="2">Antibiótico</option>
//                         <option value="3">Dermatológico y cosmético</option>
//                         <option value="4">Nutrición/suplementos</option>
//                         <option value="5">Pediátrico</option>
//                         <option value="6">Primeros auxilios</option>
//                         <option value="7">Salud digestiva</option>
//                         <option value="8">Tratamientos</option>
//                         <option value="9">Vitaminas</option>
//                     </select>
//                     <div className="invalid-feedback">
//                         Please select a valid state.
//                     </div>
//                 </div>

//                 <div className="col-md-4">
//                     <label htmlFor="precio" className="form-label">Precio</label>
//                     <div className="input-group has-validation">
//                         <span className="input-group-text" id="inputGroupPrepend">$</span>
//                         <input 
//                             type="number" 
//                             className="form-control" 
//                             pattern="(\d)([\.])(\d{2})" 
//                             id="precio" 
//                             name="price"
//                             value={product.price}
//                             onChange={handleChange}
//                             aria-describedby="inputGroupPrepend" 
//                             required
//                         />
//                         <div className="invalid-feedback">
//                             Debes agregar un precio.
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mb-3 col-4">
//                     <label htmlFor="stockquantity" className="form-label">Cantidad en stock</label>
//                     <input 
//                         type="number" 
//                         className="form-control" 
//                         id="stockquantity" 
//                         name="stock"
//                         value={product.stock}
//                         onChange={handleChange}
//                         aria-describedby="inputGroupPrepend" 
//                         required 
//                     />
//                     <div className="invalid-feedback">
//                         Debe tener un nombre.
//                     </div>
//                 </div>

//                 <div className="mb-3">
//                     <label htmlFor="exampleFormControlTextarea1" className="form-label">Descripción</label>
//                     <textarea 
//                         className="form-control" 
//                         id="exampleFormControlTextarea1" 
//                         name="description"
//                         value={product.description}
//                         onChange={handleChange}
//                         rows="3" 
//                         required
//                     ></textarea>
//                     <div className="invalid-feedback">
//                         Debes agregar descripción.
//                     </div>
//                 </div>

//                 <div className="mb-3">
//                     <label htmlFor="formFile" className="form-label">Seleccionar imagen</label>
//                     <input 
//                         className="form-control" 
//                         type="file" 
//                         name="image"     
//                         id="formFile"
//                         onChange={(event)=>{
//                             setProduct({...product, image:event.target.files[0]})
//                         }}
//                     />
//                 </div>

//                 <div className="col-6">
//                     <button className="btn btn-primary" type="submit">{params.id ? "Actualizar producto" : "Agregar producto"}</button>
//                 </div>

//                 <div className="col-6">
//                     <Link className="ms-4 d-flex justify-content-end text-decoration-none" to={`/backoffice`}>
//                         <button className="btn btn-outline-success">Regresar al back office</button>
//                     </Link>
//                 </div>
//             </form>
//         </div>
//     );
// };



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
                
                const formData = new FormData()
                formData.append("generic_name", product.generic_name)
                formData.append("active_ingredient", product.active_ingredient)
                formData.append("category_id", product.category_id)
                formData.append("price", product.price)
                formData.append("stock", product.stock)
                formData.append("description", product.description)
                formData.append("image", product.image)
                
                
                let response = await actions.addProduct(formData);

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
                        <option value="3">Dermatológico y cosmético</option>
                        <option value="4">Nutrición/suplementos</option>
                        <option value="5">Pediátrico</option>
                        <option value="6">Primeros auxilios</option>
                        <option value="7">Salud digestiva</option>
                        <option value="8">Tratamientos</option>
                        <option value="9">Vitaminas</option>
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
                        onChange={(event)=>{
                            setProduct({...product, image:event.target.files[0]})
                        }}
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
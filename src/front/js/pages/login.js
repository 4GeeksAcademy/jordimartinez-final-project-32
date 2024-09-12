import React from "react";
import login from "../pages/login.js"
import { Link } from "react-router-dom";

export const Login = () => {
    return (
        
        <div className="dropdown-item">
        <form className="px-4 py-3">
            <div className="mb-3">
                <label for="exampleDropdownFormEmail1" className="form-label">Dirección Email:</label>
                <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com"/>
            </div>
            <div className="mb-3">
                <label for="exampleDropdownFormPassword1" className="form-label">Contraseña:</label>
                <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password"/>
            </div>
            <div className="mb-3">
            <div class="form-check">
                <input type="checkbox" className="form-check-input" id="dropdownCheck"/>
                <label className="form-check-label" for="dropdownCheck">
                Recordar información
                </label>
            </div>
            </div>
            <button type="submit" className="btn btn-success">Ingresar</button>
        </form>
        <div className="dropdown-divider"></div>   
            <div className="col-12 col-md-6 d-flex justify-content-between my-1">   
            
               <Link to={"/register"}>Registrate</Link> 
               <Link to={"/resetpass.js"}>Recuperar contraseña</Link>
               <Link to={"/home.js"}>Regresar</Link>
                           
            </div>
            <button type="button" class="btn-close" aria-label="Close"> </button>
        </div>
        

       
    )
}
    
     
        



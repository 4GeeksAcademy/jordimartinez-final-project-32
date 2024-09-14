import React from "react";
import login from "../pages/login.js"
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { useContext, useState } from "react";

const inicialState = {
    email:"",
    password:"",
}

export const Login = () =>{
    const {actions} = useContext(Context)
    const [user, setUser]=useState(initialState)
    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await actions.login(user)
            console.log(response)
        } 
        catch(error){
            console.log(error)
        }
    }

    return (
        
        <div className="dropdown-item">
            
            <div className="row justify-content-center">
                <h2 className="text-center my-3">Bienvenido ingresa tu usuario aqui</h2>
            </div> 

            <form onSubmit = {handleSubmit} className="form-group px-4 py-3">                

                <div className="form-group mb-3">
                    <label for="txtemail" className="form-label">Dirección Email:</label>
                    <input type="email" 
                        className="form-control" 
                        id="txtemail" 
                        placeholder="email@example.com"
                        name="email"
                        value={user.mail}
                        onChange={handleChange}
                        />
                </div>

                <div className="mb-3">
                    <label for="exampleDropdownFormPassword1" className="form-label">Contraseña:</label>
                    <input type="password" 
                        className="form-control" 
                        id="txtpassword"
                        placeholder="xxx@xxx.com"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        />
                </div>

                <div className="mb-3">
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="dropdownCheck"/>
                    <label className="form-check-label" for="dropdownCheck">
                    Recordar información
                    </label>
                </div>
                </div>
                <button type="submit" className="btn btn-success">Ingresar</button>
                
            </form>
                    <div className="dropdown-divider">   
                        <div className="col-12 col-md-6 d-flex justify-content-between center my-1">   
                        
                        <Link to={"/register"}>Registrate</Link> 
                        <Link to={"/resetpass"}>Recuperar contraseña</Link>
                        <Link to={"/home"}>Regresar</Link>
                                    
                        </div>
                    </div>
        </div>
        

       
    )
}
    
     
        



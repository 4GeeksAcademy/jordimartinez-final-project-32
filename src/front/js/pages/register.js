import React, { useContext, useState } from "react";
import register from "../pages/register.js"
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

const inicialState = {
    name: "",
    email: "",
    password: "",
}

export const Register = () => {
    const {actions} = useContext (Context)
    const {user, setUser} = useState (inicialState)
    const handleChange = ({target}) => {
        setUser({...user,
            [targe.name]:target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData();

        formData.append("name", user.name)
        formData.append("email", user.email)
        formData.append("password", user.password)

        console.log(formData)
        const response = actions.register(formData)

        response.then((res) =>{
            if(res == 201){
                setUser(initialState)
                alert("Registro exitoso")}
            else if (res == 400) {
                alert("Usuario registrado, inicie sesion")}
            else{alert("Error en registro, si persiste el error comuniquese al correo de la empresa")}

        })
    }

    return (   

        <div className="dropdown-item">
            <div className="row justify-content-center">
                <h2 className="text-center my-3">Crea una Cuenta Aqui</h2>
            </div>      

            <form onSubmit = {handleSubmit} className="row g-3">

                <div className="input-group mb-3">
                    <span className="input-group-text" id="txtname">Nombre y Apellido</span>
                    <input type="text" 
                        className="form-control" 
                        placeholder="Full name"
                        name="name"
                        //value={user.name} 
                        aria-label="Nombre completo" 
                        aria-describedby="basic-addon1"
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="txtaddress">Direccion:</span>
                    <input type="text" 
                        className="form-control" 
                        placeholder="address" 
                        name="address"
                        //value="{user.address}
                        aria-label="address" 
                        aria-describedby="basic-addon1"
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-4">
                    <label for="txtdni" className="form-label">DNI</label>
                    <input type="text"
                        placeholder="0000000000"
                        className="form-control" 
                        id="textadni" 
                        //value={user.dni}
                        name="dni"
                        onChange={handleChange}
                    />
                </div>
                
                <div className="input-group mb-3">
                    <span className="input-group-text" id="txttelephone">Telefono:</span>
                    <input type="text" 
                        className="form-control" 
                        placeholder="04145556688" 
                        name="telephone"
                        //value={user.telephone}
                        aria-label="Telefono" 
                        aria-describedby="basic-addon1"
                        oonChange={handleChange}/>
                </div>
                
                <div class="row g-3 align-items-center">
                    <div className="col-mb-4">
                        <label for="textemail" className="form-label">Correo electrónico</label>
                        <input type="email" 
                            placeholder="xxx@xxx.com"
                            className="form-control" 
                            id="txtemail" 
                            name="email"
                            //value:{user.email}
                            aria-describedby="emailHelp"
                            onChange={handleChange}                            
                            />
                        <div id="emailHelp" className="form-text">
                            Nunca compartiremos su correo electrónico con nadie más.
                        </div>
                    </div>
                </div>

                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="inputPassword6" class="col-form-label">Contraseña</label>
                    </div>
                    <div class="col-auto">
                        <input type="password" 
                            placeholder=""
                            id="inputPassword6" 
                            class="form-control" 
                            name="password"
                            //value=user.password}
                            aria-describedby="passwordHelpInline"
                            onChange={handleChange}
                            />
                    </div>
                    <div class="col-auto">
                        <span id="passwordHelpInline" class="form-text">
                        Tu contraseña debe tener entre 8 y 20 caracteres, contener letras y números, y no debe contener espacios, caracteres especiales ni emoji.
                        </span>
                    </div>
                </div>
                
                <div class="col-12">
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required/>
                    <label class="form-check-label" for="invalidCheck2">
                        Acepta los términos y condiciones
                    </label>
                    </div>
                </div>
                <div class="col-12">
                    <button class="btn btn-success" type="submit">Enviar formulario</button>
                </div>
            </form>


            <div className="dropdown-divider"></div>   
            <div className="col-12 col-md-6 d-flex justify-content-between center my-1">   
                                       
               <Link to={"/home"}>Regresar</Link>
               <Link to={"/login"}>Ya tengo una cuenta</Link>
                           
            </div>

        </div>     
        
        
    )
}

export default Register




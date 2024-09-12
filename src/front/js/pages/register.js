import React from "react";
import register from "./register.js"

export const Register = () => {
    return (

        
        <div className="dropdown-item">
            <div className="row justify-content-center">
                <h2 className="text-center my-3">Crear cuenta:</h2>
                <div className="col-12 col-md-6 border py-4">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group mb-3">
                            <label htmlFor="txtname">Nombre completo:</label>
                            <input
                                type="text"
                                placeholder="Jhon Doe"
                                className="form-control"
                                id="txtname"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="txtname">Direccion:</label>
                            <input
                                type="text"
                                placeholder="direccion"
                                className="form-control"
                                id="txtaddress"
                                name="address"
                                value={user.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="txttelephone">Telefono:</label>
                            <input
                                type="text"
                                placeholder="0212-5556688"
                                className="form-control"
                                id="txttelephone"
                                name="telephone"
                                value={user.telephone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="txtEmail">Correo:</label>
                            <input
                                type="text"
                                placeholder="elmero@gmail.com"
                                className="form-control"
                                id="txtEmail"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>                        

                        <div className="form-group mb-3">
                            <label htmlFor="btnPassword">Contraseña:</label>
                            <input
                                type="password"
                                placeholder="elmero@gmail.com"
                                className="form-control"
                                id="btnPassword"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="txtbirthday">Correo:</label>
                            <input
                                type="text"
                                placeholder="03/11/1960"
                                className="form-control"
                                id="txtbirthday"
                                name="birthday"
                                value={user.birthday}
                                onChange={handleChange}
                            />
                        </div> 

                        <button className="btn btn-outline-primary w-100">Iniciar Sesión</button>
                    </form>
                </div>

                <div className="w-100"></div>

              

                <div className="col-12 col-md-6 d-flex justify-content-between my-1">
                    <Link to={"/login"}>Ya tengo una cuenta</Link>

                </div>
            </div>
        </div>
        
    )
}






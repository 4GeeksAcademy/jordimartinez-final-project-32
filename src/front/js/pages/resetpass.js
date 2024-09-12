import React from "react";
import Resetpass from "./resetpass.js"

export const ResetPass = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <h2 className="text-center my-3"> Recuperar la Contraseña:</h2>
                <div className="col-12 col-md-6 border py-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="btnEmail">Correo:</label>
                            <input
                                type="text"
                                placeholder="correo@gmail.com"
                                className="form-control"
                                id="btnEmail"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </div>

                        <button className="btn btn-outline-primary w-100">Enviar</button>
                    </form>
                </div>

                <div className="w-100"></div>

              
            </div>
        </div>
    )
}
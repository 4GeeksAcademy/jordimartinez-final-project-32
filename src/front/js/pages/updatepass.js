import React from "react"
import {UpdatePassword} from "./updatepass.js"

export const Login = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <h2 className="text-center my-3"> Actualizar contraseña:</h2>
                <div className="col-12 col-md-6 border py-4">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group mb-3">
                            <label htmlFor="btnEmail">Correo:</label>
                            <input
                                type="text"
                                placeholder="new password"
                                className="form-control"
                                id="btnEmail"
                                name="password"
                                value={newPass}
                                onChange={(event) => setNewPass(event.target.value)}
                            />
                        </div>

                        <button className="btn btn-outline-primary w-100">Enviar</button>
                    </form>
                </div>

               

               
            </div>
        </div>
    )
}
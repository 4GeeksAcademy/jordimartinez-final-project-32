import React, { useState, useContext } from "react";
import { Context } from "../store/appContext"

export const RequestPassword = () => {
    const { actions } = useContext(Context)
    const [email, setEmail] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.BACKEND_URL}/api/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            }),
        });
        console.log(response)
        // console.log("Respuesta:", response);
        const responseData = await response.json();
        console.log(responseData)
    };

    return (
        <div className="profile-container">
            <h1 className="profile-title">Reestablecimiento Contraseña</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <label htmlFor="email"><strong>Email:</strong></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="button-container">
                    <button type="submit">Enviar Contraseña</button>
                </div>
            </form>
        </div>
    );
};
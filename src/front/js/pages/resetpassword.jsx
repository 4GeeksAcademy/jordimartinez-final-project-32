import React, { useState, useContext } from "react";
import { useSearchParams } from "react-router-dom"
import { Context } from "../store/appContext"
import Swal from "sweetalert2";

export const ResetPassword = () => {
    const { actions } = useContext(Context)
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [searchParams, _] = useSearchParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            Swal.fire("Error", "Las nuevas contraseñas no coinciden", "error");
            return;
        }

        const response = actions.resetPassword(searchParams.get("token"), newPass)
        console.log("Respuesta:", response);

        const responseData = await response.json();
        console.log("Respuesta del servidor:", responseData);

        if (response.ok) {
            Swal.fire("Éxito", "Contraseña actualizada correctamente", "success");
            setNewPassword("");
            setConfirmPassword("");
        } else {
            console.log("Código de estado:", response.status);
            if (response.status === 400) {
                Swal.fire("Error", "La contraseña actual es incorrecta", "error");
            } else {
                const errorMessage = responseData.message || "Hubo un problema al actualizar la contraseña";
                Swal.fire("Error", errorMessage, "error");
            }
        }
    };
    
    return (
        <div className="profile-container">
            <h1 className="profile-title">Cambiar Contraseña</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <label htmlFor="new-password"><strong>Nueva Contraseña:</strong></label>
                    <input
                        type="password"
                        id="new-password"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-container">
                    <label htmlFor="confirm-password"><strong>Confirmar Nueva Contraseña:</strong></label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="button-container">
                    <button type="submit">Guardar Cambios</button>
                </div>
            </form>
        </div>
    );
};
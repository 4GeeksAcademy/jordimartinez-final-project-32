import React, { useState } from "react";
import Swal from "sweetalert2";

export const UpdatePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            Swal.fire("Error", "Las nuevas contraseñas no coinciden", "error");
            return;
        }

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/user/update-password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    current_password: currentPassword,
                    password: newPassword,
                }),
            });

            console.log("Respuesta:", response);

            const responseData = await response.json();

            console.log("Respuesta del servidor:", responseData);

            if (response.ok) {
                Swal.fire("Éxito", "Contraseña actualizada correctamente", "success");
                setCurrentPassword("");
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
        } catch (error) {
            console.error("Error de conexión:", error);
            Swal.fire("Error", "Hubo un problema al conectar con el servidor", "error");
        }
    };
    
    return (
        <div className="profile-container">
            <h1 className="profile-title">Cambiar Contraseña</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <label htmlFor="current-password"><strong>Contraseña Actual:</strong></label>
                    <input
                        type="password"
                        id="current-password"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>
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
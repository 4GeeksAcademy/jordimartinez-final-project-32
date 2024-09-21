import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";

export const EditUser = () => {
    const { store, actions } = useContext(Context);
    const [user, setUser] = useState({
        name: "",
        email: "",
        rol: "",
        status: ""
    });
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await actions.getUserById(userId);
            if (userData) {
                setUser(userData);
            }
        };
        fetchUser();
    }, [userId, actions]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.putUser(userId, user);
        if (success) {
            alert("Usuario actualizado con éxito");
            navigate("/backoffice");
        } else {
            alert("Error al actualizar el usuario");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Editar Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="rol" className="form-label">Rol</label>
                    <select
                        className="form-select"
                        id="rol"
                        name="rol"
                        value={user.rol}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona un rol</option>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                        <option value="CLIENT">Client</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Estado</label>
                    <select
                        className="form-select"
                        id="status"
                        name="status"
                        value={user.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona un estado</option>
                        <option value="ACTIVE">Activo</option>
                        <option value="INACTIVE">Inactivo</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
};
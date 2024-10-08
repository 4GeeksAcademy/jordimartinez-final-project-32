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
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false); 

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await actions.getUserById(userId);
                if (userData) {
                    setUser(userData);
                } else {
                    alert("Error al obtener los datos del usuario.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                alert("Ocurrió un error al cargar el usuario.");
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUser();
        } else {
            alert("ID de usuario inválido.");
            navigate("/backoffice");
        }
    }, [userId, actions, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const success = await actions.updateUser(userId, user);

        if (success) {
            alert("Usuario actualizado con éxito");
            navigate("/backoffice");
        } else {
            alert("Error al actualizar el usuario");
        }
        setSaving(false);
    };
    
    if (loading) {
        return <div>Cargando datos del usuario...</div>;
    }

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
                        <option value="Admin">Admin</option>
                        <option value="Seller">Seller</option>
                        <option value="Client">Client</option>
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
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Banned">Banned</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? "Guardando..." : "Guardar Cambios"}
                </button>
            </form>
        </div>
    );
};


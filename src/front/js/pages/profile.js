import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const { user } = store;
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        telephone: "",
        address: "",
        birthday: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                telephone: user.telephone || "",
                address: user.address || "",
                birthday: user.birthday || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = await actions.updateUser(formData);
        if (updatedUser) {
            setFormData(updatedUser);
        }
        setIsEditing(false);
    };

    return (
        <>
            {store.token ? (
                <div className="profile-container">
                    <h1>Perfil de Usuario</h1>
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="form-container">
                                <div className="info-item">
                                    <strong>Nombre:</strong>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                                </div>
                                <div className="info-item">
                                    <strong>Teléfono:</strong>
                                    <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} />
                                </div>
                                <div className="info-item">
                                    <strong>Dirección:</strong>
                                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                                </div>
                                <div className="info-item">
                                    <strong>Fecha de nacimiento:</strong>
                                    <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} />
                                </div>
                            <button type="submit">Guardar Cambios</button>
                        </form>
                    ) : (
                        <div className="user-info">
                            <div className="info-item1">
                                <strong>Nombre:</strong>
                                <span>{user?.name}</span>
                            </div>
                            <div className="info-item2">
                                <strong>Email:</strong>
                                <span>{user?.email}</span>
                            </div>
                            <div className="info-item3">
                                <strong>Teléfono:</strong>
                                <span>{user?.telephone}</span>
                            </div>
                            <div className="info-item4">
                                <strong>Dirección:</strong>
                                <span>{user?.address}</span>
                            </div>
                            <div className="info-item5">
                                <strong>Fecha de nacimiento:</strong>
                                <span>{user?.birthday}</span>
                            </div>
                            <button onClick={() => setIsEditing(true)}>Modificar perfil</button>    
                        </div>
                    )}
                </div>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
};
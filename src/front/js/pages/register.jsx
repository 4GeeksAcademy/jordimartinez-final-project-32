import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import Swal from 'sweetalert2';

const initialState = {
    name: "",
    document_number: "",
    address: "",
    telephone: "",
    email: "",
    password: "",
    birthday: "",
    avatar: null,
    rol: "CLIENT",  
    status: "ACTIVE"
};

export const Register = () => {
    const { actions } = useContext(Context);
    const [user, setUser] = useState(initialState);

    const handleChange = ({ target }) => {
        const value = target.name === "avatar" ? target.files[0] : target.value;
        setUser({
            ...user,
            [target.name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("document_number", user.document_number);
        formData.append("address", user.address);
        formData.append("telephone", user.telephone);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("birthday", user.birthday);
        formData.append("rol", "CLIENT");
        formData.append("status", "ACTIVE");

        try {
            const response = await actions.registerUser(formData);
            if (response) {
                setUser(initialState);
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro exitoso!',
                    text: 'Usuario registrado correctamente.',
                });
            } else if (response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El usuario ya existe.',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al registrar el usuario, si el problema persiste comuníquese con el administrador de la web.',
                });
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al registrar el usuario.',
            });
        }
    };

    return (
        <section className="vh-100 bg-secondary">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12">
                            <div className="card" style={{ borderRadius: "15px" }}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Crear una cuenta</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-outline mb-4">
                                            <input type="text" id="form3Example1cg" className="form-control form-control-lg" name="name" value={user.name} onChange={handleChange} required />
                                            <label className="form-label" htmlFor="form3Example1cg">Nombre</label>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="text" id="form3Example2cg" className="form-control form-control-lg" name="document_number" value={user.document_number} onChange={handleChange} required />
                                            <label className="form-label" htmlFor="form3Example2cg">Número de Documento</label>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="text" id="form3Example3cg" className="form-control form-control-lg" name="address" value={user.address} onChange={handleChange} required />
                                            <label className="form-label" htmlFor="form3Example3cg">Dirección</label>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="text" id="form3Example4cg" className="form-control form-control-lg" name="telephone" value={user.telephone} onChange={handleChange} required />
                                            <label className="form-label" htmlFor="form3Example4cg">Teléfono</label>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="email" id="form3Example5cg" className="form-control form-control-lg" name="email" value={user.email} onChange={handleChange} required />
                                            <label className="form-label" htmlFor="form3Example5cg">Correo Electrónico</label>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="password" id="form3Example6cg" className="form-control form-control-lg" name="password" value={user.password} onChange={handleChange} required />
                                            <label className="form-label" htmlFor="form3Example6cg">Contraseña</label>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="date" id="form3Example7cg" className="form-control form-control-lg" name="birthday" value={user.birthday} onChange={handleChange} required />
                                            <label className="form-label" htmlFor="form3Example7cg">Fecha de Nacimiento</label>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Registrar</button>
                                        </div>
                                        <p className="text-center text-muted mt-5 mb-0">¿Ya tienes una cuenta? <a href="/login" className="fw-bold text-body"><u>Inicia sesión aquí</u></a></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import Swal from 'sweetalert2';

export const Login = () => {
    const { actions } = useContext(Context);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.loginUser(formData);
        if (success) {
            
           
            Swal.fire({
                icon: 'success',
                title: '¡Inicio de sesión!',
                text: 'Inicio de sesión exitoso.',
            });
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al iniciar sesión',
            });
        }
    };

    return (
        <section className="vh-100 bg-tertiary">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: "15px" }}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Iniciar Sesión</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-outline mb-4">
                                            <input type="email" id="form3Example1cg" className="form-control form-control-lg" name="email" value={formData.email} onChange={handleChange} required />
                                            <label className="form-label" htmlFor="form3Example1cg">Correo Electrónico</label>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="password" id="form3Example2cg" className="form-control form-control-lg" name="password" value={formData.password} onChange={handleChange} required />
                                            <label className="form-label" htmlFor="form3Example2cg">Contraseña</label>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4">Iniciar Sesión</button>
                                        </div>
                                        <p className="text-center text-muted mt-5 mb-0">¿No tienes una cuenta? <a href="/register" className="fw-bold text-body"><u>Regístrate aquí</u></a></p>
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


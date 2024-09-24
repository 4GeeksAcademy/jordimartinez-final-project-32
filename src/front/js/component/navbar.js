import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        actions.searchProduct(searchTerm);
        navigate("/search-results");
    };

    const handleLogout = () => {
        actions.logoutUser();
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5" style={{ backgroundColor: '#e3f2fd', position: 'fixed', top: '0', width: '100%', zIndex: '1000' }}>
            <div className="container-fluid">
                <Link className="col-2 ms-3 me-2" to="/">
                    <img className="Navbar-img col-12" src="https://res.cloudinary.com/dekagxdn6/image/upload/v1725554341/logo2_prop_x8ucmr.png" alt="Logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown me-1">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Productos
                            </a>
                            <ul className="dropdown-menu dropdown-start">
                                {store.category.map((item, index) => (
                                    <li key={index}>
                                        <Link className="dropdown-item" to={`category/${item.category_id}`}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>

                    <form className="d-flex justify-content-center col-5 me-3" role="search" onSubmit={handleSearch}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="¿Qué estás buscando?"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-outline-success" type="submit">Buscar</button>
                    </form>


                    <div className="col-3 d-flex center align-items-center">
                        <i className="fas fa-user-circle fa-xl me-2"></i>
                        {store.token && store.user ? (
                            <Link to="/profile" className="fw-bold" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Bienvenido, {store.user.name}!
                            </Link>
                        ) : (
                            <span className="fw-bold">Bienvenido, Invitado</span>
                        )}
                    </div>

                    <div className="nav-item dropdown col-1">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-user"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-start">
                            {store.token ? (
                                <>
                                    <li><Link className="dropdown-item" to="/profile">Perfil</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                </>
                            ) : (
                                <>
                                    <li><Link className="dropdown-item" to="/login">Login</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/register">Registrarse</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                    <Link to="/kart">
                        <span className="col-1 me-4 ms-2 position-relative">
                            <i className="fas fa-shopping-cart"></i>
                            {store.kart.length > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {store.kart.reduce((total, item) => total + item.quantity, 0)}
                                </span>
                            )}
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
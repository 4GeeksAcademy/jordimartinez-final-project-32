import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (

		<nav className="navbar navbar-expand-lg bg-body-tertiary mb-5" style={{ backgroundColor: '#e3f2fd', position: 'fixed', top: '0', width: '100%', zIndex: '1000' }}>
			<div className="container-fluid">

				<Link className="me-3 ms-1" to="/">
					<span className="navbar-brand mb-0 h1">ciberfarma</span>
				</Link>


				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							Productos
						</a>
						<ul className="dropdown-menu dropdown-start">
							<li><Link className="dropdown-item" to="category/1">Analgésicos</Link></li>
							<li><Link className="dropdown-item" to="category/2">Antibióticos</Link></li>
							<li><Link className="dropdown-item" to="category/3">Dermatológicos y cosméticos</Link></li>
							<li><Link className="dropdown-item" to="category/4">Nutrición/suplementos</Link></li>
							<li><Link className="dropdown-item" to="category/5">Pediátricos</Link></li>
							<li><Link className="dropdown-item" to="category/6">Primeros auxilios</Link></li>
							<li><Link className="dropdown-item" to="category/7">Salud digestiva</Link></li>
							<li><Link className="dropdown-item" to="category/8">Tratamientos</Link></li>
							<li><Link className="dropdown-item" to="category/9">Vitaminas</Link></li>
						</ul>
						</li>
					</ul>

					<form className="d-flex justify-content-center col-5 me-3" role="search">
						<input className="form-control me-2" type="search" placeholder="¿Qué estás buscando?" aria-label="Search"/>
						<button className="btn btn-outline-success" type="submit">Buscar</button>
					</form>

					<div className="col-2">

					</div>


					<div className="nav-item dropdown col-1">
						<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
						<i className="fas fa-user"></i>
						</a>
						<ul className="dropdown-menu dropdown-start">
							<li><a className="dropdown-item" href="#">Login</a></li>
							<li><hr className="dropdown-divider"/></li>
							<li><a className="dropdown-item" href="#">Registrarse</a></li>
						</ul>
					</div>

					<Link to="/">
						<span className="col-1 me-4 ms-2">
							<i className="fas fa-shopping-cart"></i>
						</span>
					</Link>

				</div>
			</div>

		</nav>
	);
};

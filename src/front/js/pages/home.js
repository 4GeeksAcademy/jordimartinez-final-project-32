import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (

		<>

			<div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
				<div className="carousel-indicators">
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 4"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 5"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 6"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 7"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 8"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 9"></button>
				</div>
					<div className="carousel-inner">
						<Link to="/category/1" className="carousel-item active">
							<img src="https://res.cloudinary.com/dekagxdn6/image/upload/v1725934793/analgesico1_qhsptz.jpg" className="d-block w-100" alt="Analgesico"/>
						</Link>
						<Link to="/category/2" className="carousel-item">
							<img src="https://res.cloudinary.com/dekagxdn6/image/upload/v1725934793/antibioticos1_s8hnou.jpg" className="d-block w-100" alt="Antibiotico"/>
						</Link>
						<Link to="/category/3" className="carousel-item">
							<img src="https://res.cloudinary.com/dekagxdn6/image/upload/v1725934793/dERMA1_l9rqvj.jpg" className="d-block w-100" alt="Dermatologico"/>
						</Link>
						<Link to="/category/4" className="carousel-item">
							<img src="https://res.cloudinary.com/dekagxdn6/image/upload/v1725934794/nutrici%C3%B3n1_hxzg46.jpg" className="d-block w-100" alt="Nutricion"/>
						</Link>
						<Link to="/category/5" className="carousel-item">
							<img src="https://res.cloudinary.com/dekagxdn6/image/upload/v1725934793/PEDIATRICO1_ai0b5y.jpg" className="d-block w-100" alt="Pediatrico"/>
						</Link>
						<Link to="/category/6" className="carousel-item">
							<img src="https://res.cloudinary.com/dekagxdn6/image/upload/v1725934794/PRIMEROS1_llwil6.jpg" className="d-block w-100" alt="Primeros Auxilios"/>
						</Link>
						<Link to="/category/7" className="carousel-item">
							<img src="https://res.cloudinary.com/dekagxdn6/image/upload/v1725934793/DIGESTIVO1_okgozw.jpg" className="d-block w-100" alt="Digestion"/>
						</Link>
						<Link to="/category/8" className="carousel-item">
							<img src="https://res.cloudinary.com/dekagxdn6/image/upload/v1725934794/tratamientos1_styiyo.jpg" className="d-block w-100" alt="tratamientos"/>
						</Link>
						<Link to="/category/9" className="carousel-item">
							<img src="https://res.cloudinary.com/dekagxdn6/image/upload/v1725934794/VITAMINAS_axm68k.jpg" className="d-block w-100" alt="Vitaminas"/>
						</Link>
					</div>
					<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>

			<div className="text-center mt-5">
				<h1>Hello Rigo!!</h1>

				<h1>Hola, Que tal?</h1>

				<p>
					<img src={rigoImageUrl} />
				</p>
				<div className="alert alert-info">
					{store.message || "Loading message from the backend (make sure your python backend is running)..."}
				</div>
				<p>
					This boilerplate comes with lots of documentation:{" "}
					<a href="https://start.4geeksacademy.com/starters/react-flask">
						Read documentation
					</a>
				</p>
			</div>
		</>
	);
};

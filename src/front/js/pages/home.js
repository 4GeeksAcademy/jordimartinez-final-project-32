import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [recommendedProducts, setRecommendedProducts] = useState([]);

    useEffect(() => {
        // Seleccionar 15 productos aleatorios
        const shuffledProducts = store.product.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffledProducts.slice(0, 15);
        setRecommendedProducts(selectedProducts);
    }, [store.product]);
	

	return (

		<>

			<div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
				<div className="carousel-indicators">
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5" aria-label="Slide 6"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="6" aria-label="Slide 7"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="7" aria-label="Slide 8"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="8" aria-label="Slide 9"></button>
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
				<div className="container mt-5">
                <h2>Productos Recomendados</h2>
                <div className="row flex-row flex-nowrap overflow-auto mt-3">
                    {recommendedProducts.map((product) => (
                        <div key={product.product_id} className="col-3">
                            <div className="card mt-4">
                            <img src={product.image_url} style={{ width:"80%", height:"200px", objectFit:"contain"}} className="card-img-top" alt={product.generic_name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.generic_name}</h5>
                                <p className="card-text col-5">${product.price}.00</p>
                                <p className="card-text">{product.description}</p>
                                <Link to={`/product/${product.product_id}`} className="btn btn-primary">Ver Producto</Link>
                                <button className="btn btn-success ms-5" onClick={() => actions.addToKart(product)}>
                                    <i className="fas fa-shopping-cart"></i>
                                </button>
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
import React from "react";

const CategoriesTemplate = () => {
    return (
     <div className="container pt-4">
        
{/*PLANTILLA TITULO*/}

        <div className="mb-3">
            <h2>Titulo para cada categoria</h2>
        </div>

{/*PLANTILLA CARRUSEL*/}

            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://lh3.googleusercontent.com/ki0lizuh11EpHhtNhExBS9IA8KQqXJsXbK9xq2mbS8bTf2NKEPnbYkEPQK4a8ENnuAkk9ec_q6vHdjIaUWED1klbSArFmb8bDqLvpu1K3TxJtMDW=s1536-rw" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://lh3.googleusercontent.com/MruTX1jQ4fs6qKapCRLl0kyDjKbZ2gUjXc27Ek-VxtbxVje9Y5KdnA_eixouSBpCReFekZRtLKsJ3Z4VglVLysGScoAOCK01SpU_m1Kz1ZyeccCKPQ=s1536-rw" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://lh3.googleusercontent.com/RFYfGwCO8jjBnydm-hcOIgfcFX4aOpEH3_H8K5iuYP4KxO0rZ2JMrIZDfGoLFAgVoC7agYB9dTprlhc-6RZorTSc-03q_-dOqxXbf4CCwtIHJaABDg=s1536-rw" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>


{/* DIVISIÓN EN COLUMNAS CON LÍNEA VERTICAL */}

        <div className="row mt-4">

{/* COLUMNAS IZQUIERDA */}

                <div className="col-md-3">
                    <div className="bg-secondary text-white p-3 position-relative" style={{ height: '50px' }}>
                        <h4 className="m-0">Título prueba</h4>

{/* Línea vertical extendida */}

                        <div className="position-absolute start-100 top-0 bottom-0" style={{ width: '2px', backgroundColor: '#000' }}>    
                        </div>
                    </div>

{/* Botones circulares */}

                <div className="mt-3">
                    <div className="mb-3 d-flex flex-column align-items-start">

{/* Botones para Categoria Mayor 1 */}

                        <div className="d-flex align-items-center mb-2">
                            <button className="circle-button"></button>
                            <span className="ms-2">Categoria Mayor 1</span>
                        </div>

                            <div className="mt-2 d-flex flex-column align-items-start subbuttons-container">
                                <div className="d-flex align-items-center mb-3">
                                    <button className="circle-button-small"></button>
                                    <span className="ms-2 text-secondary">Subcategoria 1</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <button className="circle-button-small"></button>
                                    <span className="ms-2 text-secondary">Subcategoria 2</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <button className="circle-button-small"></button>
                                    <span className="ms-2 text-secondary">Subcategoria 3</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <button className="circle-button-small"></button>
                                    <span className="ms-2 text-secondary">Subcategoria 4</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <button className="circle-button-small"></button>
                                    <span className="ms-2 text-secondary">Subcategoria 5</span>
                                </div>
                            </div>

{/* Botones para Categoria Mayor 2 */}

                        <div className="mb-3 d-flex align-items-center">
                            <button className="circle-button"></button>
                            <span className="ms-2">Categoria Mayor 2</span>
                        </div>

                            <div className="mt-2 d-flex flex-column align-items-start subbuttons-container">
                                <div className="d-flex align-items-center mb-3">
                                    <button className="circle-button-small"></button>
                                    <span className="ms-2 text-secondary">Subcategoria 1</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <button className="circle-button-small"></button>
                                    <span className="ms-2 text-secondary">Subcategoria 2</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <button className="circle-button-small"></button>
                                    <span className="ms-2 text-secondary">Subcategoria 3</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <button className="circle-button-small"></button>
                                    <span className="ms-2 text-secondary">Subcategoria 4</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <button className="circle-button-small"></button>
                                    <span className="ms-2 text-secondary">Subcategoria 5</span>
                                </div>
                            </div>

{/* Botones para Categoria Mayor 3 */}

                        <div className="mb-3 d-flex align-items-center">
                            <button className="circle-button"></button>
                            <span className="ms-2">Categoria Mayor 3</span>
                        </div>

                            <div className="mt-2 d-flex flex-column align-items-start subbuttons-container">
                                <div className="d-flex align-items-center mb-3">
                                    <button className="circle-button-small"></button>
                                    <span className="ms-2 text-secondary">Subcategoria 1</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <button className="circle-button-small"></button>
                                    <span className="ms-2 text-secondary">Subcategoria 2</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <button className="circle-button-small"></button>
                                    <span className="ms-2 text-secondary">Subcategoria 3</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <button className="circle-button-small"></button>
                                    <span className="ms-2 text-secondary">Subcategoria 4</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <button className="circle-button-small"></button>
                                    <span className="ms-2 text-secondary">Subcategoria 5</span>
                                </div>
                            </div>

{/* Botones para Categoria Mayor 4 */}

                        <div className="mb-3 d-flex align-items-center">
                            <button className="circle-button"></button>
                            <span className="ms-2">Categoria Mayor 4</span>
                        </div>

                            <div className="mt-2 d-flex flex-column align-items-start subbuttons-container">
                                <div className="d-flex align-items-center mb-3">
                                    <button className="circle-button-small"></button>
                                    <span className="ms-2 text-secondary">Subcategoria 1</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <button className="circle-button-small"></button>
                                    <span className="ms-2 text-secondary">Subcategoria 2</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <button className="circle-button-small"></button>
                                    <span className="ms-2 text-secondary">Subcategoria 3</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <button className="circle-button-small"></button>
                                    <span className="ms-2 text-secondary">Subcategoria 4</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <button className="circle-button-small"></button>
                                    <span className="ms-2 text-secondary">Subcategoria 5</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

{/* COLUMNAS DERECHA */}

            <div className="col-md-9 text-gray">
                <h3 className="fw-bold text-secondary">Titulo prueba</h3>

{/* CARRUSEL CON IMÁGENES EN MINIATURA */}

                <div id="carouselExample2" className="carousel slide mt-3">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="d-flex">
                                <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="d-flex">
                                <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample2" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample2" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

{/* NUEVO CARRUSEL CON PRODUCTOS DESTACADOS */}

                <div className="mt-5">
                    <h5>Productos Destacados</h5>
                    <div id="carouselExample3" className="carousel slide mt-3">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="d-flex">
                                    <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                    <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                    <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                    <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="d-flex">
                                    <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                    <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                    <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                    <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample3" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample3" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

{/* NUEVO CARRUSEL CON PRODUCTOS MÁS VENDIDOS */}

                <div className="mt-5">
                    <h5>Productos más vendidos</h5>
                    <div id="carouselExample4" className="carousel slide mt-3">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="d-flex">
                                    <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                    <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                    <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                    <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="d-flex">
                                    <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                    <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                    <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                    <img src="https://via.placeholder.com/150x150" className="d-block w-25" alt="..." />
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample4" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample4" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default CategoriesTemplate;
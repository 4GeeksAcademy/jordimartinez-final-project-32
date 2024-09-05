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
            <div className="col-md-3 d-flex align-items-center justify-content-center bg-secondary text-white position-relative">
                <h3 className="m-0">Título para cada categoría</h3>
    {/* Línea vertical extendida */}
            <div className="position-absolute start-100 top-0 bottom-0" style={{ width: '2px', backgroundColor: '#000' }}></div>
        </div>

        <div className="col-md-9">
            <h3>Contenido de la columna de 70%</h3>
        </div>
</div>


     </div>
    );
};

export default CategoriesTemplate;

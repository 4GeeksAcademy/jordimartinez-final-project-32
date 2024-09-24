import React, { useContext, useEffect, useState } from "react";  
import { useParams, Link, useLocation } from "react-router-dom";  
import { Context } from "../store/appContext"; 

const CategoriesTemplate = () => {
    const { theid } = useParams();
    const categoryId = parseInt(theid, 10);
    const { store, actions } = useContext(Context);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const location = useLocation();
    const currentCategoryId = location.pathname.split("/").pop();

    const categoryTitles = {
        1: "Analgésicos",
        2: "Antibióticos",
        3: "Dermatológicos y cosméticos",
        4: "Nutrición/suplementos",
        5: "Pediátricos",
        6: "Primeros auxilios",
        7: "Salud digestiva",
        8: "Tratamientos",
        9: "Vitaminas",
 
    };

    const categoryTips1 = {
        1: "¡Conoce algunos tips sobre los Analgésicos!",
        2: "¡Conoce algunos tips sobre los Antibióticos!",
        3: "¡Conoce algunos tips sobre los productos Dermatológicos y cosméticos!",
        4: "¡Conoce algunos tips sobre los productos de Nutrición/suplementos!",
        5: "¡Conoce algunos tips sobre los productos Pediátricos!",
        6: "¡Conoce algunos tips sobre los productos de Primeros auxilios!",
        7: "¡Conoce algunos tips sobre los productos de la Salud digestiva!",
        8: "¡Conoce algunos tips sobre los productos de Tratamientos!",
        9: "¡Conoce algunos tips sobre las Vitaminas!",
 
    };

    const categoryTips2 = {
        1: (
            <>
                <p>
                    Usar analgésicos adecuadamente es fundamental para tratar el dolor sin causar efectos adversos. <strong>Sigue las recomendaciones de dosificación</strong>, ten en cuenta las precauciones y consulta a un profesional de la salud si tienes alguna duda o condición médica que pueda afectar el uso de estos medicamentos.
                </p>
            </>
        ),
        2: (
            <>
                <p>
                    El uso correcto de los antibióticos es esencial para tratar infecciones bacterianas y evitar la resistencia. Siempre sigue las indicaciones del médico, no los uses para infecciones virales como el resfriado o la gripe, y finaliza el tratamiento completo para asegurar una recuperación adecuada. 
                </p>
            </>
        ),
        3: (
            <>
                <p>
                    El uso adecuado de productos dermatológicos y cosméticos es crucial para mantener la salud de la piel. Sigue las instrucciones del envase o las indicaciones médicas, y no dudes en consultar a un dermatólogo si tienes dudas sobre un producto o tratamiento. 
                </p>
            </>
        ),
        4: (
            <>
                <p>
                    Los productos de nutrición pueden ser una herramienta útil para mejorar la salud y el bienestar, pero deben ser usados con responsabilidad y conocimiento. Consulta con un profesional de la salud antes de comenzar a usar cualquier suplemento y asegúrate de seguir las instrucciones de uso adecuadamente. Una dieta equilibrada siempre debe ser la base de una buena nutrición. 
                </p>
            </>
        ),
        5: (
            <>
                <p>
                    El uso de productos pediátricos requiere especial atención y cuidado para garantizar la seguridad y salud de los niños. Siempre consulta con un pediatra antes de administrar medicamentos o suplementos, sigue las instrucciones de dosificación y ten en cuenta las precauciones generales para evitar riesgos.
                </p>
            </>
        ),
        6: (
            <>
                <p>
                    Contar con productos de primeros auxilios y saber cómo usarlos correctamente puede marcar la diferencia en una emergencia. Desde limpiar y proteger heridas hasta aliviar el dolor de lesiones menores, es esencial estar preparado y seguir las recomendaciones de uso. Recuerda siempre mantener un botiquín bien equipado y consultar a un profesional de la salud cuando sea necesario.
                </p>
            </>
        ),
        7: (
            <>
                <p>
                    El cuidado de la salud digestiva es fundamental para el bienestar general. Usar productos digestivos de manera adecuada y con responsabilidad ayuda a aliviar molestias comunes como el reflujo ácido, la hinchazón o el estreñimiento. Consulta a un profesional de la salud antes de iniciar cualquier tratamiento, especialmente si tienes condiciones médicas preexistentes.  
                </p>
            </>
        ),
        8: (
            <>
                <p>
                    El uso adecuado de tratamientos médicos es esencial para garantizar su eficacia y evitar efectos adversos. Sigue siempre las indicaciones médicas y las instrucciones del envase. Si tienes dudas, consulta a un profesional de la salud antes de iniciar cualquier tratamiento, especialmente en el caso de niños, ancianos o personas con condiciones preexistentes.  
                </p>
            </>
        ),
        9: (
            <>
                <p>
                  El uso adecuado de vitaminas es importante para mantener una salud óptima y prevenir deficiencias. Sigue siempre las dosis recomendadas y consulta a un profesional de la salud para ajustar tu ingesta de vitaminas según tus necesidades individuales. Evita el exceso y ajusta la suplementación según las recomendaciones médicas, especialmente en niños, ancianos o personas con condiciones especiales.
                </p>
            </>
        ),
    };

    const categoryTips3 = {
        1: (
            <>
                <ul>
                    <li>No Exceder la Dosis Recomendada.</li>
                    <li>Evitar el Alcohol.</li>
                    <li>No Mezclar con Otros Medicamentos sin Consultar.</li>
                    <li>Considerar las Condiciones Médicas Preexistentes.</li>
                    <li>Uso a Corto Plazo.</li>
                </ul>
            </>
        ),
        2: (
            <>
                <ul>
                    <li>No Usar sin Prescripción Médica.</li>
                    <li>Completa el Tratamiento.</li>
                    <li>Evitar el Alcohol.</li>
                    <li>No Compartir Antibióticos.</li>
                    <li>Interacciones Medicamentosas.</li>
                </ul>
            </>
        ),
        3: (
            <>
                <ul>
                    <li>Prueba de Alergias.</li>
                    <li>Evita el Uso Excesivo de Corticoides.</li>
                    <li>Cuidado con los Retinoides.</li>
                    <li>No Mezclar Productos Fuertes.</li>
                    <li>Uso Adecuado de Protectores Solares.</li>
                </ul>
            </>
        ),
        4: (
            <>
                <ul>
                    <li>Consulta con un Profesional.</li>
                    <li>No Exceder las Dosis.</li>
                    <li>Balance Nutricional.</li>
                    <li>Hidratación Adecuada.</li>
                    <li>Alérgenos.</li>
                </ul>
            </>
        ),
        5: (
            <>
                <ul>
                    <li>Consulta con un Pediatra.</li>
                    <li>No Exceder la Dosis.</li>
                    <li>Evitar el Uso de Medicamentos de Adultos.</li>
                    <li>Cuidado con los Antibióticos.</li>
                    <li>Reacciones Alérgicas.</li>
                </ul>
            </>
        ),
        6: (
            <>
                <ul>
                    <li>Higiene.</li>
                    <li>No Exceder en el Uso de Antisépticos.</li>
                    <li>Cuidado con las Quemaduras Químicas.</li>
                    <li>Heridas que Requieren Atención Médica.</li>
                    <li>Reacciones Alérgicas a los Productos.</li>
                </ul>
            </>
        ),
        7: (
            <>
                <ul>
                    <li>No Abusar de Antiácidos.</li>
                    <li>Uso Responsable de Laxantes.</li>
                    <li>Precauciones con Procinéticos.</li>
                    <li>Consideración para Probióticos.</li>
                    <li>Consulta para Protectores Gástricos.</li>
                </ul>
            </>
        ),
        8: (
            <>
                <ul>
                    <li>Consulta a tu médico antes de combinar tratamientos, especialmente si tienes una condición médica preexistente.</li>
                    <li>No mezclar con otros medicamentos sin consultar a un profesional de la salud.</li>
                    <li>Evitar el uso prolongado sin la recomendación de un médico.</li>
                </ul>
            </>
        ),
        9: (
            <>
                <ul>
                    <li>No Exceder la Dosis Recomendada.</li>
                    <li>Consulta con un Profesional.</li>
                    <li>verifica con tu médico si necesitas ajustar tu ingesta de vitaminas.</li>
                </ul>
            </>
        ),
 
    };

    const categoryTips4 = {
        1: (
            <>
                <ul>
                    <li><strong>Niños:</strong> La dosis debe ajustarse según el peso y la edad del niño. Consulta siempre con un pediatra antes de administrar cualquier analgésico a un niño.</li>
                    <li><strong>Ancianos:</strong> Pueden ser más sensibles a los efectos secundarios. Se debe ajustar la dosis y monitorizar de cerca.</li>
                </ul>
            </>
        ),
        2: (
            <>
                <ul>
                    <li><strong>Niños:</strong> Las dosis deben ajustarse según la edad y peso. Consulta siempre a un pediatra antes de administrar antibióticos a un niño.</li>
                    <li><strong>Ancianos:</strong> Son más susceptibles a efectos secundarios. Deben tener un seguimiento médico cercano y posible ajuste de dosis.</li>
                </ul>
            </>
        ),
        3: (
            <>
                <ul>
                    <li><strong>Niños:</strong> Usa productos dermatológicos suaves y específicos para su tipo de piel. Evita el uso de cremas con corticoides sin indicación médica.</li>
                    <li><strong>Ancianos:</strong> Las pieles maduras tienden a ser más delgadas y secas, por lo que se debe prestar especial atención a la hidratación y el uso de protectores solares.</li>
                </ul>
            </>
        ),
        4: (
            <>
                <ul>
                    <li><strong>Niños:</strong> Consulta siempre con un pediatra antes de dar suplementos a los niños. Los requerimientos nutricionales varían según la edad, y el exceso de ciertos nutrientes puede ser dañino.</li>
                    <li><strong>Ancianos:</strong> Los adultos mayores pueden beneficiarse de suplementos de calcio, vitamina D, y omega-3 para mantener la salud ósea y cardiovascular. Sin embargo, siempre deben consultar con su médico antes de iniciar cualquier régimen de suplementación.</li>
                </ul>
            </>
        ),
        5: (
            <>
                <ul>
                    <li><strong>Medicamentos para Bebés:</strong> Los bebés son especialmente sensibles a los medicamentos, y la dosificación debe ser ajustada con precisión por un pediatra. Los productos para bebés a menudo vienen en formas líquidas para facilitar su administración.</li>
                    <li><strong>Multivitamínicos para Bebés:</strong> Muchos bebés necesitan suplementos de vitamina D para el desarrollo óseo, especialmente si son amamantados exclusivamente.</li>
                    <li><strong>Tratamientos para el Cólico:</strong> Existen gotas para el cólico formuladas específicamente para bebés. Estos productos deben usarse con precaución y bajo la recomendación de un médico.</li>
                </ul>
            </>
        ),
        6: (
            <>
                <ul>
                    <li><strong>Niños:</strong> Los vendajes y productos para niños suelen estar diseñados para ser suaves con la piel y de fácil aplicación. Usa productos pediátricos siempre que sea posible, especialmente en quemaduras y heridas menores.</li>
                    <li><strong>Ancianos:</strong> Las personas mayores pueden tener piel más delicada, por lo que es importante ser cuidadoso al aplicar vendajes y evitar retirar adhesivos de forma brusca. Además, deben tener cuidado al aplicar productos antisépticos en exceso.</li>
                </ul>
            </>
        ),
        7: (
            <>
                <ul>
                    <li><strong>Niños:</strong> Los productos digestivos deben utilizarse con precaución en los niños. Consulta siempre a un pediatra antes de administrar antiácidos, laxantes o probióticos a los más pequeños.</li>
                    <li><strong>Ancianos:</strong> Las personas mayores son más propensas a sufrir problemas digestivos crónicos, como estreñimiento o reflujo ácido. Deben usar estos productos bajo supervisión médica y con especial cuidado en las dosis, ya que pueden ser más sensibles a los efectos secundarios.</li>
                </ul>
            </>
        ),
        8: (
            <>
                <ul>
                    <li><strong>Niños:</strong> Los tratamientos, ya sean tópicos o sistémicos, deben ajustarse según la edad y el peso del niño. Siempre consulta a un pediatra antes de administrar cualquier tratamiento.</li>
                    <li><strong>Ancianos:</strong> Las personas mayores pueden tener mayor sensibilidad a los medicamentos y suplementos, especialmente a los tratamientos sistémicos. Ajusta las dosis y controla el uso con la ayuda de un médico.</li>
                </ul>
            </>
        ),
        9: (
            <>
                <ul>
                    <li><strong>Niños:</strong> Las dosis deben ajustarse a la edad y necesidades nutricionales del niño. Consulta siempre con un pediatra antes de administrar suplementos vitamínicos a los niños.</li>
                    <li><strong>Ancianos:</strong> Pueden tener mayores necesidades de ciertas vitaminas, como la vitamina D y la vitamina B12. Ajusta la ingesta según las recomendaciones médicas.</li>
                </ul>
            </>
        ),
 
    };

    const categoryTips5 = {
        1: (
            <>
                <ul>
                    <li><strong>Guardar en un Lugar Seguro:</strong> Mantén los analgésicos fuera del alcance de los niños y en su envase original.</li>
                </ul>
            </>
        ),
        2: (
            <>
                <ul>
                    <li><strong>Conservar en un Lugar Seguro:</strong> Guarda los antibióticos en su envase original, lejos de la luz y la humedad. Mantén fuera del alcance de los niños.</li>
                </ul>
            </>
        ),
        3: (
            <>
                <ul>
                    <li><strong>Almacenamiento Adecuado:</strong> Mantén los productos en un lugar fresco y seco, lejos de la luz solar directa, para evitar la degradación de los ingredientes activos.</li>
                </ul>
            </>
        ),
        4: (
            <>
                <ul>
                    <li><strong>Almacenamiento Correcto:</strong> Guarda los suplementos en un lugar fresco y seco, lejos de la luz solar directa, para evitar que los ingredientes pierdan efectividad.</li>
                </ul>
            </>
        ),
        5: (
            <>
                <ul>
                    <li><strong>Guardar en un Lugar Seguro:</strong> Los medicamentos y suplementos pediátricos deben mantenerse fuera del alcance de los niños, preferiblemente en un lugar alto y con cierre de seguridad.</li>
                    <li><strong>Respetar las Fechas de Expiración:</strong> No uses productos vencidos, ya que pueden perder eficacia o ser peligrosos.</li>
                </ul>
            </>
        ),
        6: (
            <>
                <ul>
                    <li><strong>Guardar en un Botiquín de Fácil Acceso:</strong> Mantén todos los productos de primeros auxilios en un botiquín accesible y claramente etiquetado. Asegúrate de que todos los miembros del hogar sepan dónde se encuentra.</li>
                    <li><strong>Revisar Fechas de Vencimiento:</strong> Regularmente revisa las fechas de vencimiento de los productos, especialmente los antisépticos y medicamentos, para asegurarte de que están en buen estado cuando se necesiten.</li>
                    <li><strong>Evitar Lugares Húmedos:</strong> Almacena los productos en un lugar seco y fresco, lejos de la humedad del baño, ya que esto puede afectar su calidad y eficacia.</li>
                </ul>
            </>
        ),
        7: (
            <>
                <ul>
                    <li><strong>Conservar en Lugares Frescos y Secos:</strong> Mantén los productos digestivos en un lugar seco y fresco, lejos de la humedad, para preservar su eficacia.</li>
                    <li><strong>Verificar las Fechas de Vencimiento:</strong> Asegúrate de que los productos no estén vencidos, ya que los medicamentos caducados pueden perder su efectividad o incluso volverse dañinos.</li>
                </ul>
            </>
        ),
        8: (
            <>
                <ul>
                    <li><strong>Guardar en un Lugar Fresco y Seco:</strong> Mantén los tratamientos en su envase original, alejados de la luz directa y la humedad.</li>
                    <li><strong>Refrigeración:</strong> Algunos tratamientos, especialmente ciertos antibióticos o cremas, pueden requerir refrigeración. Sigue las indicaciones del envase o las recomendaciones del farmacéutico.</li>
                </ul>
            </>
        ),
        9: (
            <>
                <ul>
                    <li><strong>Guardar en un Lugar Seguro:</strong> Mantén los suplementos vitamínicos en un lugar fresco y seco, lejos de la luz directa y la humedad.</li>
                    <li><strong>Refrigeración:</strong> Algunos suplementos pueden requerir refrigeración; verifica las indicaciones del envase.</li>
                </ul>
            </>
        ),
 
    };

    const categoryImages = {
        1: [
            "https://res.cloudinary.com/dekagxdn6/image/upload/v1725934793/analgesico1_qhsptz.jpg",
            "https://res.cloudinary.com/ddgu6rj8h/image/upload/v1726285926/Designer_ghwcft.png",
            "https://res.cloudinary.com/ddgu6rj8h/image/upload/v1726286314/banner_horizontal_con_fondo_3_kiriou.jpg"
        ],
        2: [
            "https://res.cloudinary.com/dekagxdn6/image/upload/v1725934793/antibioticos1_s8hnou.jpg",
            "https://res.cloudinary.com/ddgu6rj8h/image/upload/v1726286556/Designer_skzluk.jpg",
            "https://res.cloudinary.com/ddgu6rj8h/image/upload/v1726286700/Designer_1_zqpazg.jpg"
        ],
        3: [
            "https://res.cloudinary.com/dekagxdn6/image/upload/v1725934793/dERMA1_l9rqvj.jpg",
            "https://res.cloudinary.com/ddgu6rj8h/image/upload/v1726286881/Designer_2_wuecz3.jpg",
            "https://res.cloudinary.com/ddgu6rj8h/image/upload/v1726287001/Designer_3_fvbn17.jpg"
        ],
        4: [
            "https://res.cloudinary.com/dekagxdn6/image/upload/v1725934794/nutrici%C3%B3n1_hxzg46.jpg",
            "https://res.cloudinary.com/ddgu6rj8h/image/upload/v1726287120/Designer_4_cvotpw.jpg",
            "https://res.cloudinary.com/ddgu6rj8h/image/upload/v1726287176/Designer_5_lt7ixn.jpg"
        ],
        5: [
            "https://res.cloudinary.com/dekagxdn6/image/upload/v1725934793/PEDIATRICO1_ai0b5y.jpg",
            "https://res.cloudinary.com/ddgu6rj8h/image/upload/v1726287371/Designer_mhetvp.jpg",
            "https://res.cloudinary.com/ddgu6rj8h/image/upload/v1726287424/Designer_2_fiizl2.jpg"
        ],
        6: [
            "https://res.cloudinary.com/dekagxdn6/image/upload/v1725934794/PRIMEROS1_llwil6.jpg",
            "https://res.cloudinary.com/ddgu6rj8h/image/upload/v1726287555/Designer_1_mabafs.jpg",
            "https://res.cloudinary.com/ddgu6rj8h/image/upload/v1726287620/Designer_3_psqigi.jpg"
        ],
        7: [
            "https://res.cloudinary.com/dekagxdn6/image/upload/v1725934793/DIGESTIVO1_okgozw.jpg",
            "https://res.cloudinary.com/ddgu6rj8h/image/upload/v1726287824/Designer_4_qpwtyq.jpg",
            "https://res.cloudinary.com/ddgu6rj8h/image/upload/v1726287879/Designer_5_ozkopi.jpg"
        ],
        8: [
            "https://res.cloudinary.com/dekagxdn6/image/upload/v1725934794/tratamientos1_styiyo.jpg",
            "https://res.cloudinary.com/ddgu6rj8h/image/upload/v1726288032/Designer_6_ferbsq.jpg",
            "https://res.cloudinary.com/ddgu6rj8h/image/upload/v1726288091/Designer_7_g0i4hr.jpg"
        ],
        9: [
            "https://res.cloudinary.com/dekagxdn6/image/upload/v1725934794/VITAMINAS_axm68k.jpg",
            "https://res.cloudinary.com/ddgu6rj8h/image/upload/v1726288307/Designer_8_izpmts.jpg",
            "https://res.cloudinary.com/ddgu6rj8h/image/upload/v1726288359/Designer_9_eokdx6.jpg"
        ],
    };

    const getTitleClass = () => {
        switch (currentCategoryId) {
            case '1': return 'category-title-1';
            case '2': return 'category-title-2';
            case '3': return 'category-title-3';
            case '4': return 'category-title-4';
            case '5': return 'category-title-5';
            case '6': return 'category-title-6';
            case '7': return 'category-title-7';
            case '8': return 'category-title-8';
            case '9': return 'category-title-9';
            default: return '';
        }
    };  

    const categoryTitle = categoryTitles[theid] || "Categoría Desconocida";
    const categoryTip1 = categoryTips1[theid] || "Consejos no disponibles para esta categoría.";
    const categoryTip2 = categoryTips2[theid] || "Consejos no disponibles para esta categoría.";
    const categoryTip3 = categoryTips3[theid] || "Consejos no disponibles para esta categoría.";
    const categoryTip4 = categoryTips4[theid] || "Consejos no disponibles para esta categoría.";
    const categoryTip5 = categoryTips5[theid] || "Consejos no disponibles para esta categoría.";
    const images = categoryImages[categoryId] || [];
    const categoryClass = `bg-category-${categoryId}` || 'bg-category-1';

    useEffect(() => {
        if (store.product && categoryId) {
            const filteredProducts = store.product.filter(product => product.category_id === categoryId);
            const shuffledProducts = filteredProducts.sort(() => 0.5 - Math.random());
            const selectedProducts = shuffledProducts.slice(0, 15);
            setRecommendedProducts(selectedProducts);
        }
    }, [store.product, categoryId]);

    return (
     <div className="container pt-4">
        
{/*PLANTILLA TITULO*/}

        <div className="mb-3 mt-3">
            <h1 className={`fw-bold ${getTitleClass()}`}><strong>{categoryTitle}</strong></h1>
        </div>

{/*PLANTILLA CARRUSEL*/}

            <div id="carouselExample" className="carousel slide carousel-custom carousel-dark slide">
                <div className="carousel-inner">
                    {images.map((image, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img src={image} className="d-block w-100" alt={`Carousel item ${index + 1}`} />
                        </div>
                    ))}
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

            <div className="col-md-3 vertical-line">
                <div className={`text-white p-3 position-relative ${categoryClass}`} style={{ height: '75px' }}>
                    <h4 className="m-0 text-center">{categoryTitle}</h4>
                </div>

{/* Botones circulares */}

                <div className="mt-3">
                    <div className="mb-3 d-flex flex-column align-items-start">

{/* Botones para Categoria Analgésicos */}

                        <div className="mb-3 d-flex align-items-center">
                            <Link to="/category/1" className="text-decoration-none">
                                <button className={`circle-button ${currentCategoryId === '1' ? 'selected category-1' : ''}`}></button>
                                <span className={`ms-2 ${currentCategoryId === '1' ? 'text-bold text-category-1' : 'text-black'}`}>Analgésicos</span>
                            </Link>
                        </div>

{/* Botones para Categoria Antibióticos */}

                        <div className="mb-3 d-flex align-items-center">
                            <Link to="/category/2" className="text-decoration-none">
                                <button className={`circle-button ${currentCategoryId === '2' ? 'selected category-2' : ''}`}></button>
                                <span className={`ms-2 ${currentCategoryId === '2' ? 'text-bold text-category-2' : 'text-black'}`}>Antibióticos</span>
                            </Link>
                        </div>

{/* Botones para Categoria Dermatológicos y cosméticos */}

                        <div className="mb-3 d-flex align-items-center">
                            <Link to="/category/3" className="text-decoration-none">
                                <button className={`circle-button ${currentCategoryId === '3' ? 'selected category-3' : ''}`}></button>
                                <span className={`ms-2 ${currentCategoryId === '3' ? 'text-bold text-category-3' : 'text-black'}`}>Dermatológicos y cosméticos</span>
                            </Link>
                        </div>

{/* Botones para Categoria Nutrición/suplementos */}

                        <div className="mb-3 d-flex align-items-center">
                            <Link to="/category/4" className="text-decoration-none">
                                <button className={`circle-button ${currentCategoryId === '4' ? 'selected category-4' : ''}`}></button>
                                <span className={`ms-2 ${currentCategoryId === '4' ? 'text-bold text-category-4' : 'text-black'}`}>Nutrición/suplementos</span>
                            </Link>
                        </div>

{/* Botones para Categoria Pediátricos */}

                        <div className="mb-3 d-flex align-items-center">
                            <Link to="/category/5" className="text-decoration-none">
                                <button className={`circle-button ${currentCategoryId === '5' ? 'selected category-5' : ''}`}></button>
                                <span className={`ms-2 ${currentCategoryId === '5' ? 'text-bold text-category-5' : 'text-black'}`}>Pediátricos</span>
                            </Link>
                        </div>

{/* Botones para Categoria Primeros auxilios */}

                        <div className="mb-3 d-flex align-items-center">
                            <Link to="/category/6" className="text-decoration-none">
                                <button className={`circle-button ${currentCategoryId === '6' ? 'selected category-6' : ''}`}></button>
                                <span className={`ms-2 ${currentCategoryId === '6' ? 'text-bold text-category-6' : 'text-black'}`}>Primeros auxilios</span>
                            </Link>
                        </div>

{/* Botones para Categoria Salud digestiva */}

                        <div className="mb-3 d-flex align-items-center">
                            <Link to="/category/7" className="text-decoration-none">
                                <button className={`circle-button ${currentCategoryId === '7' ? 'selected category-7' : ''}`}></button>
                                <span className={`ms-2 ${currentCategoryId === '7' ? 'text-bold text-category-7' : 'text-black'}`}>Salud digestiva</span>
                            </Link>
                        </div>

{/* Botones para Categoria Tratamientos */}

                        <div className="mb-3 d-flex align-items-center">
                            <Link to="/category/8" className="text-decoration-none">
                                <button className={`circle-button ${currentCategoryId === '8' ? 'selected category-8' : ''}`}></button>
                                <span className={`ms-2 ${currentCategoryId === '8' ? 'text-bold text-category-8' : 'text-black'}`}>Tratamientos</span>
                            </Link>
                        </div>

{/* Botones para Categoria Vitaminas */}

                        <div className="mb-3 d-flex align-items-center">
                            <Link to="/category/9" className="text-decoration-none">
                                <button className={`circle-button ${currentCategoryId === '9' ? 'selected category-9' : ''}`}></button>
                                <span className={`ms-2 ${currentCategoryId === '9' ? 'text-bold text-category-9' : 'text-black'}`}>Vitaminas</span>
                            </Link>
                        </div>
                    </div>

{/* Cuadro de texto fijo con borde gris claro */}

                    <div className="mt-4 p-3 border border-light" style={{ backgroundColor: '#f8f9fa' }}>
                        <h4><strong>{categoryTip1}</strong></h4>
                        <p className="mb-0 custom-text">
                            {categoryTip2}
                        </p>
                        <h3><strong>¡Precauciones Generales!</strong></h3>
                        <p className="mb-0 custom-text">
                            {categoryTip3}
                        </p>
                        <h3><strong>¡Uso en Niños y Ancianos!</strong></h3>
                        <p className="mb-0 custom-text">
                            {categoryTip4}
                        </p>
                        <h3><strong>¡Almacenamiento!</strong></h3>
                        <p className="mb-0 custom-text">
                            {categoryTip5}
                        </p>
                    </div>
                </div>
            </div>

{/* COLUMNAS DERECHA */}

            <div className="col-md-9 text-gray">
                <h3 className={`fw-bold ${getTitleClass()}`}>{categoryTitle}</h3>

{/* NUEVO CARRUSEL CON PRODUCTOS DESTACADOS */}

                    <div className="mt-5">
                        <h5>Productos Destacados</h5>
                        <div id="carouselExample2" className="carousel slide mt-3 carousel-dark slide">
                            <div className="carousel-inner">
                                {recommendedProducts.reduce((acc, product, index) => {
                                    if (index % 3 === 0) acc.push([]);
                                    acc[acc.length - 1].push(product);
                                    return acc;
                                }, []).map((products, slideIndex) => (
                                    <div key={slideIndex} className={`carousel-item ${slideIndex === 0 ? 'active' : ''}`}>
                                        <div className="d-flex">
                                            {products.map((product) => (
                                                <div key={product.product_id} className="card me-2" style={{ width: '18rem' }}>
                                                    <Link to={`/product/${product.product_id}`}>
                                                        <img 
                                                            src={product.image_url} 
                                                            className="card-img-top" 
                                                            alt={product.generic_name} 
                                                            style={{ height: '200px', objectFit: 'cover' }}
                                                        />
                                                    </Link>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{product.generic_name}</h5>
                                                        <p className="card-text">${product.price}.00</p>
                                                        <p className="card-text">{product.description}</p>
                                                        <Link to={`/product/${product.product_id}`} className="btn btn-primary">Ver Producto</Link>
                                                        <button className="btn btn-success ms-3" onClick={() => actions.addToKart(product)}>
                                                            <i className="fas fa-shopping-cart"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
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
                </div>

{/* NUEVO CUADRO DE PRODUCTOS EN MOZAICO */}

                <div className="mt-4 p-3 border border-light" style={{ backgroundColor: 'white', width: '110%' }}>
                    <h3><strong>¡Compra ahora!</strong></h3>
                    <div className="row">
                        {recommendedProducts.reduce((acc, product, index) => {
                            if (index % 3 === 0) acc.push([]);
                            acc[acc.length - 1].push(product);
                            return acc;
                        }, []).map((products, rowIndex) => (
                            <div key={rowIndex} className="row mb-3">
                                {products.map((product) => (
                                    <div key={product.product_id} className="col-md-4 mb-3 mt-4">
                                        <div className="card mb-2" style={{ border: 'none' }}>
                                            <Link to={`/product/${product.product_id}`}>
                                                <img 
                                                    src={product.image_url} 
                                                    className="card-img-top" 
                                                    alt={product.generic_name} 
                                                    style={{ height: '150px', objectFit: 'cover' }}
                                                />
                                            </Link>
                                            <div className="card-body">
                                                <h6 className="card-title">{product.generic_name}</h6>
                                                <p className="card-text">${product.price}.00</p>
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
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default CategoriesTemplate;
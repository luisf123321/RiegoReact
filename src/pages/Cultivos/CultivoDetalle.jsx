import React, { useState, useEffect } from 'react';
import LogoPlanta from "../../Assets/Logo_planta.svg"
import LogoLong from "../../Assets/Logo_location_long.svg"
import { Link, Outlet } from "react-router-dom";
const CultivoDetalle = () => {

    const [dataCultivo, setdataCultivo] = useState({});
    const getCultivoDetail = async () => {
        let response = await fetch("https://riegoback.herokuapp.com/cultivo/" + sessionStorage.getItem("idCultivo"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })

        if (response.status === 200) {
            let dataResponse = await response.json();
            console.log(dataResponse)
            setdataCultivo(dataResponse.cultivo);
            //getFores(dataResponse.finca.latidud, dataResponse.finca.longitud);
        }
    }

    useEffect(() => {
        document.body.style.background = "#c1c5ca";
        getCultivoDetail();
    }, []);
    return (
        <div className="container-fluid" style={{ "padding-left": "18%", "padding-top": "5%"}} >
            <div className="row-fluid ">
                <div className='row pt-2' style={{ "background": "#bfc8ce" }} >
                    <div className='col '>
                        <div className='row'>
                            <div className='col-1 px-3  mx-2 '>
                            <img src={LogoPlanta} alt="SVG logo image" width={30} height={30} />
                            </div>
                            <div className='col'>
                                <label htmlFor="username" className='fs-4 fw-bold' > Nombre:</label>
                                <p>{dataCultivo.cultivoNombre}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col ' >

                        <div className='row'>
                            <div className='col-1 px-3 mx-2 '>
                            <i class="bi bi-calendar3" style={{ "font-size": " 30px" }}></i>
                            </div>
                            <div className='col'>
                                <label htmlFor="username" className='fs-4 fw-bold' > Fecha de Siembra:</label>
                                <p>{dataCultivo.fechaInicio}</p>
                            </div>
                        </div>
                    </div>

                    <div className='col ' >
                        <div className='row'>
                            <div className='col-1 px-3 mx-2 '>
                                <i class="bi bi-calendar3" style={{ "font-size": " 30px" }}></i>
                            </div>
                            <div className='col'>
                                <label htmlFor="username" className='fs-4 fw-bold' > Fecha Final:</label>
                                <p>{dataCultivo.fechaFinal}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col ' >
                        <div className='row'>
                            <div className='col-1 px-3 mx-2'>
                            <i class="bi bi-calendar-check-fill" style={{ "font-size": " 30px" }}></i>
                            </div>
                            <div className='col'>
                                <label htmlFor="username" className='fs-4 fw-bold' > Etapa Actual:</label>
                                <p>{dataCultivo.user}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row bg-light pt-2' >
                    <div className='col '>
                        <div className='mx-2 px-2'>
                            <p className='fs-6 my-0'> Etapa inicial: {dataCultivo.fechaInicio}</p>
                            <p className='fs-6 '>Duración: {dataCultivo.etapaInicia} dias</p>
                        </div>
                    </div>
                    <div className='col ' >
                        <div className='mx-2 px-2'>
                            <p className='fs-6 my-0'> Etapa desarrollo: {dataCultivo.fechaDesarrollo}</p>
                            <p className='fs-6 '>Duración: {dataCultivo.etapaDesarrollo} dias</p>
                        </div>
                    </div>

                    <div className='col ' >
                        <div className='mx-2 px-2' >
                            <p className='fs-6 my-0'> Etapa maduracion: {dataCultivo.fechaMaduracion}</p>
                            <p className='fs-6 '>Duración: {dataCultivo.etapaMaduracion} dias</p>
                        </div>
                    </div>
                    <div className='col ' >
                        <div className='mx-2 px-2' >
                            <p className='fs-6 my-0'>Etapa finalizacion: {dataCultivo.fechaFinal}</p>
                            <p className='fs-6 '>Duración: {dataCultivo.etapaFinal} dias</p>
                        </div>
                    </div>
                </div>
                <div className="col-12  py-3">
                    <div className='row mt-2 mx-5 px-5'>
                        <div className='col-4 d-grid'>
                            <Link className='btn text-white' style={{"background":"#2c4464"}}  to="estadisticas" state={{ data: dataCultivo }}>Estadisticas</Link>
                        </div>
                        <div className='col-4 d-grid'>
                            <Link className='btn text-white'  style={{"background":"#2c4464"}}   to="sectores" state={{ data:dataCultivo }}>Sectores</Link>
                        </div>
        
                        <div className='col-4 d-grid'>
                            <Link className='btn text-white'  style={{"background":"#2c4464"}}   to="update" state={{ data: dataCultivo }}>Actualizar Cultivo</Link>
                        </div>
                    </div>
                    <div className='mt-2 mx-5 px-5'>
                        <Outlet />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CultivoDetalle;

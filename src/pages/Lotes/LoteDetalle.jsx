import React, { useState, useEffect } from 'react';
import LogoLat from "../../Assets/Logo_location_lat.svg"
import LogoLong from "../../Assets/Logo_location_long.svg"
import { Link, Outlet } from "react-router-dom";
const LoteDetalle = () => {

    const [dataLote, setdataLote] = useState({});

    const getLoteInformation = async () => {
        let response = await fetch("https://sirbic.up.railway.app/lote/" + sessionStorage.getItem("idLote"), {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
        if (response.status === 200) {
            let dataResponse = await response.json();
            setdataLote(dataResponse.lote);
            console.log(dataResponse)
        }
    }
    useEffect(() => {
        getLoteInformation();

    }, []);

    return (
        <div className="container-fluid pt-5" style={{ "padding-left": "18%" }}>
            <div className="row-fluid pt-4">
                <div className='row pt-2' style={{ "background": "#bfc8ce" }} >
                    <div className='col '>
                        <div className='row'>
                            <div className='col-1 px-3  mx-2 mt-2'>
                                <img src={LogoLat} alt="SVG logo image" width={30} height={30} />
                            </div>
                            <div className='col'>
                                <label htmlFor="username" className='fs-2 fw-bold' > Latitud:</label>
                                <p>{dataLote.latidud}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col ' >

                        <div className='row'>
                            <div className='col-1 px-3 mx-2 mt-2'>
                                <img src={LogoLong} alt="SVG logo image" width={30} height={30} />
                            </div>
                            <div className='col'>
                                <label htmlFor="username" className='fs-2 fw-bold' > Longitud:</label>
                                <p>{dataLote.latidud}</p>
                            </div>
                        </div>
                    </div>

                    <div className='col ' >
                        <div className='row'>
                            <div className='col-1 px-3 mx-2 '>
                                <i class="bi bi-house-door-fill" style={{ "font-size": " 30px" }} ></i>
                            </div>
                            <div className='col'>
                                <label htmlFor="username" className='fs-2 fw-bold' > Nombre:</label>
                                <p>{dataLote.nombre}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col ' >
                        <div className='row'>
                            <div className='col-1 px-3 mx-2 mt-2'>
                                <img src={LogoLat} alt="SVG logo image" width={30} height={30} />
                            </div>
                            <div className='col'>
                                <label htmlFor="username" className='fs-2 fw-bold' > Area:</label>
                                <p>{dataLote.area}</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-12  py-3">
                    <div className='row mt-2 mx-5 px-5'>
                        <div className='col-3 d-grid'>
                            <Link className='btn text-white' style={{ "background": "#2c4464" }} to="create" state={{ data: dataLote }}>Añadir sector</Link>
                        </div>
                        <div className='col-3 d-grid'>
                            <Link className='btn text-white' style={{ "background": "#2c4464" }} to="sectores" state={{ data: dataLote.id }}>Sectores</Link>
                        </div>
                        <div className='col-3 d-grid'>
                            <Link className='btn text-white' style={{ "background": "#2c4464" }} to="update" state={{ data: dataLote }}>Actualizar Lote</Link>
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

export default LoteDetalle;

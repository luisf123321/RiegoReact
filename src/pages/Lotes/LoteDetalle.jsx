import React, { useState, useEffect } from 'react';
import LogoLat from "../../Assets/Logo_location_lat.svg"
import LogoLong from "../../Assets/Logo_location_long.svg"
const LoteDetalle = () => {

    const [dataLote, setdataLote] = useState({});

    const getLoteInformation = async () => {
        let response = await fetch("https://riegoback.herokuapp.com/lote/" + sessionStorage.getItem("idLote"), {
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
        <div className="container-fluid"  style={{ "padding-left": "18%", "padding-top": "5%"}}>
            <div className="row-fluid ">
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
            </div>
        </div>
    );
}

export default LoteDetalle;

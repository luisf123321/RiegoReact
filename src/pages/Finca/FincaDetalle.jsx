import React, { Component, Fragment, useState, useEffect, useId } from 'react';
import '../../Styles/css/card.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useLocation } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import LogoLat from "../../Assets/Logo_location_lat.svg"
import LogoLong from "../../Assets/Logo_location_long.svg"
const FincaDetalle = () => {
    const [dataFinca, setdataFinca] = useState([]);
    const [datosClima, setdatosClima] = useState({
        temp:{},
        wind:{},
        detail_status:'',
        humedad:''
    });
    const location = useLocation();

    const getFincaDetail = async () => {
        let idfinca = location.state.idItem;
        console.log(idfinca)
        let response = await fetch("https://riegoback.herokuapp.com/finca/" + sessionStorage.getItem("idFinca"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })

        if (response.status === 200) {
            let dataResponse = await response.json();
            setdataFinca(dataResponse.finca);
            getClima(dataResponse.finca.latidud, dataResponse.finca.longitud);
            //getFores(dataResponse.finca.latidud, dataResponse.finca.longitud);
        }
    }



    const getClima = async (lat, long) => {
        let response = await fetch("https://riegoback.herokuapp.com/clima/coordenadas/" + lat + "/" + long, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
        if (response.status === 200) {
            let dataResponse = await response.json();
            setdatosClima(dataResponse);
            console.log(dataResponse)
        }
    }

    useEffect(() => {
        document.body.style.background = "#EDEFF0";
        getFincaDetail();
    }, []);



    return (
        <div className="container-fluid" style={{ "padding-left": "18%", "padding-top": "5%"}} >
            <div className="row-fluid ">
                <div className='row pt-2' style={{"background":"#bfc8ce"}} >
                    <div className='col '>
                        <div className='row'>
                            <div className='col-1 px-3  mx-2 mt-2'>
                                <img src={LogoLat} alt="SVG logo image" width={30} height={30} />
                            </div>
                            <div className='col'>
                                <label htmlFor="username" className='fs-2 fw-bold' > Latitud:</label>
                                <p>{dataFinca.latidud}</p>
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
                                <p>{dataFinca.longitud}</p>
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
                                <p>{dataFinca.nombre}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col ' >
                        <div className='row'>
                            <div className='col-1 px-3 mx-2 mt-2'>
                                <img src={LogoLat} alt="SVG logo image" width={30} height={30} />
                            </div>
                            <div className='col'>
                                <label htmlFor="username" className='fs-2 fw-bold' > Dirección:</label>
                                <p>{dataFinca.direccion}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row bg-light pt-2' >
                    <div className='col '>
                        <div className='mx-2 px-2'>
                            <p className='fs-6 '><i class="bi bi-cloud-sun"></i> Estado: {datosClima.detail_status}</p>
                        </div>
                    </div>
                    <div className='col ' >
                        <div className='mx-2 px-2'>
                            <p className='fs-6 '><i class="bi bi-thermometer-sun"></i> Temperatura: {datosClima.temp.temp}</p>
                        </div>
                    </div>

                    <div className='col ' >
                        <div className='mx-2 px-2' >
                            <p className='fs-6 '><i class="bi bi-wind"></i> Viento: {datosClima.wind.speed}</p>
                        </div>
                    </div>
                    <div className='col ' >
                        <div className='mx-2 px-2' >
                            <p className='fs-6 '>Humedad: {datosClima.humedad}</p>
                        </div>
                    </div>
                </div>

                <div className="col-12  py-3">
                    <div className='row mt-2 mx-5 px-5'>
                        <div className='col-3 d-grid'>
                            <Link className='btn text-white' style={{"background":"#2c4464"}}  to="fores" state={{ lat: dataFinca.latidud, long: dataFinca.longitud }}>Pronósticos</Link>
                        </div>
                        <div className='col-3 d-grid'>
                            <Link className='btn text-white'  style={{"background":"#2c4464"}}   to="lotes" state={{ data: dataFinca.id }}>Lotes</Link>
                        </div>
                        <div className='col-3 d-grid'>
                            <Link className='btn text-white'  style={{"background":"#2c4464"}}   to="create" state={{ data: dataFinca.id }}>Nuevo Lote</Link>
                        </div>
                        <div className='col-3 d-grid'>
                            <Link className='btn text-white'  style={{"background":"#2c4464"}}   to="update" state={{ data: dataFinca}}>Actualizar Finca</Link>
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

export default FincaDetalle;

import React, { Component, Fragment, useState, useEffect, useId } from 'react';
import '../../Styles/css/card.css';
import 'bootstrap/dist/css/bootstrap.css';
import Card from '../../components/Card/Card';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import ChartLine from '../../components/charts/ChartLine';
const FincaDetalle = () => {
    const [dataFinca, setdataFinca] = useState([]);
    const navigate = useNavigate();
    const [datosLotes, setdatoslotes] = useState([]);
    const [datosClima, setdatosClima] = useState([]);
    const [viewData, setviewData] = useState(false);
    const [viewDataChart, setviewDataChart] = useState(false);
    const [dataFores, setdataFores] = useState([]);
    const location = useLocation();

    const getFincaDetail = async () => {
        let idfinca = location.state.idItem;
        console.log(idfinca)
        let response = await fetch("https://riegoback.herokuapp.com/finca/" + idfinca, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })

        if (response.status === 200) {
            let dataResponse = await response.json();
            console.log(dataResponse.finca);
            setdataFinca(dataResponse.finca);
            getClima(dataResponse.finca.latidud, dataResponse.finca.longitud);
            getFores(dataResponse.finca.latidud, dataResponse.finca.longitud);
        }
    }

    const getLotes = async () => {
        let idfinca = location.state.idItem;
        let response = await fetch("https://riegoback.herokuapp.com/lote/finca/" + idfinca, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
        if (response.status === 200) {
            let dataResponse = await response.json();
            console.log(dataResponse.lotes);
            setdatoslotes(dataResponse.lotes);
            setviewData(true);
        }
    }

    const getClima = async (lat, long) => {
        let response = await fetch("http://127.0.0.1:5000/clima/coordenadas/" + lat + "/" + long, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
        if (response.status === 200) {
            let dataResponse = await response.json();
            console.log(dataResponse);
            setdatosClima(dataResponse)
        }
    }


    const getFores = async (lat, long) => {
        let response = await fetch("http://127.0.0.1:5000/clima/forecast/coordenadas/" + lat + "/" + long, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
        if (response.status === 200) {
            let dataResponse = await response.json();
            console.log(dataResponse);
            setdataFores(dataResponse);
        }
    }


    const Lot = datosLotes.map((datos, index) => {
        return <Card key={index} card={datos} rutaToDetalle="/lotes/detalle" />;
    });

    const charlineHumedad = () => {
        console.log(dataFores.humedad);
        let humedad = dataFores.humedad;
        let labels = dataFores.fecha; 
        const data = {
            labels,
            datasets: [
                {
                    label: 'Humedad',
                    data: humedad,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        };
        return < ChartLine data={data} />
    };

    const charlineTemp = () => {
        console.log(dataFores.temp);
        let temp = dataFores.temp;
        let labels = dataFores.fecha; 
        const data = {
            labels,
            datasets: [
                {
                    label: 'Temp',
                    data: temp,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        };
        return < ChartLine data={data} />
    };
    useEffect(() => {
        getFincaDetail();
        getLotes();

    }, []);



    return (
        <div className="container-fluid" >
            <div className="row ">

                <div className="col-3 px-5 py-3">
                    <div>
                        <p className='fw-bold'>Informacion General</p>
                        <p> <span className='fw-bold'> Nombre: </span> {dataFinca.nombre}</p>
                        <p><span className='fw-bold'> Direccion: </span> {dataFinca.direccion}</p>
                        <p><span className='fw-bold'> Longitud: </span> {dataFinca.longitud}</p>
                        <p><span className='fw-bold'> Latitud: </span>{dataFinca.latidud}</p>
                        <p><span className='fw-bold'> Altitud: </span>{dataFinca.altitud}</p>
                    </div>
                    <div>
                        <p className='fw-bold'>Informacion de climatologica</p>
                        <p><span className='fw-bold'> Estado: </span>{datosClima.detail_status}</p>
                        <p><span className='fw-bold'><i class="bi bi-thermometer"></i>Humedad: </span> {datosClima.humedad}</p>
                        <p><span className='fw-bold'> <i class="bi bi-thermometer-sun"></i>Temperatura: </span> { }</p>
                        <p><span className='fw-bold'> Viento: </span>{ }</p>
                    </div>
                </div>
                <div className="col-9 px-3 py-3">
                    
                    <>
                        {charlineHumedad()}
                    </>
                    <>
                        {charlineTemp()}
                    </>
                    <div className="row ">
                        {viewData ? Lot : null}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default FincaDetalle;

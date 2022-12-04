import React, { Component, Fragment, useState, useEffect, useId } from 'react';
import '../../Styles/css/card.css';
import 'bootstrap/dist/css/bootstrap.css';
import {useParams } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import ChartLine from '../../components/charts/ChartLine';

const FincaForest = (props) => {
    const location = useLocation();
    const [viewDataChart, setviewDataChart] = useState(false);
    const lat = location.state?.lat;
    const long = location.state?.long;
    const [dataFores, setdataFores] = useState([]);
    const getFores = async (lat, long) => {
        let response = await fetch("https://sirbic.up.railway.app/clima/forecast/coordenadas/" + lat + "/" + long, {
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
                    borderColor: 'rgb(45, 82, 249)',
                    backgroundColor: 'rgba(45, 82, 249, 0.5)',
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
                    label: 'Temperatura',
                    data: temp,
                    borderColor: 'rgb(5, 218, 230)',
                    backgroundColor: 'rgba(5, 218, 230, 0.5)',
                }
            ],
        };
        return < ChartLine data={data} />
    };

    useEffect(() => {
        console.log(lat);
        console.log(lat.long)
        getFores(lat, long);
    }, []);
    return (
        <div>
            <div className='row '>
            <>
                    {charlineTemp()}
                </>
                <>
                    {charlineHumedad()}
                </>
                
            </div>
        </div>
    );
}

export default FincaForest;

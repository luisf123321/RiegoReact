import React, { Component, Fragment, useState, useEffect } from 'react';
import * as grIcon from 'react-icons/gr';
import { useLocation } from "react-router-dom";
import Card from '../../components/Card/Card';
const Lotes = () => {
    const location = useLocation();

    const [datosLotes, setdatoslotes] = useState([]);

    const getLotes = async()=>{
        let idfinca = location.state.idItem;
        await fetch("https://riegoback.herokuapp.com/lote/finca/"+idfinca, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then(resq => resq.json())
            .then(data => setdatoslotes( data.lotes ))
    }
    const Lot = datosLotes.map((datos, index) => {
        return <Card key={index} card={datos} rutaToDetalle="/lotes/detalle" rutaToPage="/sectores" textToPage="Sectores" textToDetalle="Detalle" />;
    });

    useEffect(() => {
        getLotes();
    }, []);

    return (
        <Fragment>
            <div className="container-fluid" >
                <div className="row ">
                    <div className="col-3 px-5 py-3 ">
                        <h1 className="mt-3 mb-3 px-2" >Lotes </h1>
                        <div className="dropdown-divider mt-3 mr-3 ml-3"></div>
                        <div className="px-2" >
                            <h2 className="text-primary mb-3" > Total de Lotes Registrados: {' ' + datosLotes.length} </h2>
                        </div>
                        <div className="dropdown-divider mt-3 mr-3 ml-3" ></div>
                    </div>
                    <div className="col-9 px-3 py-3">
                        <div className="row ">
                            {Lot}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}

export default Lotes;
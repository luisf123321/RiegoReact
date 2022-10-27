import React, { Component, Fragment, useState, useEffect, useId } from 'react';
import '../../Styles/css/card.css';
import 'bootstrap/dist/css/bootstrap.css';
import Card from '../../components/Card/Card';
import { useLocation } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";

const FincaLotes = () => {
    const [datosLotes, setdatoslotes] = useState([]);
    const [viewData, setviewData] = useState(false);
    const location = useLocation();
    const data = location.state?.data;
    const getLotes = async () => {
        let idfinca = data;
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
            setdatoslotes(dataResponse.lotes);
            setviewData(true);
        }
    }
    const Lot = datosLotes.map((datos, index) => {
        return <Card key={index} card={datos} rutaToDetalle="/lotes/detalle" />;
    });
    useEffect(() => {
        getLotes();
    }, []);

    return (
        <div>
            <div className="row ">
                {viewData ? Lot : null}
            </div>
        </div>
    );
}

export default FincaLotes;

import React, {useEffect} from 'react';
import Prediction from '../../components/forms/Prediction';
import { Routes, Route, Link, Outlet } from 'react-router-dom';


const PredictionSoilPage = () => {

    useEffect(() => {
        document.body.style.background = "#c1c5ca";
    }, []);
    return (
        <div className='container-fluid ' style={{ "padding-left": "18%","background":"#c1c5ca" }}>
            <div className='row pt-3'>
                <h1 className='px-5'>Muestras de suelo</h1>
                <div className='px-5 pt-3'>
                    <Link className='btn mx-2 text-white' style={{ "background": "#2c4464" }} to="lista">Listado de muestras</Link>
                    <Link className='btn mx-2 text-white' style={{ "background": "#2c4464" }} to="crear"><i class="bi bi-plus-circle"></i> Clasificacion de muestras</Link>
                </div>
                <div className='col-12 px-5 pt-3 pb-5' style={{"background":"#c1c5ca"}}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default PredictionSoilPage;

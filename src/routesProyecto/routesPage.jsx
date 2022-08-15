import React from 'react';
import Fincas from "../pages/Finca/fincas"
import Lotes from '../pages/Lotes/Lotes';
import Navbar from '../components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import Cultivos from '../pages/Cultivos/Cultivos';
import PredictionSoilPage from '../pages/Predictions/PredictionSoilPage';
import NotFoundPage from '../pages/404/NotFoundPage';
import FincaDetalle from '../pages/Finca/FincaDetalle';
import LoteDetalle from '../pages/Lotes/LoteDetalle';
import Sectores from '../pages/Sectores/Sectores';
const RoutesPage = () => {

    const token = localStorage.getItem("token");

    const na = token && token !== '' && token != undefined;
        
    return (
         <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact={true} path="/" element={<LoginPage />} />
                <Route exact={true} path="/cultivos" element={<Cultivos />} />
                <Route exact={true} path="/lotes" element={<Lotes />} />
                <Route exact={true} path="/lotes/detalle" element={<LoteDetalle />} />
                <Route exact={true} path="/fincas" element={<Fincas />} />
                <Route exact={true} path="/fincas/detalle" element={<FincaDetalle />} />
                <Route exact={true} path="/sectores" element={<Sectores />} />
                <Route exact={true} path="/prediction" element={<PredictionSoilPage />} />
                <Route path='*' element={<NotFoundPage />} />

            </Routes>
        </BrowserRouter>        
    );
}

export default RoutesPage;

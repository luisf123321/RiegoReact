import React from 'react';
import Fincas from "../pages/Finca/fincas"
import Lotes from '../pages/Lotes/Lotes';
import Navbar from '../components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import Cultivos from '../components/cultivo/Cultivos';
import PredictionSoilPage from '../pages/Predictions/PredictionSoilPage';

import FincaDetalle from '../pages/Finca/FincaDetalle';
import LoteDetalle from '../pages/Lotes/LoteDetalle';
const RoutesPage = () => {
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

                <Route exact={true} path="/prediction" element={<PredictionSoilPage />} />

            </Routes>
        </BrowserRouter>
    );
}

export default RoutesPage;

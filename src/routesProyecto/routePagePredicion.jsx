import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PredictionSoilPage from '../pages/Predictions/PredictionSoilPage';
import Inicio from '../pages/Predictions/Inicio';
import Prediction from '../components/forms/Prediction';
import MuestraSuelo from '../pages/Predictions/MuestraSuelo';
const RoutePagePredicion = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<PredictionSoilPage />} >
                    
                    <Route
                        path="lista"
                        element={<MuestraSuelo />}
                    />
                    <Route
                        path="crear"
                        element={<Prediction />}
                    />
                    <Route
                        path="/"
                        element={<Inicio />}
                    />
                </Route>
            </Routes>
        </>
    );
}

export default RoutePagePredicion;

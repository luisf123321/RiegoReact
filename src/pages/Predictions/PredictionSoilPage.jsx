import React from 'react';
import Prediction from '../../components/forms/Prediction';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import VentanaModal from '../../components/modals/VentanaModal';

const PredictionSoilPage = () => {
    return (
        <div>
            <Prediction />            
        </div>
    );
}

export default PredictionSoilPage;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Fincas from '../pages/Finca/fincas';
import FincaDetalle from '../pages/Finca/FincaDetalle';
const RoutesPageFinca = () => {
    return (
        <Routes>
            <Route path="/" element={<Fincas />} />
            <Route path="detalle" element={<FincaDetalle />} />
        </Routes>
    );
}

export default RoutesPageFinca;

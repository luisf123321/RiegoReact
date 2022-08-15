import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Lotes from '../pages/Lotes/Lotes';
import LoteDetalle from '../pages/Lotes/LoteDetalle';
const RoutePageLote = () => {
    return (
        <Routes>
            <Route path="/" element={<Lotes />} />
            <Route path="detalle" element={<LoteDetalle />} />
        </Routes>
    );
}

export default RoutePageLote;

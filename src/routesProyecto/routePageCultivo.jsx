import React from 'react';
import Cultivos from '../pages/Cultivos/Cultivos';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const RoutePageCultivo = () => {
    return (
        <Routes>
            <Route path="/" element={<Cultivos />} />

        </Routes>
    );
}

export default RoutePageCultivo;

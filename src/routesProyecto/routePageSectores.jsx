import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sectores from '../pages/Sectores/Sectores';
const RoutePageSectores = () => {
    return (
        <Routes>
        <Route path="/" element={<Sectores />} />
        
    </Routes>
    );
}

export default RoutePageSectores;

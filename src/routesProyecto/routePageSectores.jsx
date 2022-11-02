import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SectorDetalle from '../pages/Sectores/SectorDetalle';
import Sectores from '../pages/Sectores/Sectores';
import Navbar from '../components/Navbar';
const RoutePageSectores = () => {
    return (
        <>
            <Navbar />
            <Routes>
            
            <Route path="/" element={<Sectores />} >

            </Route>
            <Route path="/detalle" element={<SectorDetalle />} >
            </Route>

        </Routes>
        </>
        
    );
}

export default RoutePageSectores;

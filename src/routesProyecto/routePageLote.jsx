import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Lotes from '../pages/Lotes/Lotes';
import LoteDetalle from '../pages/Lotes/LoteDetalle';
import Navbar from '../components/Navbar';
import SectorForm from '../components/forms/SectoresForm';
import LoteSectores from '../pages/Lotes/LoteSectores';
import LoteFormActualizar from '../components/forms/LoteFormActualizar';
const RoutePageLote = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Lotes />} />
                <Route path="detalle" element={<LoteDetalle />} >
                    <Route
                        path="sectores"
                        element={<LoteSectores />}
                    />
                    <Route
                        path="create"
                        element={<SectorForm />}
                    />
                    <Route
                        path="update"
                        element={<LoteFormActualizar />}
                    />
                </Route>
            </Routes>
        </>
    );
}

export default RoutePageLote;

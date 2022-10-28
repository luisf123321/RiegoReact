import React from 'react';
import Cultivos from '../pages/Cultivos/Cultivos';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cultivo from '../components/cultivo/Cultivo';
import CultivosForm from '../components/forms/CultivosForm';
import Navbar from '../components/Navbar';
import CultivoDetalle from '../pages/Cultivos/CultivoDetalle';
const RoutePageCultivo = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Cultivos />} >
                    <Route
                        path="lista"
                        element={<Cultivo />}
                    />
                    <Route
                        path="/"
                        element={<Cultivo />}
                    />
                    <Route
                        path="crear"
                        element={<CultivosForm />}
                    />
                </Route>
                <Route path="/detalle" element={<CultivoDetalle />} >                    
                    <Route
                        path="update"
                        element={<CultivosForm />}
                    />
                    <Route
                        path="estadisticas"
                        element={<CultivosForm />}
                    />
                    <Route
                        path="sectores"
                        element={<CultivosForm />}
                    />         
                </Route>

            </Routes>
        </>
    );
}

export default RoutePageCultivo;

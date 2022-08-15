import React from 'react';
import Cultivos from '../pages/Cultivos/Cultivos';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cultivo from '../components/cultivo/Cultivo';
const RoutePageCultivo = () => {
    return (
        <Routes>
            <Route path="/" element={<Cultivos />} >
                <Route
                    path="/"
                    element={<Cultivo />}
                />
                
            </Route>

        </Routes>
    );
}

export default RoutePageCultivo;

import React from 'react';
import Cultivos from '../pages/Cultivos/Cultivos';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cultivo from '../components/cultivo/Cultivo';
import CultivosForm from '../components/forms/CultivosForm';

const RoutePageCultivo = () => {
    return (
        <Routes>
            <Route path="/" element={<Cultivos />} >
                <Route
                    path="lista"
                    element={<Cultivo />}
                />
                <Route
                    path="crear"
                    element={<CultivosForm />}
                />
            </Route>

        </Routes>
    );
}

export default RoutePageCultivo;

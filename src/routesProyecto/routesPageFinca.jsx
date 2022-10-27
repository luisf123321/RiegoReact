import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Fincas from '../pages/Finca/fincas';
import FincaDetalle from '../pages/Finca/FincaDetalle';
import FincaForm from '../components/forms/FincaForm';
import ListFinca from '../pages/Finca/ListFinca';
import FincaForest from '../pages/Finca/FincaForest';
import FincaLotes from '../pages/Finca/FincaLotes';
import LoteForm from '../components/forms/LoteForm';
import FincaFormActulizar from '../components/forms/FincaFormActualizar';
import Navbar from '../components/Navbar';
const RoutesPageFinca = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Fincas />} >
                    <Route
                        path="crear"
                        element={<FincaForm />}
                    />
                    <Route
                        path="lista"
                        element={<ListFinca />}
                    />
                    <Route
                        path="/"
                        element={<ListFinca />}
                    />

                </Route>
                <Route path="/detalle" element={<FincaDetalle />} >
                    <Route
                        path="fores"
                        element={<FincaForest />}
                    />
                    <Route
                        path="lotes"
                        element={<FincaLotes />}
                    />

                    <Route
                        path="create"
                        element={<LoteForm />}
                    />
                    <Route
                        path="update"
                        element={<FincaFormActulizar />}
                    />
                </Route>
            </Routes>   </>
    );
}

export default RoutesPageFinca;

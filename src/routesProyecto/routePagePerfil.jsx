import React from 'react';
import Perfil from '../pages/perfil/Perfil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
const RoutePagePerfil = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Perfil />} >

                </Route>

            </Routes>

        </>
    );
}

export default RoutePagePerfil;

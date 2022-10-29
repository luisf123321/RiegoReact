import React from 'react';
import Perfil from '../pages/perfil/Perfil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import UpdateUsuario from '../components/forms/UpdateUsuario';
import CambioContrasena from '../components/forms/CambioContrasena';
const RoutePagePerfil = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Perfil />} >
                <Route
                        path="usuario"
                        element={<UpdateUsuario />}
                    />
                     <Route
                        path="cambio"
                        element={<CambioContrasena />}
                    />
                    
                </Route>

            </Routes>

        </>
    );
}

export default RoutePagePerfil;

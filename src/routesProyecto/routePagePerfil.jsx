import React from 'react';
import Perfil from '../pages/perfil/Perfil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import UpdateUsuario from '../components/forms/UpdateUsuario';
import ChangePassword from '../components/forms/ChangePassword';
import PerfilInfo from '../pages/perfil/PerfilInfo';
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
                        element={<ChangePassword />}
                    />
                    <Route
                        path="/"
                        element={<PerfilInfo />}
                    />
                    <Route
                        path="info"
                        element={<PerfilInfo />}
                    />
                </Route>

            </Routes>

        </>
    );
}

export default RoutePagePerfil;

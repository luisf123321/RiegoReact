import React from 'react';
import Fincas from "../pages/Finca/fincas"
import Lotes from '../pages/Lotes/Lotes';
import Navbar from '../components/Navbar';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import Cultivos from '../components/cultivo/Cultivos';

const RoutesPage = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact={true} path="/" element={<LoginPage />} />
                <Route exact={true} path="/cultivos" element={<Cultivos />} />
                <Route exact={true} path="/lotes" element={<Lotes />} />
                <Route exact={true} path="/fincas" element={<Fincas />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesPage;

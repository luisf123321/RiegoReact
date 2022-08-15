import React from 'react';
import Fincas from "../pages/Finca/fincas"
import Lotes from '../pages/Lotes/Lotes';
import Navbar from '../components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RoutePageCultivo from './routePageCultivo';
import PredictionSoilPage from '../pages/Predictions/PredictionSoilPage';
import NotFoundPage from '../pages/404/NotFoundPage';
import RoutePageSectores from './routePageSectores';
import RoutesPageFinca from './routesPageFinca';
import RoutePageLote from './routePageLote';
const RoutesPage = () => {

    const token = localStorage.getItem("token");

    const na = token && token !== '' && token != undefined;
        
    return (
         <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact={true} path="/" element={<LoginPage />} />
                <Route exact={true} path="/cultivos/*" element={<RoutePageCultivo />} />
                <Route exact={true} path="/lotes/*" element={<RoutePageLote />} />                
                <Route exact={true} path="/fincas/*" element={<RoutesPageFinca />} />
                <Route exact={true} path="/sectores/*" element={<RoutePageSectores />} />
                <Route exact={true} path="/prediction" element={<PredictionSoilPage />} />
                <Route exact={true} path="/perfil" element={<PredictionSoilPage />} />
                <Route path='*' element={<NotFoundPage />} />

            </Routes>
        </BrowserRouter>        
    );
}

export default RoutesPage;

import React from 'react';
import Fincas from "../pages/Finca/fincas"
import Lotes from '../pages/Lotes/Lotes';
import Navbar from '../components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RoutePageCultivo from './routePageCultivo';
import NotFoundPage from '../pages/404/NotFoundPage';
import RoutePageSectores from './routePageSectores';
import RoutesPageFinca from './routesPageFinca';
import RoutePageLote from './routePageLote';
import RegistroPage from '../pages/auth/RegistroPage';
import RoutePageHome from './routePageHome';
import RoutePagePredicion from './routePagePredicion';
import RoutePageRiego from './routePageRiego';
import RoutePagePerfil from './routePagePerfil';
const RoutesPage = () => {

    const token = localStorage.getItem("token");

    const na = token && token !== '' && token != undefined;
        
    return (
         <BrowserRouter>
           
            <Routes  >
                <Route exact={true} path="/" element={<LoginPage />} />
                <Route exact={true} path="/singup" element={<RegistroPage />} />
                <Route exact={true} path="/home/*" element={<RoutePageHome />} />
                <Route exact={true} path="/cultivos/*" element={<RoutePageCultivo />} />
                <Route exact={true} path="/lotes/*" element={<RoutePageLote />} />                
                <Route exact={true} path="/fincas/*" element={<RoutesPageFinca />} />
                <Route exact={true} path="/sectores/*" element={<RoutePageSectores />} />
                <Route exact={true} path="/prediction/*" element={<RoutePagePredicion />} />
                <Route exact={true} path="/riego/*" element={<RoutePageRiego />} />
                <Route exact={true} path="/perfil/*" element={<RoutePagePerfil />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>        
    );
}

export default RoutesPage;

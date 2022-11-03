import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Riegos from '../pages/riego/Riegos';
import AdminRiegoForm from '../components/forms/AdminRiegoForm';
import DispositivosForm from '../components/forms/DispositivosForm'; 
import RiegoList from '../components/riego/RiegoList';
import DispositivosList from '../components/riego/DispositivosList';
const RoutePageRiego = () => {
    return (
        <>
            <Navbar />
            <Routes >
                <Route path="/" element={<Riegos />} >
                    <Route
                        path="riego_admins"
                        element={<RiegoList />}
                    />
                    <Route
                        path="dispositive_admins"
                        element={<DispositivosList />}
                    />
                    <Route
                        path="new_admin"
                        element={<AdminRiegoForm />}
                    />
                    <Route
                        path="new_dispositive"
                        element={<DispositivosForm />}
                    />
                </Route>
            </Routes>
        </>
    );
}

export default RoutePageRiego;

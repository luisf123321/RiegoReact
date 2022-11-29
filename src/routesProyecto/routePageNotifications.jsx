import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NotificacionPage from '../pages/Notifications/NotificacionPage';
const RoutePageNotifications = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<NotificacionPage />} >

                </Route>
            </Routes>

        </>
    );
}

export default RoutePageNotifications;

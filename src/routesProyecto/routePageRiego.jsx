import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Riegos from '../pages/riego/Riegos';
const RoutePageRiego = () => {
    return (
        <>
            <Navbar />
            <Routes >
                <Route path="/" element={<Riegos />} >

                </Route>
            </Routes>
        </>
    );
}

export default RoutePageRiego;

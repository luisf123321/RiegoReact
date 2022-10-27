import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HomePage from '../pages/Home/HomePage';
const RoutePageHome = () => {
    return (
        <>
        <Navbar />
        <Routes>            
            <Route path="/" element={<HomePage />} >
            </Route>
        </Routes>
        </>
    );
}

export default RoutePageHome;

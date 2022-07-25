import React, { Component } from 'react';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Cultivos from './components/cultivo/Cultivos';
import Navbar from './components/Navbar';
import './Styles/css/app.css'
import Lotes from './components/lote/Lotes';
import Fincas from './components/finca/fincas'
import Estadisticas from './components/Estadisticas';
import Lote from './components/lote/Lote';
class App extends Component{


    render(){        
        return(
            
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route exact={true} path="/" element={<Login />} />
                    <Route exact={true} path="/cultivos" element={<Cultivos />}  />
                    <Route exact={true} path="/lotes" element={<Lote />}  />
                    {/*
                    <Route exact={true} path="/calendario" component={Calendario}  />
                    <Route exact={true} path="/estadisticas" component={Estadisticas}  />
                    */}
                    
                    <Route exact={true} path="/fincas" element={<Fincas/>}  />
                </Routes>
            </BrowserRouter>

        );
    }
}

export default App;
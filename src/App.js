import React, { Component } from 'react';
import { BrowserRouter,  Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Cultivos from './components/Cultivos';
import Navbar from './components/Navbar';
import './Styles/css/app.css'
import Lotes from './components/Lotes';
import Calendario from './components/Calendario';
import Estadisticas from './components/Estadisticas';
class App extends Component{


    render(){        
        return(
            
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact={true} path="/" component={Login}  />
                    <Route exact={true} path="/cultivos" component={Cultivos}  />
                    <Route exact={true} path="/lotes" component={Lotes}  />
                    <Route exact={true} path="/calendario" component={Calendario}  />
                    <Route exact={true} path="/estadisticas" component={Estadisticas}  />
                </Switch>
            </BrowserRouter>

        );
    }
}

export default App;
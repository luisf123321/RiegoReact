import React, { Component } from 'react';
import { BrowserRouter,  Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Cultivos from './components/Cultivos';
import Navbar from './components/Navbar';
import './Styles/css/app.css'
import Lotes from './components/Lotes';
import Calendario from './components/Calendario';
class App extends Component{


    render(){
        
        const token = sessionStorage.getItem("token");
        
        return(
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact={true} path="/" component={Login}  />
                    <Route exact={true} path="/cultivos" component={Cultivos}  />
                    <Route exact={true} path="/lotes" component={Lotes}  />
                    <Route exact={true} path="/calendario" component={Calendario}  />
                </Switch>
            </BrowserRouter>

        );
    }
}

export default App;
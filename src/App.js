import React, { Component } from 'react';
import { BrowserRouter,  Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Cultivos from './components/Cultivos';
import Navbar from './components/Navbar';
import './Styles/css/app.css'
class App extends Component{


    render(){
        return(
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact={true} path="/" component={Login}  />
                    <Route exact={true} path="/cultivos" component={Cultivos}  />
                </Switch>
            </BrowserRouter>

        );
    }
}

export default App;
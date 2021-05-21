import React from 'react';
import ReactDOM from 'react-dom';

class Registro extends React.Component {


    render(){
        const nombre = "luis fernando";
        const apellido = "enciso";
        return(
            
            <div>
                <h1>registro</h1>
                <h1>{nombre} <br /> {apellido}</h1>

            </div>
        );

    }

}

export default Registro;


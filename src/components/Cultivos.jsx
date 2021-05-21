import React, { Component, Fragment } from 'react';
import Cultivo from './Cultivo';

class Cultivos extends Component{

    componentDidMount(){
        this.getlotes()
    }

    state = {
        datosLotes : []
    }

    getlotes(){
        fetch("http://localhost:5000/cultivos",{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
            }
        })
        .then(response => response.json()).then(data => this.setState({datosLotes:data.cultivos}))
    }

    render(){

        console.log(this.state.datosLotes)

        const cul = this.state.datosLotes.map((datos,index)=>{                        
            return <Cultivo key={index} cultivo_name={datos.cultivo} />;
        })
        
        return(
            <Fragment>
                <div className="container">
                    <div className="row">               
                        {
                            cul
                        }
                    </div>
                </div>  
            </Fragment>
        )
    }
}

export default Cultivos;
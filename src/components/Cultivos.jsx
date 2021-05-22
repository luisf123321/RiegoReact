import React, { Component, Fragment } from 'react';
import Cultivo from './Cultivo';
import '../Styles/css/card.css';
import * as grIcon from 'react-icons/gr';
import 'bootstrap/dist/css/bootstrap.css';
class Cultivos extends Component{

    componentDidMount(){
        this.getCultivos()
    }

    state = {
        datosCultivo : []
    }

    getCultivos(){
        fetch("https://riego-flask.herokuapp.com/cultivos",{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
            }
        })
        .then(response => response.json()).then(data => this.setState({datosCultivo:data.cultivos}))
    }

    render(){

        console.log(this.state.datosCultivo)
        
        const cul = this.state.datosCultivo.map((datos,index)=>{                        
            return  <Cultivo key={index} cultivo_name={datos.cultivo} /> ;
        })
        /*
        const cul = this.state.datosLotes.map((datos,index)=>{                        
            return <div className="card mt-3 mr-3 ml-3 mb-3" style={{"width": "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">{datos.cultivo}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
            </div>
        </div>;
        })

        */
        return(
            <Fragment>
                
                <div className="container" >
                    <div className="row  mt-3 mb-3  pt-3 pb-3 border rounded border-primary bg-light">
                        <div className="col-3 px-4 ml-3 mr-3 mt-3 mb-3 pt-3 pb-3 pr-3 pl-3 ">
                            <h1 className="mt-3 mb-3 px-2 ">Cultivos </h1> 
                            <div class="dropdown-divider  "></div>
                            <div  className="px-2 " >                            
                                <h2 className="text-primary mb-3" > Total de Cultivos Registrados: {' '+this.state.datosCultivo.length} </h2>                     
                                <button type="button" class="btn btn-success"> <grIcon.GrAddCircle/>Agregar Cultivo</button>                            
                            </div>
                            <div class="dropdown-divider " ></div> 
                        </div>
                        <div className="col ml-3 pr-3">                             
                            <div className="row px-4 ml-3 mr-3 mt-3 mb-3 pt-3 pb-3 pr-3 pl-3 ">
                                {cul}
                            </div>
                        </div>
                           
                        
                    </div>
                </div>  
            </Fragment>
        )
    }
}

export default Cultivos;
import React, { Component, Fragment } from 'react';
import LineGraf from './LineGraf'
import * as grIcon from 'react-icons/gr';

class Estadisticas extends Component{




    render(){
        return(
            <Fragment>
                <div className="container" >
                    <div className="row  mt-3 mb-3  pt-3 pb-3 border rounded border-primary bg-light">
                        <div className="col-3 px-4 ml-3 mr-3 mt-3 mb-3 pt-3 pb-3 pr-3 pl-3 ">
                            <h1 className="mt-3 mb-3 px-2 ">Estadisticas </h1> 
                            <div class="dropdown-divider  "></div>
                            <div  className="px-2 " >                                                 
                                <button type="button" class="btn btn-success"> <grIcon.GrAddCircle/>Humedad Suelo</button>
                                <button type="button" class="btn btn-success"> <grIcon.GrAddCircle/>Capacidad De Campo</button>
                                <button type="button" class="btn btn-success"> <grIcon.GrAddCircle/>Cantidad de Agua Aplicada</button>                            
                            </div>
                            <div class="dropdown-divider " ></div> 
                        </div>
                        <div className="col-4 ">                             
                            <div className="row px-2 ml-3 mr-3 mt-3 mb-3 pt-3 pb-3 pr-3 pl-3 ">
                                <LineGraf />
                                <LineGraf />
                                <LineGraf />
                                <LineGraf />
                            </div>
                        </div>
                        <div className="col-4 ">                             
                            <div className="row px-2 ml-3 mr-3 mt-3 mb-3 pt-3 pb-3 pr-3 pl-3 ">
                                <LineGraf />
                                <LineGraf />
                                <LineGraf />
                                <LineGraf />
                            </div>
                        </div>
                           
                        
                    </div>
                </div>  

            </Fragment>
        )
    }
}

export default Estadisticas;
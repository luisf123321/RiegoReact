import React, { Component, Fragment } from 'react';

import Lote from './Lote'

class Lotes extends Component{

    componentDidMount(){
        this.getLotes()
    }

    state = {
        datosLotes:[]
    }

    getLotes(){
        fetch("http://localhost:5000/Lotes",{
            method:GET,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
            }
        }).then(resq =>resq.json() )
        .then(data =>this.setState({ datosLotes:data.lotes}))
    }

    render(){
        console.log(this.state.datosLotes);

        const Lot = this.state.datosLotes.map((datos, index)=>{
            return <Lotes key={index} lote_name={datos.lote} />;
        })

        return(
            <Fragment>
                <div className="container" >
                    <div className="row offset-lg-2 mt-3 mb-5 pb-3 pt-3 pr-3 pl-3 border rounded border-primary bg-light">
                        <h1 className="mt-2 mr-2 ml-3">Cultivos </h1>   
                        <div class="dropdown-divider mt-2 mr-2 ml-2"></div>
                        <div  >                            
                            <h2 className="col-6 text-primary mb-3" > Total de Lotes Registrados: {' '+this.state.datosLotes.length} </h2>                     
                            <button type="button" class="btn btn-success"> <GrAddCircle/>Agregar Lote</button>                            
                        </div>
                        <div class="dropdown-divider mt-3"></div> 
                        <div className="row ">
                            {Lot}
                        </div>           
                        
                        <div class="dropdown-divider"></div>
                        <div>
                            <alert>ddddd</alert>
                        </div>
                    </div>
                </div>  
            </Fragment>
        )
    }
}

export default Lotes;
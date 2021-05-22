import React, { Component, Fragment } from 'react';
import * as grIcon from 'react-icons/gr';
import Lote from './Lote';

class Lotes extends Component{

    componentDidMount(){
        this.getLotes()
    }

    state = {
        datosLotes:[]
    }

    getLotes(){
        fetch("https://riego-flask.herokuapp.com/Lotes",{
            method:"GET",
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
            return <Lote key={index} lote_name={datos.lote} />;
        })

        return(
            <Fragment>
                 <div className="container" >
                    <div className="row  mt-3 mb-3  pt-3 pb-3 border rounded border-primary bg-light">
                        <div className="col-3 px-4 ml-3 mr-3 mt-3 mb-3 pt-3 pb-3 pr-3 pl-3 ">
                            <h1 className="px-2" >Lotes </h1> 
                            <div class="dropdown-divider mt-3 mr-3 ml-3"></div>
                            <div className="px-2" >                            
                                <h2 className="text-primary mb-3" > Total de Lotes Registrados: {' '+this.state.datosLotes.length} </h2>                     
                                <button type="button" class="btn btn-success"> <grIcon.GrAddCircle/>Agregar Cultivo</button>                            
                            </div>
                            <div class="dropdown-divider mt-3 mr-3 ml-3" ></div> 
                        </div>
                        <div className="col ml-3 pr-3">                             
                            <div className="row  px-4 ml-3 mr-3 mt-3 mb-3 pt-3 pb-3 pr-3 pl-3 ">
                                {Lot}
                            </div>
                        </div>               
                    </div>
                </div>  
            </Fragment>
        )
    }
}

export default Lotes;
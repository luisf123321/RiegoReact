import React, { Component, Fragment } from 'react';
import Finca from './finca';
import '../../Styles/css/card.css';
import 'bootstrap/dist/css/bootstrap.css';

class Fincas extends Component{

    componentDidMount(){
        this.getCultivos()
    }

    state = {
        dataFincas : []
    }

    getCultivos(){
        fetch("https://riegoback.herokuapp.com/finca/user/25",{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
            }
        })
        .then(response => response.json()).then(data => this.setState({dataFincas:data}))
    }

    render(){

        console.log(this.state.dataFincas)
        
        const cul = this.state.dataFincas.map((datos,index)=>{                        
            return  <Finca key={index} finca_name={datos.nombre} /> ;
        })

       
        return(
            <Fragment>
                
                <div className="container" >
                    <div className="row  mt-3 mb-3  pt-3 pb-3 border rounded border-primary bg-light">
                        <div className="col-3 px-4 ml-3 mr-3 mt-3 mb-3 pt-3 pb-3 pr-3 pl-3 ">
                            <h1 className="mt-3 mb-3 px-2 ">Fincas </h1> 
                            <div className="dropdown-divider  "></div>
                            <div  className="px-2 " >                            
                                <h2 className="text-primary mb-3" > Total de Fincas Registradas: {' '+this.state.dataFincas.length} </h2>                     
                                <button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Agregar Cultivo</button>
                            
                            </div>
                            <div className="dropdown-divider " ></div> 
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

export default Fincas;
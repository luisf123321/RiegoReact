import React, { Component, Fragment } from 'react';
import Finca from './finca';
import '../../Styles/css/card.css';
import 'bootstrap/dist/css/bootstrap.css';

class Fincas extends Component{

    componentDidMount(){
        this.getUser();
        this.getCultivos()
    }

    state = {
        dataFincas : []
    }

    getUser(){
        fetch("https://riegoback.herokuapp.com/auth/who_am_i",{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
            }
        })
        .then(response => response.json()).then(data => {console.log(data['id']); sessionStorage.setItem("user_id",data['id'])})
    }

    getCultivos(){
       
        const user = sessionStorage.getItem("user_id");
        console.log(user)
        fetch("https://riegoback.herokuapp.com/finca/user/"+user ,{
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
            return  <Finca key={index} finca={datos}  /> ;
        })

       
        return(
            <Fragment>
                
                <div className="container-fluid" >
                    <div className="row ">
                        <div className="col-3 px-5 py-3">
                            <h1 className="mt-3 mb-3 px-2 ">Fincas </h1> 
                            <div className="dropdown-divider  "></div>
                            <div  className="px-2 " >                            
                                <h2 className="text-primary fs-5" > Total Registros: {' '+this.state.dataFincas.length} </h2>                     
                                <button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Agregar Cultivo</button>
                            
                            </div>
                            <div className="dropdown-divider " ></div> 
                        </div>
                        <div className="col-9 px-3 py-3">                             
                            <div className="row">
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
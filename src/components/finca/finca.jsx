import React, { Component, Fragment } from 'react';
import SimpleMap from '../map'

class Finca extends Component{

    render(){
        return(
            <Fragment> 
                
                <div className="card px-2 mx-2 my-2" style={{"width": "18rem","height":"24rem"}}>

                    <div className="card-body">
                        <h5 className="card-title">{this.props.finca.nombre}</h5>
                        <h6 className="card-subtitle mb-2 text-muted"><strong>Direccion:</strong>  {this.props.finca.direccion}</h6>
                        <p className="card-text fs-6"> <strong>Latitud:</strong> {this.props.finca.latidud} </p>
                        <p className="card-text fs-6"> <strong>Longitud:</strong>  {this.props.finca.longitud}</p>
                        <div>
                            <SimpleMap />
                        </div>
                    </div>
                </div>
                               
            </Fragment>
        )
    }
}

export default Finca;
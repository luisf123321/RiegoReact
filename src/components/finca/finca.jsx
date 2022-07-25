import React, { Component, Fragment } from 'react';
import SimpleMap from '../map'

class Finca extends Component{

    render(){
        return(
            <Fragment> 
                
                <div className="card px-2" style={{"width": "16rem"}}>

                    <div className="card-body">
                        <h5 className="card-title">{this.props.finca_name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p className="card-text">sss</p>
                        
                    </div>
                </div>
                               
            </Fragment>
        )
    }
}

export default Finca;
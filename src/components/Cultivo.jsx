import React, { Component, Fragment } from 'react';
import Navbar from './Navbar';

class Cultivo extends Component{



    render(){
        return(
            <Fragment> 
                
                <div className="card px-2" style={{"width": "16rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.cultivo_name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p className="card-text">sss</p>
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                    </div>
                </div>                
            </Fragment>
        )
    }
}

export default Cultivo;
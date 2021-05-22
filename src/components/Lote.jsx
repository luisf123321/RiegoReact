import React, { Component, Fragment } from 'react';



class Lote extends Component{



    render(){
        return(
            <Fragment>
                <div className="card mt-3 mr-3 ml-3 mb-3" style={{"width": "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.lote_name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                    </div>
                </div>  
            </Fragment>
        )
    }
}

export default Lote;
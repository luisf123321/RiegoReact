import React, { Component, Fragment } from 'react';
import SimpleMap from '../mapa/map';
import { useNavigate } from 'react-router-dom';

const Card = (props) => {

    const navigate = useNavigate();

        

    return (
        <Fragment>
            <div className="card px-2 mx-2 my-2" style={{ "width": "18rem", "height": "24rem" }}>

                <div className="card-body">
                    <h5 className="card-title">{props.card.nombre}</h5>
                    <p className="card-text fs-6"> <strong>Latitud:</strong> {props.card.latidud} </p>
                    <p className="card-text fs-6"> <strong>Longitud:</strong>  {props.card.longitud}</p>
                    <button onClick={props.onClickDetalle} className="btn btn-primary mx-1 my-1">{props.btnDetalle}</button>
                    <button onClick={props.onClickToPage} className="btn btn-primary mx-1 my-1">{props.btnToPage}</button>
                    <div>
                        <SimpleMap lat={props.card.latidud} long={props.card.longitud}/>
                    </div>
                </div>
            </div>

        </Fragment>
    )

}

export default Card;
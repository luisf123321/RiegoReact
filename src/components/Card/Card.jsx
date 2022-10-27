import React, { Component, Fragment } from 'react';
import SimpleMap from '../mapa/map';
import { useNavigate } from 'react-router-dom';

const Card = (props) => {

    const navigate = useNavigate();

    const onClickDetalle = () => {
        if(props.isFinca){
            sessionStorage.setItem("idFinca",props.card.id)
        }else{
            sessionStorage.setItem("idLote",props.card.id)
        }
        navigate(props.rutaToDetalle, { state: { idItem: props.card.id } })
    }

    return (
        <Fragment>
            <div onClick={onClickDetalle} className="card px-2 mx-2 my-2" style={{ "width": "18rem", "height": "20rem" }}>

                <div className="card-body">
                    <h5 className="card-title">{props.card.nombre}</h5>
                    <p className="card-text fs-6"> <strong>Latitud:</strong> {props.card.latidud} </p>
                    <p className="card-text fs-6"> <strong>Longitud:</strong>  {props.card.longitud}</p>
                   
                    <div>
                        <SimpleMap lat={props.card.latidud} long={props.card.longitud} />
                    </div>
                </div>
            </div>

        </Fragment>
    )

}

export default Card;
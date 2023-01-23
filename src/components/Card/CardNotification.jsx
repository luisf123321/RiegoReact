import React, { Component, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

const CardNotification = (props) => {

    const navigate = useNavigate();

    const onClickDetalle = () => {
        if (props.isFinca) {
            sessionStorage.setItem("idFinca", props.card.id)
        } else {
            sessionStorage.setItem("idLote", props.card.id)
        }
        navigate(props.rutaToDetalle, { state: { idItem: props.card.id } })
    }
    return (
        <Fragment>
            <div onClick={onClickDetalle} className="card px-2 mx-2 my-2" style={{ "height": "6rem" }}>

                <div className="card-body">
                    <h5 className="card-title">{props.card.titulo}</h5>
                    <p className="card-text fs-6"> <strong>Mensaje:</strong> {props.card.mensaje} </p>
                    <p className="card-text fs-6"> <strong>Fecha Origen:</strong>  {props.card.fechaOrigen}</p>
                </div>
            </div>

        </Fragment>
    );
}

export default CardNotification;

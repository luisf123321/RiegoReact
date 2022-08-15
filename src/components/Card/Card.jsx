import React, { Component, Fragment } from 'react';
import SimpleMap from '../mapa/map';
import { useNavigate } from 'react-router-dom';

const Card = (props) => {

    const navigate = useNavigate();

    const onClickToPage = () => {
        navigate(props.rutaToPage, { state: { idItem: props.card.id } })
    }

    const onClickDetalle = () => {
        navigate(props.rutaToDetalle, { state: { idItem: props.card.id } })
    }



    return (
        <Fragment>
            <div className="card px-2 mx-2 my-2" style={{ "width": "18rem", "height": "24rem" }}>

                <div className="card-body">
                    <h5 className="card-title">{props.card.nombre}</h5>
                    <p className="card-text fs-6"> <strong>Latitud:</strong> {props.card.latidud} </p>
                    <p className="card-text fs-6"> <strong>Longitud:</strong>  {props.card.longitud}</p>
                    <button className='btn btn-primary' type="button" onClick={onClickDetalle}>

                        {props.textToDetalle}
                    </button>
                    <button className='btn btn-primary' type="button" onClick={onClickToPage}>
                        {props.textToPage}
                    </button>
                    <div>
                        <SimpleMap lat={props.card.latidud} long={props.card.longitud} />
                    </div>
                </div>
            </div>

        </Fragment>
    )

}

export default Card;
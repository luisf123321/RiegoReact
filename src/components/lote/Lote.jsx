import React, { Component, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleMap from '../mapa/map';

const Lote = (props) => {
    const navigate = useNavigate();
    const onClickSectores = () =>{
        console.log(props.lote.id)
        navigate("/Sectores",{state:{lote:props.lote.id}})
    }

    const onClickDetalle = () =>{
        console.log(props.lote.id)
        navigate("/lotes/detalle",{state:{lote:props.lote.id}})
    }
    return (
        <Fragment>
            <div className="card  px-2 mx-2 my-2" style={{ "width": "18rem", "height": "24rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{props.lote.nombre}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{props.lote.latidud}</h6>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <button onClick={onClickDetalle} className="btn btn-primary mx-1 my-1">Ver Detalle</button>
                    <button onClick={onClickSectores} className="btn btn-primary mx-1 my-1">Ver Sectores</button>
                    <div>
                        <SimpleMap lat={props.lote.latidud} long={props.lote.longitud} />
                    </div>

                </div>
            </div>
        </Fragment>
    )

}

export default Lote;
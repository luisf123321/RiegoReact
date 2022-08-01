import React, { Component, Fragment } from 'react';
import SimpleMap from '../map';
import { useNavigate } from 'react-router-dom';

const Finca = (props) => {

    const navigate = useNavigate();

    const onClickDetalle = () =>{
        console.log(props.finca.id)
        navigate("/lotes",{state:{finca:props.finca.id}})
    }

    

    return (
        <Fragment>
            <div className="card px-2 mx-2 my-2" style={{ "width": "18rem", "height": "24rem" }}>

                <div className="card-body">
                    <h5 className="card-title">{props.finca.nombre}</h5>
                    <h6 className="card-subtitle mb-2 text-muted"><strong>Direccion:</strong>  {props.finca.direccion}</h6>
                    <p className="card-text fs-6"> <strong>Latitud:</strong> {props.finca.latidud} </p>
                    <p className="card-text fs-6"> <strong>Longitud:</strong>  {props.finca.longitud}</p>
                    <button  className="btn btn-primary mx-1 my-1">Ver Detalle</button>
                    <button onClick={onClickDetalle}  className="btn btn-primary mx-1 my-1">Ver Lotes</button>
                    <div>
                        <SimpleMap lat={props.finca.latidud} long={props.finca.longitud}/>
                    </div>
                </div>
            </div>

        </Fragment>
    )

}

export default Finca;
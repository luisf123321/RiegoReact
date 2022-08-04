import React, { Component, Fragment, useState, useEffect } from 'react';
import Finca from '../../components/finca/finca';
import '../../Styles/css/card.css';
import 'bootstrap/dist/css/bootstrap.css';
import Card from '../../components/Card/Card';
import { useNavigate } from 'react-router-dom';

const Fincas = () => {

    const [dataFincas, setdataFincas] = useState([]);
    const navigate = useNavigate();

    const getUser = async () => {
        fetch("https://riegoback.herokuapp.com/auth/who_am_i", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
            .then(response => response.json())
            .then(data => { console.log(data['id']); sessionStorage.setItem("user_id", data['id']) })

        const user = sessionStorage.getItem("user_id");
        return user;
    }

    const getCultivos = async () => {

        let user = await getUser();

        console.log(user)
        await fetch("https://riegoback.herokuapp.com/finca/user/" + user, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
            .then(response => response.json()).then(data => setdataFincas(data))
    }

   

    

    useEffect(() => {
        getCultivos();
    }, []);

    const onClickLotes = (id) =>{
        
        navigate("/lotes",{state:{finca:id}})
    }

    const onClickDetalleFinca = (id) =>{
        navigate("/fincas/detalle",{state:{finca:id}})
    }


    const cul = dataFincas.map((datos, index) => {
        return <Card key={index} card={datos} onClickDetalle={onClickDetalleFinca(datos.id)} onClickToPage={onClickLotes(datos.id)} />;
    })



    return (
        <Fragment>

            <div className="container-fluid" >
                <div className="row ">
                    <div className="col-3 px-5 py-3">
                        <h1 className="mt-3 mb-3 px-2 ">Fincas </h1>
                        <div className="dropdown-divider  "></div>
                        <div className="px-2 " >
                            <h2 className="text-primary fs-5" > Total Registros: {' ' + dataFincas.length} </h2>
                        </div>
                        <div className="dropdown-divider " ></div>
                    </div>
                    <div className="col-9 px-3 py-3">
                        <div className="row">
                            {cul}
                        </div>
                    </div>
                </div>
            </div>




        </Fragment>
    )

}

export default Fincas;
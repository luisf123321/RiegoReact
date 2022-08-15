import React, { Component, Fragment, useState, useEffect, useId } from 'react';
import '../../Styles/css/card.css';
import 'bootstrap/dist/css/bootstrap.css';
import Card from '../../components/Card/Card';
import { useNavigate } from 'react-router-dom';


const Fincas = () => {

    const [dataFincas, setdataFincas] = useState([]);
    const [viewData, setviewData] = useState(false);
    const [userId, setuserId] = useState(0);
    const navigate = useNavigate();

    const getUser = async () => {
        let response = await fetch("https://riegoback.herokuapp.com/auth/who_am_i", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });

        if(response.status === 200){
            let data =await response.json();
            setuserId(data['id'])
        }else{
            localStorage.removeItem('token')
            navigate("/")
        }
            

    }

    const getCultivos = async () => {

        let response = await fetch("https://riegoback.herokuapp.com/finca/user/" + userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
        
        if(response.status === 200){
            let dataResponse = await response.json();
            setdataFincas(dataResponse);
            setviewData(true)
        }
    }


    useEffect(() => {
        getUser();
    }, []);


    useEffect(() => {
        if (userId !== 0) {
            getCultivos();
        }
    }, [userId]);




    const cul = dataFincas.map((datos, index) => {
        return <Card key={index} card={datos} rutaToDetalle="/fincas/detalle" rutaToPage="/lotes" textToPage="Lotes" textToDetalle="Detalle" />;
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
                            {
                                viewData? cul:null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}

export default Fincas;
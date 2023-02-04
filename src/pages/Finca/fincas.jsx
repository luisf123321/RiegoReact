import React, { Component, Fragment, useState, useEffect, useId } from 'react';
import '../../Styles/css/card.css';
import 'bootstrap/dist/css/bootstrap.css';
import Card from '../../components/Card/Card';
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from "react-router-dom";
const Fincas = () => {

    const [dataFincas, setdataFincas] = useState([]);
    const [viewData, setviewData] = useState(false);
    const [userId, setuserId] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.background = "#EDEFF0";
    }, []);

    return (
        <Fragment>

            <div className="container-fluid pt-4" style={{ "padding-left": "18%" }}>
                <div className="row mt-5">
                    <div className="row px-5">
                        <div className='col-2 mt-3 '>
                            <h1 className="">Fincas </h1>
                        </div>
                        <div className='col-1 mt-3'>
                            <div className='mt-2'><Link className='btn text-white ' style={{ "background": "#2c4464" }} to="crear" >Añardir</Link></div>
                        </div>
                        <div className='col-2 mt-3 '>
                            <div className='mt-2'><Link className='btn text-white ' style={{ "background": "#2c4464" }} to="lista" >Ver Fincas</Link></div>
                        </div>
                    </div>
                    <div className=" px-5 ">
                        <div>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}

export default Fincas;
import React, { useState, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";


const Perfil = () => {

    


    useEffect(() => {
     
        document.body.style.background = "#EDEFF0";
    }, []);
    return (
        <div className="container-fluid" style={{ "padding-left": "18%", "padding-top": "5%" }} >
            <div className='row-fluid py-5'>
                <div className='col-lg-8 offset-lg-2 my-2  border rounded-5 bg-white ' >
                    <div className='row-fluid pb-5'>
                        <div className='d-flex justify-content-center'>
                            <i class="bi bi-person-circle " style={{ "font-size": " 165px" }}></i>
                        </div>
                        <div className='mx-3 px-3'>
                            <div class="row">
                                <div class="col-12 mt-3">
                                    <Link className='btn btn-primary mx-3' to={"info"} >Información Personal</Link>
                                    <Link className=' btn btn-primary mx-3' to={"cambio"} >Cambio de Contraseña</Link>
                                    <Link className=' btn btn-primary mx-3' to={"usuario"} >Actualizar Usuario</Link>
                                </div>
                                <div className='mt-3'>
                                    <Outlet/>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Perfil;

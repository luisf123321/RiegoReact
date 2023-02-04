import React, { useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
const Riegos = () => {

    useEffect(() => {
        document.body.style.background = "#EDEFF0";
    }, []);


    return (
        <div className="container-fluid pt-5" style={{ "padding-left": "18%" }} >
            <div className="row-fluid pt-4 ">
                <div className="col-12  py-3">
                    <div className='row mt-2 mx-2 px-5'>
                        <div className='col d-grid'>
                            <Link className='btn text-white' style={{ "background": "#2c4464" }} to="riego_admins" >Aplicación  de riego</Link>
                        </div>
                        <div className='col d-grid'>
                            <Link className='btn text-white' style={{ "background": "#2c4464" }} to="riego_admins" >Sistemas de riego</Link>
                        </div>
                        <div className='col d-grid'>
                            <Link className='btn text-white' style={{ "background": "#2c4464" }} to="dispositive_admins" >Dispositivos</Link>
                        </div>

                        <div className='col d-grid'>
                            <Link className='btn text-white' style={{ "background": "#2c4464" }} to="new_admin" >Nuevo riego</Link>
                        </div>
                        <div className='col d-grid'>
                            <Link className='btn text-white' style={{ "background": "#2c4464" }} to="new_dispositive" >Nuevo dispositivo</Link>
                        </div>
                    </div>
                    <div className='mt-2 mx-5 px-5 py-3'>
                        <Outlet />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Riegos;

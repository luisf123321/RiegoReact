import React from 'react';
import { Link, Outlet } from "react-router-dom";
const Riegos = () => {
    return (
        <div className="container-fluid" style={{ "padding-left": "18%", "padding-top": "5%" }} >
            <div className="row-fluid ">
                <div className="col-12  py-3">
                    <div className='row mt-2 mx-2 px-5'>
                        <div className='col-3 d-grid'>
                            <Link className='btn text-white' style={{ "background": "#2c4464" }} to="estadisticas" >Sistemas de riego</Link>
                        </div>
                        <div className='col-3 d-grid'>
                            <Link className='btn text-white' style={{ "background": "#2c4464" }} to="sectores" >Dispositivos</Link>
                        </div>

                        <div className='col-3 d-grid'>
                            <Link className='btn text-white' style={{ "background": "#2c4464" }} to="new_admin" >Nuevo riego</Link>
                        </div>
                        <div className='col-3 d-grid'>
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

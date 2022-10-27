import React from 'react';
import { Link, Outlet } from 'react-router-dom';
const Cultivos = () => {
    return (
        <div className="container-fluid" style={{"padding-left": "18%"}}>
           


            <div className='row-fluid my-3'>
            <h1 className='px-5'>Cultivos</h1>
                <div className='px-5 pt-3'>
                   <Link  className='btn mx-2 text-white'  style={{"background":"#2c4464"}} to="lista">Cultivos</Link>     
                   <Link  className='btn mx-2 text-white'  style={{"background":"#2c4464"}} to="crear"><i class="bi bi-plus-circle"></i> Crear Cultivo</Link>                
                </div>
                <div className='col-12 px-5 pt-3'>
                    <Outlet />
                </div>

            </div>
        </div>
    );
}

export default Cultivos;

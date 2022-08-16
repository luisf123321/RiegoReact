import React from 'react';
import { Link, Outlet } from 'react-router-dom';
const Cultivos = () => {
    return (
        <div className='container my-3'>
            <h1>Cultivos</h1>


            <div className='row my-3'>
                <div >
                   <Link  className='btn btn-primary mx-2' to="lista">Cultivos</Link>     
                   <Link className='btn btn-primary mx-2' to="crear"><i class="bi bi-plus-circle"></i> Crear Cultivo</Link>                
                </div>
                <div>
                    <Outlet />
                </div>

            </div>
        </div>
    );
}

export default Cultivos;

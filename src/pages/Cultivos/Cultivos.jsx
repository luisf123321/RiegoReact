import React from 'react';
import { Link, Outlet } from 'react-router-dom';
const Cultivos = () => {
    return (
        <div className='container my-3'>
            <h1>Cultivos</h1>


            <div className='row my-3'>
                <div>
                    <button className='btn btn-primary'>cultivos</button>
                </div>
                <div>
                    <Outlet />
                </div>

            </div>
        </div>
    );
}

export default Cultivos;

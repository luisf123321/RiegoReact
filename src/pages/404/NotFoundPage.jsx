import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className='container my-3 py-3'>
            <div className='row' >
                <div className=''>
                    <h1 className='mt-5 text-primary'>404 no found</h1>
                    <div>
                        <p>Esta Pagina no se Encuentra disponible, por favor intentar mas tarde.</p>
                        <button className='btn btn-primary' onClick={()=> navigate(-1)} >Atras</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default NotFoundPage;

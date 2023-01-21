import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DispositivosList = () => {

    const [dispositivos, setDispositivos] = useState([]);
    const [userId, setuserId] = useState(0);
    const navigate = useNavigate();

    const getUser = async () => {
        let response = await fetch("https://sirbic.up.railway.app/auth/who_am_i", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });

        if (response.status === 200) {
            let data = await response.json();
            setuserId(data['id'])
            getDispositivos(data['id'])
        } else {
            localStorage.removeItem('token')
            navigate("/")
        }


    }

    const getDispositivos = async (userId) => {

        let response = await fetch("https://sirbic.up.railway.app/riego/dispositivo/usuario/" + userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });

        if (response.status === 200) {
            let dataResponse = await response.json();
            console.log(dataResponse.dispositivos)
            setDispositivos(dataResponse.dispositivos)
        }

    }
    useEffect(() => {
        getUser();
    }, []);
    const viewInformation = (id) => {
        console.log(id)
        sessionStorage.setItem("idDispositivo", id);

    }



    return (
        <div className='container-fluid bg-white border rounded-5'>
            <div className='row-fluid px-5 py-5 '>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Sector</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dispositivos.map((dispositivo, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{dispositivo.disNombre}</td>
                                    <td>{dispositivo.disModelo}</td>
                                    <td>{dispositivo.disSectores}</td>
                                    <td>{dispositivo.disEstado}</td>
                                    <td>
                                        <button className='btn btn-danger'><i class="bi bi-trash-fill" /></button>
                                        <Link className='btn btn-secondary' onClick={() => viewInformation(dispositivo.id)} to="/dispositivo/detalle" >
                                            <i class="bi bi-eye-fill"></i>
                                        </Link>
                                    </td>
                                </tr>

                            ))
                        }


                    </tbody>

                </table>
            </div>
        </div>
    );
}

    

export default DispositivosList;

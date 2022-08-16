import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cultivo = () => {


    const [cultivos, setcultivos] = useState([]);
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

        if (response.status === 200) {
            let data = await response.json();
            setuserId(data['id'])
        } else {
            localStorage.removeItem('token')
            navigate("/")
        }


    }

    const getCultivos = async () => {

        let response = await fetch("https://riegoback.herokuapp.com/cultivo/user/" + userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });

        if (response.status === 200) {
            let dataResponse = await response.json();
            console.log(dataResponse)
            setcultivos(dataResponse)
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


    return (
        <div>
            <table class="table table-striped">

                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Fecha Inicio</th>
                        <th scope="col">Fecha Fin</th>
                        <th scope="col">actiones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cultivos.map((cultivo, index) => (
                            <tr>
                                <th scope="row">{index}</th>
                                <td>{cultivo.cultivoNombre}</td>
                                <td>{cultivo.fechaInicio}</td>
                                <td>{cultivo.fechaFinal}</td>
                                <td>
                                    <button className='btn btn-light'><i class="bi bi-pen"></i></button>
                                    <button className='btn btn-danger'><i class="bi bi-trash-fill" /></button>
                                    <button className='btn btn-secondary'> <Link to="" /> <i class="bi bi-eye-fill"></i></button>
                                </td>
                            </tr>

                        ))
                    }


                </tbody>

            </table>
        </div>
    )

}

export default Cultivo;
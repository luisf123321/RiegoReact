import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const MuestraSuelo = () => {

    const [dataMuestras, setdataMuestras] = useState([]);
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

    const getMuestras = async () => {

        let response = await fetch("https://riegoback.herokuapp.com/prediction/muestras/" + userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })

        if (response.status === 200) {
            let dataResponse = await response.json();
            console.log(dataResponse)
            setdataMuestras(dataResponse.muestras);

        }
    }
    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (userId !== 0) {
            getMuestras();
        }
    }, [userId]);


    return (
        <div className='container-fluid bg-white border rounded-5'>
            <div className='row-fluid px-5 py-5 '>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Arena %</th>
                            <th scope="col">Limo %</th>
                            <th scope="col">Arcilla %</th>
                            <th scope="col">Fecha % </th>
                         
                        </tr>
                    
                    </thead>
                    <tbody>
                        {
                            dataMuestras.map((muestra, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{muestra.arena}</td>
                                    <td>{muestra.limo}</td>
                                    <td>{muestra.arcilla}</td>   
                                    <td>{muestra.fecha}</td>                                    
                                </tr>

                            ))
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MuestraSuelo;

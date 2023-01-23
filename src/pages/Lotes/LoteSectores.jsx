import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const LoteSectores = () => {
    const [dataSectores, setdataSectores] = useState([]);
    const navigate = useNavigate();
    const getSectoresByCultivo = async () => {
        let response = await fetch("https://sirbic.up.railway.app/sectores/lote/" + sessionStorage.getItem("idLote"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })

        if (response.status === 200) {
            let dataResponse = await response.json();
            console.log("sectores")
            console.log(dataResponse.sectores);
            setdataSectores(dataResponse.sectores);
        }

    }

    const viewInformation = (id) => {
        console.log(id)
        sessionStorage.setItem("idCultivo", id);
        navigate("/sectores/detalle");

    }


    useEffect(() => {
        getSectoresByCultivo();
    }, []);

    return (
        <div className='container-fluid bg-white border rounded-5'>
            <div className='row-fluid px-5 py-5 '>
                {dataSectores.length > 0 ?
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Area</th>
                                <th scope="col">actiones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataSectores.map((sector, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{sector.nombre}</td>
                                        <td>{sector.area}</td>

                                        <td>
                                            <button className='btn btn-danger'><i class="bi bi-trash-fill" /></button>
                                            <Link className='btn btn-secondary' onClick={() => viewInformation(sector.id)} to="/sectores/detalle" >
                                                <i class="bi bi-eye-fill"></i>
                                            </Link>
                                        </td>
                                    </tr>

                                ))
                            }


                        </tbody>

                    </table>
                    :
                    <div className='row'>
                        <h2>No tiene sectores relacionado al lote registrado</h2>
                        <p>Por favor crear un sector asosiado a este lote</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default LoteSectores;

import React, {useState,useEffect} from 'react';
import { Link, Outlet } from "react-router-dom";


const Perfil = () => {

    const [datausuario, setdatausuario] = useState({});

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
            setdatausuario(data);
        } 


    }


    useEffect(() => {
        getUser();
        document.body.style.background = "#EDEFF0";
    }, []);
    return (
        <div className="container-fluid" style={{ "padding-left": "18%", "padding-top": "5%"}} >
            <div className='row-fluid py-5'>
                <div className='col-lg-8 offset-lg-2 my-2  border rounded-5 bg-white ' >
                    <div className='row-fluid pb-5'>
                        <div className='d-flex justify-content-center'>
                            <i class="bi bi-person-circle " style={{ "font-size": " 165px" }}></i>
                        </div>
                        <div className='mx-3 px-3'>
                            <div class="row">
                                <div class="col">
                                    <label for="inputEmail4" class="form-label">Nombre</label>
                                    <input disabled={true} value={datausuario.nombre} type="text" class="form-control" placeholder="First name" aria-label="First name" />
                                </div>
                                <div class="col">
                                    <label for="inputEmail4" class="form-label">Apellido</label>
                                    <input disabled={true} value={datausuario.apellido} type="text" class="form-control" placeholder="Last name" aria-label="Last name" />
                                </div>
                                <div class="col-12 mt-3">
                                    <label for="inputAddress" class="form-label">Direccion</label>
                                    <input disabled={true} value={datausuario.direccion} type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
                                </div>
                                <div class="col-12 mt-3">
                                    <label for="inputAddress2" class="form-label">Email</label>
                                    <input  disabled={true} type="text" value={datausuario.correo} class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                                </div>
                                <div class="col-12 mt-3">
                                    
                                    <Link className='btn btn-primary'  to={"cambio"} >Cambio de Contraseña</Link>
                                    <Link className='btn btn-primary mx-3'  to={"usuario"} >Actualizar Usuario</Link>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Perfil;

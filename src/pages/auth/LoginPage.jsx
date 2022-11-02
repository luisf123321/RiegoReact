import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import LoginForm from '../../components/forms/loginForm';
import Logo from "../../Assets/Logo_Riego.svg"
import { Link } from "react-router-dom";
const LoginPage = () => {
    const navigate = useNavigate();

    const [status, setstatus] = useState(false);
    const getUser = async () => {
        if (localStorage.getItem("token") !== undefined) {
            let response = await fetch("https://riegoback.herokuapp.com/auth/who_am_i", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })

            if (response.status === 200) {
                setstatus(true)

            } else {
                localStorage.removeItem("token")
                setstatus(false)
            }
        }
        else {
            setstatus(false)
        }

    }

    useEffect(() => {
        document.body.style.background = "#34495c";
        getUser();
    }, []);

    useEffect(() => {

        if (status) {
            navigate("/home");
        }
    }, [status]);

    return (
        <div className="container-fluid py-5 " >
            <div className="row py-5">
                <div className='col-lg-5 mt-5 mx-5 px-5 '>
                    <img src={Logo} alt="SVG logo image" width={450} height={450} />
                </div>
                <div className="col-lg-5  px-5  mx-3 mb-5 pb-5 mt-5 border rounded-5 bg-white" >
                    <LoginForm ></LoginForm>
                    <div className="row mt-2">
                    <Link  to="/singup">Registrar un usuario</Link>
                    <Link  to="/singup">Olvido contraseña</Link>
                    </div>
                </div>

            </div>
        </div>


    );

}

export default LoginPage;
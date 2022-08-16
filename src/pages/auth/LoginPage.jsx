import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import LoginForm from '../../components/forms/loginForm';
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
        getUser();
    }, []);

    useEffect(() => {

        if (status) {
            navigate("/fincas");
        }
    }, [status]);

    return (
        <Fragment>

            <LoginForm ></LoginForm>

        </Fragment>
    );

}

export default LoginPage;
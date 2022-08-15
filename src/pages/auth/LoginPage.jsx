import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import LoginForm from '../../components/forms/loginForm';
const LoginPage = () => {
    const navigate = useNavigate();

    const getUser = async () => {
        let response  = await fetch("https://riegoback.herokuapp.com/auth/who_am_i", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })

        if(response.status === 200){
            return true
        }else{
            localStorage.removeItem("token")
            return false
        }

    }

    useEffect(async() => {
        
        let status = await getUser();        

        if(status){
            navigate("/fincas");
        }
    }, []);

      
    
    return (
        <Fragment>
           
           <LoginForm ></LoginForm>
        
        </Fragment>
    );

}

export default LoginPage;
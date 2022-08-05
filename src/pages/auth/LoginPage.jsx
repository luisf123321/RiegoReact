import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import LoginForm from '../../components/forms/loginForm';
const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        
        var token = localStorage.getItem('token')
        

        if(token){
            /*
            var tokenExpiration = jwtDecode(token).exp;
            var dateNow = new Date();

            if(tokenExpiration < dateNow.getTime()/1000){
                console.log('expired');
            }else{
                props.history.push('/dashboard')
                console.log('login screen')
            }
            */
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
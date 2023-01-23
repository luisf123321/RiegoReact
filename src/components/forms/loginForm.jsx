import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import Logo from "../../Assets/Logo_Riego.svg"
import Alertinfo from '../alerts/alertinfo';
const loginSchema = Yup.object().shape(
    {
        username: Yup.string().required("username is requerido"),
        password: Yup.string().required("password is requerida")
    }
);

const LoginForm = () => {

    const initialCredentials = {
        username: '',
        password: ''
    }


    const navigate = useNavigate();
    const [viewAler, setviewAler] = useState(false);
    const [message, setmessage] = useState('');
    const [style, setstyle] = useState('');


    return (
        <div>
            <Formik
                initialValues={initialCredentials}
                validationSchema={loginSchema}

                onSubmit={async (values) => {
                    await fetch('https://sirbic.up.railway.app/auth/login', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values),
                    })
                        .then(resp => resp.json())
                        .then(data => {
                            if (data.access_token !== undefined) {
                                localStorage.setItem("token", data.access_token);
                                console.log(data.access_token);
                                setmessage(data)
                                setstyle("success");
                                navigate('/home');
                            } else {
                                console.log(data)
                                setmessage(data)
                                setstyle("warning");
                            };

                            setviewAler(true);
                        })
                        .catch(error => {
                            console.log(error)
                        });
                }}

            >
                {
                    ({ touched, errors, isSubmitting }) => (

                        <>
                            {viewAler ? <Alertinfo message={message} styleAlert={style} ></Alertinfo> : null}

                            <h1 className="mt-5 " style={{ "text_color": "#4D626C" }}>Inicio de Sesion</h1>
                            <Form>
                                <div className="form-group mt-3">
                                    <label htmlFor="username" > Nombre de Usuario </label>
                                    <Field id="username" className="form-control" type="text" name="username" placeholder="example123" />
                                    {
                                        errors.username && touched.username && (
                                            <ErrorMessage name='username' component="div" ></ErrorMessage>
                                        )
                                    }
                                </div>
                                <div className="form-group mt-2">

                                    <label htmlFor='password' > Contraseña </label>
                                    <Field id="password" className="form-control" type="password" name="password" placeholder="password" />
                                    {
                                        errors.password && touched.password && (
                                            <ErrorMessage name='password' component="div" ></ErrorMessage>
                                        )
                                    }
                                </div>
                                <button type='submit' className="btn btn-block mt-2 text-white " style={{ "background": "#2c4464" }}>Iniciar Sesion</button>
                                {
                                    isSubmitting ? (<p>login your credenciales</p>) : null
                                }
                            </Form>
                        </>
                    )
                }

            </Formik>

        </div>
    );
}

export default LoginForm;

import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import Alertinfo from '../alerts/alertinfo';
import { useLocation } from "react-router-dom";
const fincaSchema = Yup.object().shape(
    {
        nombre: Yup.string().required("username is requerido"),
        direccion: Yup.string().required("password is requerida"),
        latitud: Yup.string().required("username is requerido"),
        longitud: Yup.string().required("password is requerida"),
    }
);

const FincaFormActulizar = () => {

    const [userId, setIserId] = useState();
    const [viewAler, setviewAler] = useState(false);
    const [message, setmessage] = useState('');
    const [style, setstyle] = useState('');
    const location = useLocation();
    const data = location.state?.data;
    const initialCredentials = {
        nombre: data.nombre,
        direccion: data.direccion,
        latitud: data.latidud,
        longitud: data.longitud,
        altitud: data.altitud,
        user_is: data.usuario,
        id: data.id
    }

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
            setIserId(data['id'])
        } else {
            localStorage.removeItem('token')
            navigate("/")
        }


    }



    const navigate = useNavigate();

    const onSubmitForm = async (values) => {
        console.log("values finca");
        console.log(values);
        const payload = {
            ...values,
        };
        console.log(payload)
        console.log(data)
        data.nombre = payload.nombre;
        data.direccion = payload.direccion;
        console.log(data.direccion);
        location.state.getDataFincaRuta();


        await fetch('https://riegoback.herokuapp.com/finca/' + data.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify(payload),
        })
            .then(resp => resp.json())
            .then(data => {
                setmessage(data.message);
                if (data.code == 200) {
                    setstyle("success");
                }
                if (data.code == 400) {
                    setstyle("warning");
                }
                setviewAler(true);
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });

    }

    useEffect(() => {
        getUser();
    }, []);
    return (
        <div>
            <Formik
                initialValues={initialCredentials}
                validationSchema={fincaSchema}
                onSubmit={(values) => {
                    onSubmitForm(values);
                }}
            >

                {
                    ({ touched, errors, isSubmitting, dirty, handleReset }) => (

                        <div className="container-fluid pb-4 bg-white border rounded-5">
                            <div className='mx-2 px-5'>
                                {viewAler ? <Alertinfo message={message} styleAlert={style} ></Alertinfo> : null}

                                <h2 className="mt-3" style={{ "text_color": "#4D626C" }}>Actualizar Finca</h2>
                                <Form>
                                    <div className='row'>
                                        <div className=" col form-group mt-3 m-2 mr-2 mb-2 ">
                                            <label htmlFor="nombre" > Nombre </label>
                                            <Field id="nombre" className="form-control" type="text" name="nombre" placeholder="nombre" />
                                            {
                                                errors.nombre && touched.nombre && (
                                                    <ErrorMessage name='nombre' component="div" ></ErrorMessage>
                                                )
                                            }
                                        </div>
                                        <div className="col form-group  mt-3 m-2 mr-2 mb-2">

                                            <label htmlFor='direccion' > direccion </label>
                                            <Field id="direccion" className="form-control" type="text" name="direccion" placeholder="direccion" />
                                            {
                                                errors.direccion && touched.direccion && (
                                                    <ErrorMessage name='direccion' component="div" ></ErrorMessage>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className=" col form-group  mt-3 m-2 mr-2 mb-2">

                                            <label htmlFor='latitud' > Latitud </label>
                                            <Field id="latitud" className="form-control" type="number" name="latitud" placeholder="latitud" />
                                            {
                                                errors.latitud && touched.latitud && (
                                                    <ErrorMessage name='direccion' component="div" ></ErrorMessage>
                                                )
                                            }
                                        </div><div className=" col form-group  mt-3 m-2 mr-2 mb-2">

                                            <label htmlFor='longitud' > Longitud </label>
                                            <Field id="longitud" className="form-control" type="number" name="longitud" placeholder="longitud" />
                                            {
                                                errors.longitud && touched.longitud && (
                                                    <ErrorMessage name='longitud' component="div" ></ErrorMessage>
                                                )
                                            }
                                        </div><div className="col form-group  mt-3 m-2 mr-2 mb-2">

                                            <label htmlFor='altitud' > Altitud </label>
                                            <Field id="altitud" className="form-control" type="number" name="altitud" placeholder="altitud" />
                                            {
                                                errors.altitud && touched.altitud && (
                                                    <ErrorMessage name='altitud' component="div" ></ErrorMessage>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <button type='submit' className="btn text-white btn-block mt-3 m-2 mr-2 mb-2" style={{ "background": "#2c4464" }}>Enviar</button>


                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-block mt-3 m-2 mr-2 mb-2"
                                        onClick={handleReset}
                                        disabled={!dirty || isSubmitting}
                                    >
                                        Limpiar
                                    </button>
                                    {
                                        isSubmitting ? (<p>login your credenciales</p>) : null
                                    }
                                </Form>
                            </div>
                        </div>
                    )}

            </Formik>
        </div>
    );
}

export default FincaFormActulizar;

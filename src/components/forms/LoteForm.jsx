import React, { Component, Fragment, useState, useEffect, useId } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import Alertinfo from '../alerts/alertinfo';
import { useLocation } from "react-router-dom";
const fincaSchema = Yup.object().shape(
    {
        nombre: Yup.string().required("Nombre is requerido"),
        area: Yup.number().required("Area is requerida"),
        latitud: Yup.number().required("Latitud is requerido"),
        longitud: Yup.number().required("longitud is requerida"),
    }
);
const LoteForm = () => {

    const [viewAler, setviewAler] = useState(false);
    const [message, setmessage] = useState('');
    const [style, setstyle] = useState('');

    const location = useLocation();
    const data = location.state?.data;


    const initialCredentials = {
        nombre: '',
        area: 0,
        latitud: 0,
        longitud: 0,
        altitud: 0,
        finca_id: 0
    }

    const onSubmitForm = async (values) => {
        console.log("values finca");
        console.log(values);
        const payload = {
            ...values,
            finca_id: data,
        };
        console.log(payload)
        await fetch('https://riegoback.herokuapp.com/lote', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify(payload),
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setmessage(data.message);
                if (data.code == 200) {
                    setstyle("success");
                }
                if (data.code == 400) {
                    setstyle("warning");
                }
                setviewAler(true);
            })
            .catch(error => {
                console.log(error);
            });

    }
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
                    ({ touched, errors, isSubmitting,dirty,handleReset }) => (
                        <div className="container-fluid pb-4 bg-white border rounded-5">
                            <div className="mx-2 px-5 mb-3">
                                {viewAler ? <Alertinfo message={message} styleAlert={style} ></Alertinfo> : null}
                                <h2 className="mt-3" style={{ "text_color": "#4D626C" }}>Nuevo Lote</h2>
                                <Form>
                                    <div className='row'>
                                        <div className="col form-group mt-3 m-2 mr-2 mb-2 ">
                                            <label htmlFor="nombre" > Nombre </label>
                                            <Field id="nombre" className="form-control" type="text" name="nombre" placeholder="nombre" />
                                            {
                                                errors.nombre && touched.nombre && (
                                                    <ErrorMessage name='nombre' component="div" ></ErrorMessage>
                                                )
                                            }
                                        </div>
                                        <div className=" col form-group  mt-3 m-2 mr-2 mb-2">

                                            <label htmlFor='area' > Area </label>
                                            <Field id="area" className="form-control" type="number" name="area" placeholder="area" />
                                            {
                                                errors.area && touched.area && (
                                                    <ErrorMessage name='area' component="div" ></ErrorMessage>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col form-group  mt-3 m-2 mr-2 mb-2">

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
                                    <button type='submit' className="btn text-white btn-block mt-3 m-2 mr-2 mb-2" style={{"background":"#2c4464"}}>Enviar</button>
                                    {
                                        isSubmitting ? (<p>Validando Informacion</p>) : null
                                    }
                                    <button
                                            type="button"
                                            className="btn btn-secondary btn-block mt-3 m-2 mr-2 mb-2"
                                            onClick={handleReset}
                                            disabled={!dirty || isSubmitting}
                                        >
                                            Limpiar
                                        </button>
                                </Form>
                            </div>
                        </div>

                    )}

            </Formik>
        </div>
    );
}

export default LoteForm;

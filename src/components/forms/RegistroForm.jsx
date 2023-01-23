import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import Logo from "../../Assets/Logo_Riego.svg"
import Select from "react-select";
import Alertinfo from '../alerts/alertinfo';
const registroSchema = Yup.object().shape(
    {
        username: Yup.string().required("username is requerido"),
        password: Yup.string().required("password is requerida"),
        nickname: Yup.string().required("nombre is requerida"),
        apellido: Yup.string().required("apellido is requerida"),
        num_celular: Yup.number().integer().default(0),
        correo: Yup.string().email().required("correo is requerida"),
        direccion: Yup.string().required("direccion is requerida"),
        num_identificacion: Yup.number().integer().default(0),
        tipo_identificacion: Yup.object().required("El tipo de cultivo es requerido!")
    }
);

const options = [
    { value: 1, label: "Cedula" },
    { value: 1, label: "Terjeta" }
];
const RegistroForm = () => {

    const initialCredentials = {
        username: '',
        password: '',
        nickname: '',
        apellido: '',
        num_celular: 0,
        correo: '',
        direccion: '',
        num_identificacion: 0,
        tipo_identificacion: ''
    }


    const navigate = useNavigate();
    const [viewAler, setviewAler] = useState(false);
    const [message, setmessage] = useState('');
    const [style, setstyle] = useState('');


    const inisiarSession = () => {
        navigate('/');
    }


    return (
        <div>
            <Formik
                initialValues={initialCredentials}
                validationSchema={registroSchema}

                onSubmit={async (values) => {
                    const payload = {
                        ...values,
                        tipo_identificacion: values.tipo_identificacion.value,
                    };
                    console.log(values.tipo_identificacion.value);
                    console.log(payload);
                    await fetch('https://sirbic.up.railway.app/auth/signup', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload),
                    })
                        .then(resp => resp.json())
                        .then(data => {
                            //navigate('/');
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

                }}
            >
                {
                    ({ dirty, values, touched, errors, isSubmitting, handleReset, setFieldTouched, setFieldValue }) => (
                        <>
                            {viewAler ? <Alertinfo message={message} styleAlert={style} ></Alertinfo> : null}
                            <h1 style={{ "text_color": "#4D626C" }}>Registro</h1>
                            <Form>
                                <div className='row mt-2'>
                                    <div className="col form-group  ">
                                        <label className='fw-bold' htmlFor="nickname" > Nombre </label>
                                        <Field id="nickname" className="form-control" type="text" name="nickname" placeholder="nombre" />
                                        {
                                            errors.nickname && touched.nickname && (
                                                <ErrorMessage name='nickname' component="div" ></ErrorMessage>
                                            )
                                        }
                                    </div>
                                    <div className=" col form-group ">
                                        <label className='fw-bold' htmlFor="apellido" > Apellido </label>
                                        <Field id="apellido" className="form-control" type="text" name="apellido" placeholder="apellido" />
                                        {
                                            errors.apellido && touched.apellido && (
                                                <ErrorMessage name='apellido' component="div" ></ErrorMessage>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className="col form-group ">
                                        <label className='fw-bold' htmlFor="username" > Nombre de usuario </label>
                                        <Field id="username" className="form-control" type="text" name="username" placeholder="example123" />
                                        {
                                            errors.username && touched.username && (
                                                <ErrorMessage name='username' component="div" ></ErrorMessage>
                                            )
                                        }
                                    </div>
                                    <div className=" col form-group">

                                        <label className='fw-bold' htmlFor='password' > Contraseña </label>
                                        <Field id="password" className="form-control" type="password" name="password" placeholder="password" />
                                        {
                                            errors.password && touched.password && (
                                                <ErrorMessage name='password' component="div" ></ErrorMessage>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className="col form-group ">
                                        <label className='fw-bold' htmlFor="tipo_identificacion" > Tipo de documento </label>
                                        <MySelect
                                            value={values.tipo_identificacion}
                                            onChange={setFieldValue}
                                            onBlur={setFieldTouched}
                                            error={errors.tipo_identificacion}
                                            touched={touched.tipo_identificacion}
                                        />
                                    </div>
                                    <div className="col form-group ">

                                        <label className='fw-bold' htmlFor='num_identificacion' > Numero de Identificacion </label>
                                        <Field id="num_identificacion" className="form-control" type="number" name="num_identificacion" placeholder="0" />
                                        {
                                            errors.num_identificacion && touched.num_identificacion && (
                                                <ErrorMessage name='num_identificacion' component="div" ></ErrorMessage>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="form-group">

                                    <label className='fw-bold' htmlFor='correo' > Correo Eletrónico </label>
                                    <Field id="correo" className="form-control" type="text" name="correo" placeholder="example@gmail.com" />
                                    {
                                        errors.correo && touched.correo && (
                                            <ErrorMessage name='correo' component="div" ></ErrorMessage>
                                        )
                                    }
                                </div>
                                <div className='row mt-2'>
                                    <div className="col form-group  ">

                                        <label className='fw-bold' htmlFor='num_celular' > Numero de celular </label>
                                        <Field id="num_celular" className="form-control" type="number" name="num_celular" placeholder="0" />
                                        {
                                            errors.num_celular && touched.num_celular && (
                                                <ErrorMessage name='num_celular' component="div" ></ErrorMessage>
                                            )
                                        }
                                    </div>
                                    <div className="col form-group ">
                                        <label className='fw-bold' htmlFor="direccion" > Dirección </label>
                                        <Field id="direccion" className="form-control" type="text" name="direccion" placeholder="direccion" />
                                        {
                                            errors.direccion && touched.direccion && (
                                                <ErrorMessage name='direccion' component="div" ></ErrorMessage>
                                            )
                                        }
                                    </div>
                                </div>
                                <button type='submit' className="btn btn-block mt-3 mb-3 text-white" style={{ "background": "#2c4464" }}>Enviar</button>
                                {
                                    isSubmitting ? (<p>Validando informacion</p>) : null
                                }
                                <button
                                    type="button"
                                    className="btn btn-secondary mx-2"
                                    onClick={handleReset}
                                    disabled={!dirty || isSubmitting}
                                >
                                    Reset
                                </button>
                                <button type='button' onClick={inisiarSession()} className="btn btn-block mt-3 mb-3 text-white" style={{ "background": "#2c4464" }}>Iniciar Sesion</button>

                            </Form>
                        </>
                    )
                }

            </Formik>

        </div>
    );
}

class MySelect extends React.Component {
    handleChange = value => {
        // this is going to call setFieldValue and manually update values.topcis
        console.log(value)
        this.props.onChange("tipo_identificacion", value);
    };

    handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        this.props.onBlur("tipo_identificacion", true);
    };

    render() {
        return (
            <div >
                <Select
                    id="color"
                    options={options}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    value={this.props.value}
                />
                {!!this.props.error && this.props.touched && (
                    <div style={{ color: "red", marginTop: ".5rem" }}>
                        {this.props.error}
                    </div>
                )}
            </div>
        );
    }
}
export default RegistroForm;
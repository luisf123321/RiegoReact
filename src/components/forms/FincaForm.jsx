import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import Alertinfo from '../alerts/alertinfo';
import SimpleMap from '../mapa/map';
import  GoogleMapReact  from 'google-map-react';

const fincaSchema = Yup.object().shape(
    {
        nombre: Yup.string().required("username is requerido"),
        direccion: Yup.string().required("password is requerida"),
        latitud: Yup.string().required("username is requerido"),
        longitud: Yup.string().required("password is requerida"),
    }
);

const FincaForm = () => {

    const [userId, setIserId] = useState();
    const [viewAler, setviewAler] = useState(false);
    const [message, setmessage] = useState('');
    const [style, setstyle] = useState('');
    const initialCredentials = {
        nombre: '',
        direccion: '',
        latitud: 0,
        longitud: 0,
        altitud: 0,
        user_is: 0
    }

    const getUser = async () => {
        let response = await fetch("https://sirbic.up.railway.app/auth/who_am_i", {
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
            user_is: userId,
        };
        console.log(payload)

        await fetch('https://sirbic.up.railway.app/finca', {
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
                    ({ touched, errors, isSubmitting, dirty, handleReset, setFieldValue }) => (
                        <div className="container-fluid mt-4 pb-4 bg-white border rounded-5">

                            <div className='mx-2 px-5 mt-2'>
                                {viewAler ? <Alertinfo message={message} styleAlert={style} ></Alertinfo> : null}
                                <h2 className="mt-3" style={{ "text_color": "#4D626C" }}>Agregar Nueva Finca</h2>
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
                                            <Field disabled="true" id="latitud" className="form-control" type="number" name="latitud" placeholder="latitud" />
                                            {
                                                errors.latitud && touched.latitud && (
                                                    <ErrorMessage name='direccion' component="div" ></ErrorMessage>
                                                )
                                            }
                                        </div><div className=" col form-group  mt-3 m-2 mr-2 mb-2">

                                            <label htmlFor='longitud' > Longitud </label>
                                            <Field disabled="true" id="longitud" className="form-control" type="number" name="longitud" placeholder="longitud" />
                                            {
                                                errors.longitud && touched.longitud && (
                                                    <ErrorMessage name='longitud' component="div" ></ErrorMessage>
                                                )
                                            }
                                        </div><div className="col form-group  mt-3 m-2 mr-2 mb-2">

                                            <label htmlFor='altitud' > Altitud </label>
                                            <Field disabled="true" id="altitud" className="form-control" type="number" name="altitud" placeholder="altitud" />
                                            {
                                                errors.altitud && touched.altitud && (
                                                    <ErrorMessage name='altitud' component="div" ></ErrorMessage>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className='row mt-2 mx-1'>
                                        <MyMapFinca
                                            onChange={setFieldValue}
                                        />
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


class MyMapFinca extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 2.5,
                lng: -75
            }
        };
    }

    handleClick = event => {
        console.log("click data location")
        console.log(event)
        var latidud = event.lat;
        var longitud = event.lng;
        console.log(latidud);
        console.log(longitud)
        this.props.onChange("latitud", latidud);
        this.props.onChange("longitud", longitud);
    }

    render() {
        return (
            <div style={{ height: '20rem', width: '100%' }}>
                <GoogleMapReact
                    onClick={this.handleClick}
                    bootstrapURLKeys={{ key: "AIzaSyBD_lGr3qZKvjz7FZu4bpwcxMHayyJ6Qc8" }}
                    defaultCenter={this.state.center}
                    defaultZoom={5}
                >
                   

                </GoogleMapReact>
            </div>
        );
    }
}
export default FincaForm;

import React, { Component, Fragment, useState, useEffect, useId } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import Alertinfo from '../alerts/alertinfo';
import { useLocation } from "react-router-dom";
import GoogleMapReact from 'google-map-react';
import Select from "react-select";
const sectorSchema = Yup.object().shape(
    {
        nombre: Yup.string().required("Nombre is requerido"),
        area: Yup.number().required("Area is requerida"),
        latitud: Yup.number().required("Latitud is requerido"),
        longitud: Yup.number().required("longitud is requerida"),
        nodo: Yup.number().required("nodo is requerida"),
        tipoCultivo: Yup.object()
            .required("El  cultivo es requerido!"),
        tipoMuestra: Yup.object()
            .required("La muestra es requerido!")
    }
);
const SectorForm = () => {

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
        tipoMuestra: '',
        tipoCultivo: '',
        nodo: 0
    }

    const onSubmitForm = async (values) => {
        console.log("values sector");
        console.log(values);
        const payload = {
            ...values,
            lote: data.id,
            cultivo: values.tipoCultivo.id,
            tipoSuelo: values.tipoMuestra.tipoSuelo
        };
        console.log(payload)

        await fetch('https://sirbic.up.railway.app/sectores/', {
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
                validationSchema={sectorSchema}
                onSubmit={(values) => {
                    onSubmitForm(values);
                }}
            >

                {
                    ({ values, touched, dirty, errors, isSubmitting, handleReset, setFieldTouched, setFieldValue }) => (
                        <div className="container-fluid pb-4 bg-white border rounded-5">
                            <div className="mx-2 px-5 mb-3 mt-3">
                                {viewAler ? <Alertinfo message={message} styleAlert={style} ></Alertinfo> : null}
                                <h2 className="mt-3" style={{ "text_color": "#4D626C" }}>Nuevo Sector</h2>
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
                                        <div className=" col form-group  mt-3 m-2 mr-2 mb-2">

                                            <label htmlFor='nodo' > Nodo </label>
                                            <Field id="nodo" className="form-control" type="number" name="nodo" placeholder="nodo" />
                                            {
                                                errors.nodo && touched.nodo && (
                                                    <ErrorMessage name='nodo' component="div" ></ErrorMessage>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className="col form-group  mt-3 m-2 mr-2 mb-2">
                                            <label htmlFor="nombre" > Seleccionar cultivo </label>

                                            <MySelectCultivo
                                                value={values.tipoCultivo}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                error={errors.tipoCultivo}
                                                touched={touched.tipoCultivo} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col form-group  mt-3 m-2 mr-2 mb-2">
                                            <label htmlFor="nombre" > Seleccionar muestra </label>

                                            <MySelectMuestra
                                                value={values.tipoMuestra}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                error={errors.tipoMuestra}
                                                touched={touched.tipoMuestra} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col form-group  mt-3 m-2 mr-2 mb-2">

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
                                        <MyMapLote
                                            onChange={setFieldValue}
                                            longitud={data.longitud}
                                            latitud={data.latidud}
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

                                </Form>
                            </div>
                        </div>

                    )}

            </Formik>
        </div>
    );
}

class MyMapLote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            center: {
                lng: props.longitud,
                lat: props.latitud
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
                    defaultZoom={15}
                >
                </GoogleMapReact>
            </div>
        );
    }
}


class MySelectCultivo extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
        console.log(props);
    }
    handleChange = value => {
        // this is going to call setFieldValue and manually update values.topcis
        console.log(value)
        this.props.onChange("tipoCultivo", value);
    };

    handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        this.props.onBlur("tipoCultivo", true);
    };

    async componentDidMount() {
        let userId = 0;
        let responseUser = await fetch("https://sirbic.up.railway.app/auth/who_am_i", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });

        if (responseUser.status === 200) {
            let data = await responseUser.json();
            userId = data['id']
        } else {
            localStorage.removeItem('token')
        }
        let response = await fetch("https://sirbic.up.railway.app/cultivo/user/" + userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })

        if (response.status === 200) {
            let dataResponse = await response.json();
            console.log(dataResponse);
            this.setState({ data: dataResponse.cultivo });
        }
    }


    render() {
        return (
            <div style={{ margin: "1rem 0" }}>
                <Select
                    id="color"
                    options={this.state.data}
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

class MySelectSuelo extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
        console.log(props);
    }
    handleChange = value => {
        // this is going to call setFieldValue and manually update values.topcis
        console.log(value)
        this.props.onChangeDays(value.total)
        this.props.onChange("fechaFinal", new Date(new Date().setDate(this.props.valueDateInitial.getDate() + value.total)))
        this.props.onChange("tipoCultivo", value);
    };

    handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        this.props.onBlur("tipoCultivo", true);
    };

    async componentDidMount() {
        let response = await fetch("https://sirbic.up.railway.app/cultivo/tipos", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })

        if (response.status === 200) {
            let dataResponse = await response.json();
            console.log(dataResponse);
            this.setState({ data: dataResponse.tipos });
        }
    }


    render() {
        return (
            <div style={{ margin: "1rem 0" }}>
                <Select
                    id="color"
                    options={this.state.data}
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
class MySelectMuestra extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
        console.log(props);
    }
    handleChange = value => {
        // this is going to call setFieldValue and manually update values.topcis
        console.log(value)
        this.props.onChange("tipoMuestra", value);
    };

    handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        this.props.onBlur("tipoMuestra", true);
    };

    async componentDidMount() {
        let userId = 0;
        let responseUser = await fetch("https://sirbic.up.railway.app/auth/who_am_i", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });

        if (responseUser.status === 200) {
            let data = await responseUser.json();
            userId = data['id']
        } else {
            localStorage.removeItem('token')
        }
        let response = await fetch("https://sirbic.up.railway.app/prediction/muestras/" + userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })

        if (response.status === 200) {
            let dataResponse = await response.json();
            console.log(dataResponse);
            this.setState({ data: dataResponse.muestras });
        }
    }


    render() {
        return (
            <div style={{ margin: "1rem 0" }}>
                <Select
                    id="color"
                    options={this.state.data}
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
export default SectorForm;

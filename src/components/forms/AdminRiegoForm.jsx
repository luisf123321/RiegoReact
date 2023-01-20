import React from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup'
import Select from "react-select";

const adminRiegoSchema = Yup.object().shape(
    {
        caudal: Yup.string().required("Caudal es requerido"),
        distancia: Yup.string().required('Distancia entre emisores es requirido')
        ,
        radio: Yup.string().required('Distancia lateral es requirido')
        ,
        tipoRiego: Yup.object().required('El tipo de riego es requirido')
        ,
        tipoSector: Yup.object()
            .required("El sector es requerido!")

    }
);

const AdminRiegoForm = () => {

    const initialCredentials = {
        caudal: '',
        distancia: '',
        tipoRiego: '',
        tipoSector: '',
        radio: ''
    }


    return (
        <div>

            <Formik
                initialValues={initialCredentials}
                validationSchema={adminRiegoSchema}

                onSubmit={async (values) => {
                    console.log("envio");
                    console.log(values);
                }}

            >
                {
                    ({ values, touched, dirty, errors, isSubmitting, handleReset, setFieldTouched, setFieldValue }) => (
                        <div className="container-fluid  bg-white border rounded-5">
                            <div className="row-fluid m-3 p-3">
                            <h2 className="mb-3" style={{ "text_color": "#4D626C" }}>Agregar Nueva Gestión De Riego</h2>
                               
                                <div className="mt-3">
                                    <Form>
                                        <div className='row'>
                                            <div className="col form-group ">
                                                <label htmlFor="nombre" > Seleccione el tipo de riego </label>

                                                <MySelectTipoRiego
                                                    value={values.tipoRiego}

                                                    onChange={setFieldValue}
                                                    onBlur={setFieldTouched}

                                                    error={errors.tipoRiego}
                                                    touched={touched.tipoRiego}
                                                />
                                            </div>
                                            <div className="col form-group  ">
                                                <label htmlFor="nombre" > Seleccione un sector de riego </label>
                                                <MySelectSectores
                                                    value={values.tipoSector}

                                                    onChange={setFieldValue}
                                                    onBlur={setFieldTouched}

                                                    error={errors.tipoSector}
                                                    touched={touched.tipoSector}
                                                />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="col form-group ">
                                                <label htmlFor="caudal" > Caudal </label>

                                                <Field id="caudal" className="form-control" type="text" name="caudal" placeholder="example" />
                                                {
                                                    errors.caudal && touched.caudal && (
                                                        <ErrorMessage style={{ color: "red", marginTop: ".5rem" }} name='caudal' component="div" ></ErrorMessage>
                                                    )
                                                }
                                            </div>
                                            <div className="col form-group ">
                                                <label htmlFor="distancia" > Distancia entre emisor </label>

                                                <Field id="distancia" className="form-control" type="text" name="distancia" placeholder="example" />
                                                {
                                                    errors.distancia && touched.distancia && (
                                                        <ErrorMessage style={{ color: "red", marginTop: ".5rem" }} name='distancia' component="div" ></ErrorMessage>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className="col form-group  ">
                                                <label htmlFor="radio" > Distancia lateral </label>

                                                <Field id="radio" className="form-control" type="text" name="radio" placeholder="radio" />
                                                {
                                                    errors.radio && touched.radio && (
                                                        <ErrorMessage style={{ color: "red", marginTop: ".5rem" }} name='radio' component="div" ></ErrorMessage>
                                                    )
                                                }
                                            </div>
                                        </div>


                                        <button type='submit' className='btn text-white mt-3 m-2 mr-2 mb-2 ' style={{ "background": "#2c4464" }} >Guardar</button>
                                        {
                                            isSubmitting ? (<p>create Registros</p>) : null
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
                        </div>
                    )
                }

            </Formik>

        </div>
    );
}


class MySelectTipoRiego extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
        console.log(props);
    }
    handleChange = value => {
        // this is going to call setFieldValue and manually update values.topcis
        this.props.onChange("tipoRiego", value);
    };

    handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        this.props.onBlur("tipoRiego", true);
    };

    async componentDidMount() {
        let response = await fetch("https://sirbic.up.railway.app/riego/tipo", {
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

class MySelectSectores extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
        console.log(props);
    }
    handleChange = value => {
        // this is going to call setFieldValue and manually update values.topcis
        this.props.onChange("tipoSector", value);
    };

    handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        this.props.onBlur("tipoSector", true);
    };

    async componentDidMount() {
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
            this.getSectores(data['id'])
        }
    }

    getSectores = async (usuario) => {
        let response = await fetch("https://sirbic.up.railway.app/sectores/usuario/" + usuario, {
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
            this.setState({ data: dataResponse.sectores });
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
export default AdminRiegoForm;

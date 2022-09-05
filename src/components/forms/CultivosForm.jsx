import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import Select from "react-select";


const cultivoSchema = Yup.object().shape(
    {
        nombre: Yup.string().required("Nombre es requerido"),
        fechaInicio: Yup.date().nullable().required('Fecha inicio es requirido')
        ,
        fechaFinal: Yup.date().nullable().required('Fecha final es requirido')
        ,
        tipo: Yup.object()

            .required("El tipo de cultivo es requerido!")

    }
);
const options = [
    { value: "Food", label: "Food" },
    { value: "Being Fabulous", label: "Being Fabulous" },
    { value: "Ken Wheeler", label: "Ken Wheeler" },
    { value: "ReasonML", label: "ReasonML" },
    { value: "Unicorns", label: "Unicorns" },
    { value: "Kittens", label: "Kittens" }
];
const CultivosForm = () => {
    const initialCredentials = {
        nombre: '',
        fechaInicio: '',
        fechaFinal: '',
        tipoCultivo: '',
        user_id: 0,
    }

    const [status, setstatus] = useState(false);
    const [userId, setuserId] = useState(0);
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
                let data = await response.json();
                setuserId(data["id"]);
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

    const getTipoCultivo = async () => {

    }

    useEffect(() => {
        getUser();
    }, []);

    const [message, setmessage] = useState(null);
    return (
        <div>
            <Formik
                initialValues={initialCredentials}
                validationSchema={cultivoSchema}

                onSubmit={(values, { setSubmitting }) => {
                    const payload = {
                        ...values,
                        tipoCultivo: values.tipoCultivo.value,
                        user_id: userId
                    };

                    setTimeout(() => {
                        alert(JSON.stringify(payload, null, 2));
                        setSubmitting(false);
                    }, 1000);

                    console.log(values)
                }}

            >
                {
                    ({ values, touched, dirty, errors, isSubmitting, handleReset, setFieldTouched, setFieldValue }) => (
                        <div className="container">
                            <div className="row mt-3 mb-3 ">
                                <div className="col-lg-9 px-52mx-3 mb-3">
                                    <Form>
                                        <div className="form-group mt-3 m-2 mr-2 mb-2 ">
                                            <label htmlFor="nombre" > Nombre del cultivo </label>

                                            <Field id="nombre" className="form-control" type="text" name="nombre" placeholder="example" />
                                            {
                                                errors.nombre && touched.nombre && (
                                                    <ErrorMessage style={{ color: "red", marginTop: ".5rem" }} name='nombre' component="div" ></ErrorMessage>
                                                )
                                            }
                                        </div>
                                        <div className="form-group mt-3 m-2 mr-2 mb-2 ">
                                            <label htmlFor="nombre" > Nombre del cultivo </label>

                                            <MySelect
                                                value={values.tipoCultivo}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                error={errors.tipoCultivo}
                                                touched={touched.tipoCultivo}
                                            />
                                        </div>
                                        <div className='row'>
                                            <div className="col form-group  mt-3 m-2 mr-2 mb-2">
                                                <label htmlFor='fechaInicio' > Fecha inicio </label>
                                                <DatePicker selected={values.fechaInicio} className="form-control" onChange={date => setFieldValue('fechaInicio', date)} />
                                                {
                                                    errors.fechaInicio && touched.fechaInicio && (
                                                        <ErrorMessage style={{ color: "red", marginTop: ".5rem" }} name='fechaInicio' component="div" ></ErrorMessage>
                                                    )
                                                }
                                            </div>
                                            <div className="col form-group  mt-3 m-2 mr-2 mb-2">
                                                <label htmlFor='fechaFinal' > Fecha final </label>
                                                <DatePicker selected={values.fechaFinal} className="form-control" onChange={date => setFieldValue('fechaFinal', date)} />
                                                {
                                                    errors.fechaFinal && touched.fechaFinal && (
                                                        <ErrorMessage style={{ color: "red", marginTop: ".5rem" }} name='fechaFinal' component="div" ></ErrorMessage>
                                                    )
                                                }
                                            </div>


                                        </div>

                                        <button type='submit' className="btn btn-primary btn-block mt-3 m-2 mr-2 mb-2">Guardar</button>
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



class MySelect extends React.Component {
    handleChange = value => {
        // this is going to call setFieldValue and manually update values.topcis
        console.log(value)
        this.props.onChange("tipoCultivo", value);
    };

    handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        this.props.onBlur("tipoCultivo", true);
    };

    render() {
        return (
            <div style={{ margin: "1rem 0" }}>
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

export default CultivosForm;

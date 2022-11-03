import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import Select from "react-select";
import LogoPlanta from "../../Assets/Logo_planta_2.svg"

const cultivoSchema = Yup.object().shape(
    {
        nombre: Yup.string().required("Nombre es requerido"),
        fechaInicio: Yup.date().required('Fecha inicio es requirido')
        ,
        fechaFinal: Yup.date().required('Fecha final es requirido')
        ,
        tipoCultivo: Yup.object()
            .required("El tipo de cultivo es requerido!")

    }
);
const CultivosForm = () => {
    const initialCredentials = {
        nombre: '',
        fechaInicio: new Date(),
        fechaFinal: new Date(),
        tipoCultivo: '',
        user_id: 0,
    }
    const [days, setdays] = useState(0);
    const [status, setstatus] = useState(false);
    const [userId, setuserId] = useState(0);
    const [dateInitial, setdateInitial] = useState(new Date());
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


    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            <Formik
                initialValues={initialCredentials}
                validationSchema={cultivoSchema}

                onSubmit={async (values) => {
                    console.log("envio");
                    console.log(values);
                }}

            >
                {
                    ({ values, touched, dirty, errors, isSubmitting, handleReset, setFieldTouched, setFieldValue }) => (
                        <div className="container-fluid  bg-white border rounded-5">
                            <div className="row mt-3 mb-3 px-2 py-2">
                                <div className="col-lg-8 ">
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
                                                valueDateInitial={values.fechaInicio}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                onChangeDays={setdays}
                                                error={errors.tipoCultivo}
                                                touched={touched.tipoCultivo}
                                            />
                                        </div>
                                        <div className='row'>
                                            <div className="col form-group  mt-3 m-2 mr-2 mb-2">
                                                <label htmlFor='fechaInicio' > Fecha inicio </label>
                                                <DatePicker selected={values.fechaInicio} className="form-control" onChange={date => { setFieldValue('fechaInicio', date); setFieldValue('fechaFinal', new Date(new Date().setDate(date.getDate() + days))); }} />
                                                {
                                                    errors.fechaInicio && touched.fechaInicio && (
                                                        <ErrorMessage style={{ color: "red", marginTop: ".5rem" }} name='fechaInicio' component="div" ></ErrorMessage>
                                                    )
                                                }
                                            </div>
                                            <div className="col form-group  mt-3 m-2 mr-2 mb-2">
                                                <label htmlFor='fechaFinal' > Fecha final </label>
                                                <DatePicker disabled={true} selected={values.fechaFinal} className="form-control" onChange={date => setFieldValue('fechaFinal', date)} />
                                                {
                                                    errors.fechaFinal && touched.fechaFinal && (
                                                        <ErrorMessage style={{ color: "red", marginTop: ".5rem" }} name='fechaFinal' component="div" ></ErrorMessage>
                                                    )
                                                }
                                            </div>


                                        </div>

                                        <button type='submit' className="btn text-white btn-block mt-3 m-2 mr-2 mb-2"  style={{"background":"#2c4464"}}>Guardar</button>
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
                                <div className='col-lg-4 d-flex justify-content-center'>
                                    <img src={LogoPlanta} alt="SVG logo image"   width={260} height={260} />

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
        let response = await fetch("https://riegoback.herokuapp.com/cultivo/tipos", {
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

export default CultivosForm;

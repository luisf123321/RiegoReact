import React,{useEffect,useState} from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import Alertinfo from '../alerts/alertinfo';

const dispositivoSchema = Yup.object().shape(
    {
        nombre: Yup.string().required("Nombre es requerido"),
        descripcion: Yup.string().required('Fecha inicio es requirido')
        ,
        tipoDispositivo: Yup.object()
        .required("El tipo de dispositivo es requerido!")
        ,
        tipoSector: Yup.object()
            .required("El Sector es requerido!")

    }
);



const DispositivosForm = () => {

    
    const initialCredentials = {
        nombre: '',
        descripcion: '',
        tipoDispositivo: '',
        tipoSector: ''
    }

    const onSubmitForm = async (values) => {
        console.log("values dispositivo");
        console.log(values);
        const payload = {
            ...values,
            tipoDispositivo: values.tipoDispositivo.id,
            tipoSector:values.tipoSector.id
        };
        console.log(payload)
    
        await fetch('https://sirbic.up.railway.app/riego/dispositivo', {
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

    const [viewAler, setviewAler] = useState(false);
    const [style, setstyle] = useState('');
    const [message, setmessage] = useState('');
    return (
        <div>

            <Formik
                initialValues={initialCredentials}
                validationSchema={dispositivoSchema}

                onSubmit={async (values) => {
                    onSubmitForm(values)
                }}

            >
                {
                    ({ values, touched, dirty, errors, isSubmitting, handleReset, setFieldTouched, setFieldValue }) => (
                        <div className="container-fluid  bg-white border rounded-5">
                            <div className="row-fluid m-3 p-3">
                            {viewAler ? <Alertinfo message={message} styleAlert={style} ></Alertinfo> : null}
                                <h2 className="mb-3" style={{ "text_color": "#4D626C" }}>Agregar Nuevo Dispositivo</h2>                                
                                <div className="mt-3">
                                    <Form>
                                    <div className='row'>
                                            <div className="col form-group ">
                                                <label htmlFor="nombre" > Nombre  </label>

                                                <Field id="nombre" className="form-control" type="text" name="nombre" placeholder="example" />
                                                {
                                                    errors.nombre && touched.nombre && (
                                                        <ErrorMessage style={{ color: "red", marginTop: ".5rem" }} name='nombre' component="div" ></ErrorMessage>
                                                    )
                                                }
                                            </div>
                                            <div className="col form-group ">
                                                <label htmlFor="descripcion" > Descripcion </label>

                                                <Field id="descripcion" className="form-control" type="text" name="descripcion" placeholder="example" />
                                                {
                                                    errors.descripcion && touched.descripcion && (
                                                        <ErrorMessage style={{ color: "red", marginTop: ".5rem" }} name='descripcion' component="div" ></ErrorMessage>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                        
                                            <div className="col form-group ">
                                                <label htmlFor="tipoDispositivo" > Seleccione el tipo de dispositivo </label>

                                                <MySelectDispositivo
                                                    value={values.tipoDispositivo}

                                                    onChange={setFieldValue}
                                                    onBlur={setFieldTouched}

                                                    error={errors.tipoDispositivo}
                                                    touched={touched.tipoDispositivo}
                                                />
                                            </div>
                                            <div className="col form-group  ">
                                                <label htmlFor="tipoSector" > Seleccione un sector de riego </label>
                                                <MySelectSectores
                                                    value={values.tipoSector}

                                                    onChange={setFieldValue}
                                                    onBlur={setFieldTouched}

                                                    error={errors.tipoSector}
                                                    touched={touched.tipoSector}
                                                />
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

class MySelectDispositivo extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
        console.log(props);
    }
    handleChange = value => {
        // this is going to call setFieldValue and manually update values.topcis
        this.props.onChange("tipoDispositivo", value);
    };

    handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        this.props.onBlur("tipoDispositivo", true);
    };

    async componentDidMount() {
        let response = await fetch("https://sirbic.up.railway.app/riego/tipodispositivo", {
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

    getSectores = async (usuario)=>{
        let response = await fetch("https://sirbic.up.railway.app/sectores/usuario/"+usuario , {
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
export default DispositivosForm;

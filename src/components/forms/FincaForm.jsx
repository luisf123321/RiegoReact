import React from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';


const fincaSchema = Yup.object().shape(
    {
        nombre: Yup.string().required("username is requerido"),
        direccion: Yup.string().required("password is requerida"),
        latitud: Yup.string().required("username is requerido"),
        longitud: Yup.string().required("password is requerida"),
    }
);

const FincaForm = (props) => {

    const [userId, setIserId] = useState(props.userId);

    const initialCredentials = {
        nombre: '',
        direccion: '',
        latitud: 0,
        longitud: 0,
        altitud: 0,
        user_is: userId
    }





    const navigate = useNavigate();

    const onSubmitForm = async (values) => {
        console.log("values finca");
        console.log(values);

        await fetch('https://riegoback.herokuapp.com/finca', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values),
        })
            .then(resp => resp.json())
            .then(data => {

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
                    ({ touched, errors, isSubmitting }) => (

                        <div className="container">
                            <div className="row mt-3 mb-3 ">
                                <div className="col-lg-5 px-52mx-3 mb-3">
                                    <h1 className="mt-5 text-primary">Login</h1>
                                    <Form>
                                        <div className="form-group mt-3 m-2 mr-2 mb-2 ">
                                            <label htmlFor="nombre" > Nombre </label>
                                            <Field id="nombre" className="form-control" type="text" name="nombre" placeholder="nombre" />
                                            {
                                                errors.nombre && touched.nombre && (
                                                    <ErrorMessage name='nombre' component="div" ></ErrorMessage>
                                                )
                                            }
                                        </div>
                                        <div className="form-group  mt-3 m-2 mr-2 mb-2">

                                            <label htmlFor='direccion' > direccion </label>
                                            <Field id="direccion" className="form-control" type="text" name="direccion" placeholder="direccion" />
                                            {
                                                errors.direccion && touched.direccion && (
                                                    <ErrorMessage name='direccion' component="div" ></ErrorMessage>
                                                )
                                            }
                                        </div>
                                        <div className="form-group  mt-3 m-2 mr-2 mb-2">

                                            <label htmlFor='latitud' > Latitud </label>
                                            <Field id="latitud" className="form-control" type="number" name="latitud" placeholder="latitud" />
                                            {
                                                errors.latitud && touched.latitud && (
                                                    <ErrorMessage name='direccion' component="div" ></ErrorMessage>
                                                )
                                            }
                                        </div><div className="form-group  mt-3 m-2 mr-2 mb-2">

                                            <label htmlFor='longitud' > Longitud </label>
                                            <Field id="longitud" className="form-control" type="number" name="longitud" placeholder="longitud" />
                                            {
                                                errors.longitud && touched.longitud && (
                                                    <ErrorMessage name='longitud' component="div" ></ErrorMessage>
                                                )
                                            }
                                        </div><div className="form-group  mt-3 m-2 mr-2 mb-2">

                                            <label htmlFor='altitud' > Altitud </label>
                                            <Field id="altitud" className="form-control" type="number" name="altitud" placeholder="altitud" />
                                            {
                                                errors.altitud && touched.altitud && (
                                                    <ErrorMessage name='altitud' component="div" ></ErrorMessage>
                                                )
                                            }
                                        </div>
                                        <button type='submit' className="btn btn-primary btn-block mt-3 m-2 mr-2 mb-2">Enviar</button>
                                        
                                        {
                                            isSubmitting ? (<p>login your credenciales</p>) : null
                                        }
                                    </Form>
                                </div>
                                <div className='col-lg-5 mx-5 px-5 my-3 '>
                                    <img src={Logo} alt="SVG logo image" width={289} height={384} />
                                </div>
                            </div>
                        </div>
                    )}

            </Formik>
        </div>
    );
}

export default FincaForm;

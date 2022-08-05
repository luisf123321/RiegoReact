import React from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import Logo from "../../Assets/Logo.svg"

const loginSchema = Yup.object().shape(
    {
        username: Yup.string().required("username is requerido"),
        password: Yup.string().required("password is requerida")
    }
);

const LoginForm = () => {

    const initialCredentials = {
        username: '',
        password: ''
    }


    const navigate = useNavigate();


    return (
        <div>
            <Formik
                initialValues={initialCredentials}
                validationSchema={loginSchema}

                onSubmit={async (values) => {
                    await fetch('https://riegoback.herokuapp.com/auth/login', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values),
                    })
                        .then(resp => resp.json())
                        .then(data => {
                            localStorage.setItem("token", data.access_token);
                            console.log(data.access_token);
                            navigate('/fincas');
                        })
                        .catch(error => {
                            console.log(error)
                        });
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
                                            <label htmlFor="username" > Username </label>
                                            <Field id="username" className="form-control" type="text" name="username" placeholder="example123" />
                                            {
                                                errors.username && touched.username && (
                                                    <ErrorMessage name='username' component="div" ></ErrorMessage>
                                                )
                                            }
                                        </div>
                                        <div className="form-group  mt-3 m-2 mr-2 mb-2">

                                            <label htmlFor='password' > Password </label>
                                            <Field id="password" className="form-control" type="password" name="password" placeholder="password" />
                                            {
                                                errors.password && touched.password && (
                                                    <ErrorMessage name='password' component="div" ></ErrorMessage>
                                                )
                                            }
                                        </div>
                                        <button type='submit' className="btn btn-primary btn-block mt-3 m-2 mr-2 mb-2">Login</button>
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
                    )
                }

            </Formik>

        </div>
    );
}

export default LoginForm;

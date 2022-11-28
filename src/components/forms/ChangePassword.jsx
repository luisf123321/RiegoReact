import React from 'react';

import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup'

const passwordSchema = Yup.object().shape(
    {
        password: Yup.string().required("This field is required"),
        changepassword: Yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Both password need to be the same"
            )
        })
    }
);
const ChangePassword = () => {

    const initialCredentials = {
        password: '',
        changepassword: ''
    }
    return (
        <div>
            <Formik
                initialValues={initialCredentials}
                validationSchema={passwordSchema}

                onSubmit={async (values) => {
                    
                }}

            >
                {
                    ({ touched, errors, isSubmitting }) => (

                        <>
                            <h1 className="mt-3 " style={{ "text_color": "#4D626C" }}>Cambiar contraseña</h1>
                            <Form>
                                <div className="form-group mt-2">

                                    <label htmlFor='password' > Contraseña </label>
                                    <Field id="password" className="form-control" type="password" name="password" placeholder="password" />
                                    {
                                        errors.password && touched.password && (
                                            <ErrorMessage name='password' component="div" ></ErrorMessage>
                                        )
                                    }
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="changepassword" > Confirmar Contraseña </label>
                                    <Field id="changepassword" className="form-control"  type="password" name="changepassword" placeholder="password" />
                                    {
                                        errors.changepassword && touched.changepassword && (
                                            <ErrorMessage name='changepassword' component="div" ></ErrorMessage>
                                        )
                                    }
                                </div>
                                <button type='submit' className="btn btn-block mt-2 text-white " style={{ "background": "#2c4464" }}>Cambiar contraseña</button>
                                {
                                    isSubmitting ? (<p>login your credenciales</p>) : null
                                }
                            </Form>
                        </>
                    )
                }

            </Formik>

        </div>
    );
}

export default ChangePassword;

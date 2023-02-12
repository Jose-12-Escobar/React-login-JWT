import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../../services/serviceAuthentication';

const RegisterForm = () => {

    const navigate = useNavigate();

    const navLogin = (path) =>{
        navigate(path);
    }

    const validateRegister = (values) => {
        register(values.name, values.lastname, values.email, values.password)
        .then((response) => {
            console.log(response)
            navLogin('/')
        })
        .catch((error) => {
            console.log(`Error de autenticacion ${error}`);
        })
    }

    const initialCredentials = {
        name: '',
        lastname: '',
        email: '',
        password: ''
    }

    const registerSchema = Yup.object().shape(
        {
            name: Yup.string()
                .min(3, 'Name too short')
                .required('Name is requiered'),

            lastname: Yup.string()
                .min(3, 'Lastname too short')
                .required('Lastname is requiered'),

            email: Yup.string()
                .email('Invalid email format')
                .required('Email is requiered'),

            password: Yup.number()
                .required('Password is requiered')
        }
    )
    return (
        <div>
            <Formik
                // **** Initial values that the form will take ****
                initialValues={initialCredentials}
                // *** Yuo Validation schema ***
                validationSchema={registerSchema}
                // ** onSubmit Event **
                onSubmit={async (values) => {
                    validateRegister(values);
                }}
            >

                {({ values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur }) => (


                    <Form className='row justify-content-center'>
                    <div className='pb-5'>
                            <h1 className='text-light'>Register</h1>
                        </div>
                        <div className="mb-3 col-3">
                            <label htmlFor="email" className='form-label text-light'>Name</label>
                            <Field id="name" type="text" name="name" placeholder="Name" class="form-control" />
                            {/* Name Erros */}
                            {
                                errors.name && touched.name &&
                                (
                                    <ErrorMessage component="div" name="name" className='form-label text-danger' />
                                )

                            }
                        </div>
                        <div className="mb-3 col-7">
                            <label htmlFor="lastname" className='form-label text-light'>Lastname</label>
                            <Field id="lastname" name="lastname" placeholder="lastname" type="text" class="form-control" />

                            {/* Lastname Erros */}
                            {
                                errors.lastname && touched.lastname &&
                                (

                                    <ErrorMessage component="div" name="lastname" className='form-label text-danger' />
                                )
                            }
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="email" className='form-label text-light'>Email</label>
                            <Field id="email" type="email" name="email" placeholder="example@email.com" class="form-control" />

                            {/* Email Erros */}
                            {
                                errors.email && touched.email &&
                                (
                                    <ErrorMessage component="div" name="email" className='form-label text-danger' />
                                )

                            }
                        </div>
                        <div className="mb-3 col-4">
                            <label htmlFor="password" className='form-label text-light'>Password</label>
                            <Field id="password" name="password" placeholder="password" type="password" class="form-control" />

                            {/* Password Erros */}
                            {
                                errors.password && touched.password &&
                                (

                                    <ErrorMessage component="div" name="password" className='form-label text-danger' />
                                )
                            }
                        </div>
                        <button type="submit" className="btn btn-primary col-4">Register</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default RegisterForm;

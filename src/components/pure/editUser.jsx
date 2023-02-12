import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { editUserByID } from '../../services/serviceAuthentication';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

const EditUser = () => {

    let tokenLogin = useSelector((state) => state.loginState.token)
    let userData = useSelector((state) => state.editState.user)
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    
    const navUsersList = (path) =>{
         navigate(path);
    }

    const editUser = (values) => {
        setIsLogin(true)
        editUserByID(values.id, values.name, values.lastname, values.email, values.password, tokenLogin)
            .then((response) => {
                setTimeout(() => {
                    setIsLogin(false)
                }, 800);
                navUsersList('/user')
            })
            .catch((error) => {
                console.log(`Error al editar el usuario ${error}`);
            })
    }

    const initialCredentials = {
        id: userData.id,
        name: userData.name,
        lastname: userData.lastName,
        email: userData.email,
        password: userData.password
    }

    const editSchema = Yup.object().shape(
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
        <> {isLogin ? <Spinner animation="border" variant="primary" /> : <div>
            <Formik
                // **** Initial values that the form will take ****
                initialValues={initialCredentials}
                // *** Yuo Validation schema ***
                validationSchema={editSchema}
                // ** onSubmit Event **
                onSubmit={async (values) => {
                    editUser(values);
                }}
            >

                {({ values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur }) => (


                    <Form className='row justify-content-center'>
                        <h2 className='text-light  mb-5 pt-5'>Edit of User</h2>
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
                        <div className="mb-3 col-5">
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
                        <button type="submit" className="btn btn-primary col-4">Send</button>
                    </Form>
                )}
            </Formik>
        </div>} </>

    );
}

export default EditUser;

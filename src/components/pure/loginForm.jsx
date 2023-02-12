import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { login } from '../../services/serviceAuthentication';
import { useDispatch } from 'react-redux';
import { saveToken } from '../../app/reducers/loginSlice';
import Spinner from 'react-bootstrap/Spinner';

const LoginForm = () => {

    const [isLogin, setIsLogin] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const navUsersList = (path) =>{
         navigate(path);
    }

    const authUser = (values) => {
        setIsLogin(true)
        login(values.email, values.password)
            .then((response) => {
                dispatch(saveToken( {"token": response.data.token} ))
                setTimeout(() => {
                    setIsLogin(false)
                }, 800);
                navUsersList('/user')
            })
            .catch((error) => {
                console.log(`Error de autenticacion ${error}`);
            })
    }

    const initialCredentials = {
        email: '',
        password: ''
    }

    const loginSchema = Yup.object().shape(
        {
            email: Yup.string()
                .email('Invalid email format')
                .required('Email is requiered'),
            password: Yup.string()
                .required('Password is requiered')
        }
    )

    return (
        <> {isLogin ? <Spinner animation="border" variant="primary" /> : <div>
            <Formik
                // **** Initial values that the form will take ****
                initialValues={initialCredentials}
                // *** Yuo Validation schema ***
                validationSchema={loginSchema}
                // ** onSubmit Event **
                onSubmit={(values) => {
                    authUser(values);
                }}
            >

                {({ values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur }) => (

                    <Form >
                        <div className='pb-5'>
                            <h1 className='text-light'>Login JWT</h1>
                        </div>
                        <div className='border border-white'>
                            <div className="mb-3 px-3 py-2">
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
                            <div className="mb-3 px-3 py-2">
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
                            <button type="submit" className="btn btn-primary" >Login</button>
                            <div className='py-3'>
                                <em>
                                    <Link to='/register'>Register</Link>
                                </em>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>} </>

    );
}

export default LoginForm;

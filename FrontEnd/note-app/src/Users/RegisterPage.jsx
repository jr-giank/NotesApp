import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { AppContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import "../styles/RegisterPage.css"

//Validaciones de campos
const registerSchema =  yup.object().shape({
    first_name: yup.string()
    .required("Campo requerido"),
    last_name: yup.string()
    .required("Campo requerido"),
    username: yup.string()
    .required("Campo requerido")
    .min(5, "Min 5 caracteres"),
    email: yup.string()
    .required("Campo requerido"),
    password: yup.string()
    .required("Campo requerido")
    .min(6, "Min 6 caracteres")
})

export const RegisterPage = () => {
    const {registerService} = useContext(AppContext);
    const navigate = useNavigate();

    return(
        <div>
            <Formik
                initialValues={{first_name:"", last_name:"", username:"", email:"", password:""}}
                validationSchema={registerSchema}
                onSubmit={values => {
                    async function register(){
                        await registerService(values)
                        navigate('/login')
                    }

                    register();
                }}
            >
                {({errors, touched}) => (
                    <Form className="Form">
                        <h2 className="Registrate">Registrate</h2>

                        <div className="Contenedores">
                            <Field
                                type="text"
                                autoComplete="off"
                                placeholder="Nombre"
                                name="first_name"
                                className="Inputs"
                            />
                            {errors.first_name && touched.first_name ? (
                                <div className='Errors'>{errors.first_name}</div>
                            ) : null}
                        </div>

                        <div className="Contenedores">
                            <Field
                                type="text"
                                autoComplete="off"
                                placeholder="Apellido"
                                name="last_name"
                                className="Inputs"
                            />
                            {errors.last_name && touched.last_name ? (
                                <div className='Errors'>{errors.last_name}</div>
                            ) : null}
                        </div>

                        <div className="Contenedores">
                            <Field
                                type="text"
                                autoComplete="off"
                                placeholder="Nombre de usuario"
                                name="username"
                                className="Inputs"
                            />
                            {errors.username && touched.username ? (
                                <div className='Errors'>{errors.username}</div>
                            ) : null}
                        </div>

                        <div className="Contenedores">
                            <Field
                                type="text"
                                autoComplete="off"
                                placeholder="Email"
                                name="email"
                                className="Inputs"
                            />
                            {errors.email && touched.email ? (
                                <div className='Errors'>{errors.email}</div>
                            ) : null}
                        </div>

                        <div className="Contenedores">
                            <Field
                                type="password"
                                autoComplete="off"
                                placeholder="Contraseña"
                                name="password"
                                className="Inputs"
                            />
                            {errors.password && touched.password ? (
                                <div className='Errors'>{errors.password}</div>
                            ) : null}
                        </div>

                        <button type="submit" className="button">Registrarse</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
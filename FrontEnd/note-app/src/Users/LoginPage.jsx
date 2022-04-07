import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { AppContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css"

const loginSchema = yup.object().shape({
    username: yup.string()
    .required("Nombre de usuario"),
    password: yup.string()
    .required("Contraseña")
    .min(6, "Min 6 caracteres")
})

export const LoginPage = () => {

    const {loginService} = useContext(AppContext);
    const navigate = useNavigate();

    return(
        <div>
            <Formik
                initialValues={{username:'', password:''}}
                validationSchema={loginSchema}
                onSubmit={values => {
                    loginService(values).then(
                        navigate('/')
                    )
                }}
            >
                {({errors, touched}) => (
                    <Form className="FormLogin">
                        <h2 className="Acceder">Acceder</h2>

                        <div className="ContenedoresLogin">
                            <Field
                                type="text"
                                autoComplete="off"
                                placeholder="Nombre de usuario"
                                name="username"
                                className="InputsLogin"
                            />
                            {errors.username && touched.username ? (
                                <div className='ErrorsLogin'>{errors.username}</div>
                            ) : null}
                        </div>

                        <div className="ContenedoresLogin">
                            <Field
                                type="password"
                                autoComplete="off"
                                placeholder="Contraseña"
                                name="password"
                                className="InputsLogin"
                            />
                            {errors.password && touched.password ? (
                                <div className='ErrorsLogin'>{errors.password}</div>
                            ) : null}
                        </div>

                        <button type="submit" className="buttonLogin">Registrarse</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
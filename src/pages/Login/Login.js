import { Form, Button } from "react-bootstrap";
import "./Login.scss";
import { ErrorMessage, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerAction, loginAction } from "../../redux/actions/usersAction";
import * as yup from "yup";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isRegistrando, setIsRegistrando] = useState(false);
  const state = useSelector((state) => state);
  const { infoUser, error } = state.users;
  console.log("INFOUSER", infoUser);

  useEffect(() => {
    window.localStorage.getItem("token") && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.localStorage.getItem("token")]);

  const formSchema = yup.object().shape({
    firstName: yup
      .string()
      .matches(/^[A-Za-z ]*$/, "Por favor, ingrese un nombre válido"),
    lastName: yup
      .string()

      .matches(/^[A-Za-z ]*$/, "Por favor, ingrese un appellido válido"),
    email: yup
      .string()
      .required("El email es requerido")
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "Escriba un correo válido"
      )
      .max(70, "El email es demasiado largo"),
    password: yup
      .string()
      .required("Por favor, ingrese su contraseña")
      .max(70, "La contraseña es demasiado larga"),
  });
  console.log(error);
  return (
    <div className="Login__container">
      <div className="Login__container-h1"></div>
      <div className="Login__container-login">
        <div className="Login__container-signin">
          <h2>
            {isRegistrando ? "Registro" : "Ingresar"}{" "}
            <i className="fas fa-user"></i>{" "}
          </h2>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={formSchema}
          onSubmit={(
            { email, password, firstName, lastName },
            { resetForm }
          ) => {
            resetForm();
            if (isRegistrando) {
              dispatch(
                registerAction({ email, password, firstName, lastName })
              );
            }
            if (!isRegistrando) {
              dispatch(loginAction({ email, password }));
            }
          }}
        >
          {({ values, handleSubmit, handleChange, handleBlur }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Floating className="mb-3">
                <Form.Control
                  name="email"
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="email">Email</label>
                <ErrorMessage
                  className="Login__errorsEmail"
                  name="email"
                  component="p"
                />
              </Form.Floating>
              <Form.Floating className="mb-3">
                <Form.Control
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Contraseña"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="password">Contraseña</label>
                <ErrorMessage
                  className="Login__errorsEmail"
                  name="password"
                  component="p"
                />
              </Form.Floating>
              {isRegistrando && (
                <Form.Floating className="mb-3">
                  <Form.Control
                    name="firstName"
                    id="firstName"
                    type="text"
                    placeholder="Nombre"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="firstName">Nombre</label>

                  <ErrorMessage
                    className="Login__errorsEmail"
                    name="firstName"
                    component="p"
                  />
                </Form.Floating>
              )}
              {isRegistrando && (
                <Form.Floating>
                  <Form.Control
                    name="lastName"
                    id="lastName"
                    type="text"
                    placeholder="Apellido"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="name">Apellido</label>
                  <ErrorMessage
                    className="Login__errorsEmail"
                    name="lastName"
                    component="p"
                  />
                </Form.Floating>
              )}
              <p
                className="Login__doYouHaveAnAccount"
                onClick={() => setIsRegistrando(!isRegistrando)}
              >
                {isRegistrando
                  ? "Ya tenés una cuenta? Logueate"
                  : "Aún no tenés una cuenta? Registrate"}
              </p>
              <Button className="Login__btn" type="submit" variant="secondary">
                {isRegistrando ? "Crear cuenta" : "Iniciar sesión"}
              </Button>
            </Form>
          )}
        </Formik>
        {error && (
          <div className="Login__error-check">
            {error && "usuario y/o contraseña incorrecto"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

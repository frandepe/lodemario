import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

const ContactForm = () => {
  // const [email, setEmail] = useState("");
  // const [nombre, setNombre] = useState("");
  // const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const formSchema = yup.object().shape({
    nombre: yup
      .string()
      .required("Por favor, ingrese su nombre")
      .matches(/^[A-Za-z ]*$/, "Por favor, ingrese un nombre válido"),
    apellido: yup
      .string()
      .required("Por favor, ingrese su apellido")
      .matches(/^[A-Za-z ]*$/, "Por favor, ingrese un apellido válido"),
    email: yup
      .string()
      .required("El email es requerido")
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "Escriba un correo válido"
      )
      .max(80, "El email es demasiado largo"),
    numero: yup.number().required("Por favor, ingrese su contraseña"),
    direccion: yup.string().required("Por favor, ingrese su direccion"),
    mensaje: yup.string(),
  });

  // const submitHandler = async (e) => {
  //   const shoppingCart = localStorage.getItem("cart");

  //   // items: JSON.parse(shoppingCart),
  //   e.preventDefault();
  //   // if (!email || !nombre || !mensaje) {
  //   //   return toast.error("Por favor rellene los campos");
  //   // }
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.post(`http://localhost:3100/api/email`, {
  //       items: JSON.parse(shoppingCart),
  //       email,
  //       nombre,
  //       mensaje,
  //     });
  //     setLoading(false);
  //     toast.success(data.message);
  //   } catch (error) {
  //     setLoading(false);
  //     toast.error(
  //       error.response && error.response.data.message
  //         ? error.response.data.message
  //         : error.message
  //     );
  //   }
  // };
  return (
    <div>
      <ToastContainer position="bottom-center" limit={1} />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={formSchema}
        onSubmit={async (
          { email, nombre, apellido, direccion, numero, mensaje },
          { resetForm }
        ) => {
          resetForm();
          const shoppingCart = localStorage.getItem("cart");

          try {
            setLoading(true);
            const { data } = await axios.post(
              `http://localhost:3100/api/email`,
              {
                items: JSON.parse(shoppingCart),
                email,
                numero,
                nombre,
                apellido,
                direccion,
                mensaje,
              }
            );
            setLoading(false);
            toast.success(data.message);
          } catch (error) {
            setLoading(false);
            toast.error(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            );
          }
        }}
      >
        {({ values, handleSubmit, handleChange, handleBlur }) => (
          <Container className="contacto__container">
            <Row>
              <Col>
                <form onSubmit={handleSubmit} className="contacto__form">
                  {/* <label htmlFor="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              ></input>
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                onChange={(e) => setNombre(e.target.value)}
                type="text"
              ></input>
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                onChange={(e) => setMensaje(e.target.value)}
                type="text"
              ></textarea> */}
                  <FloatingLabel label="Nombre*" className="mb-3">
                    <Form.Control
                      required
                      name="nombre"
                      type="text"
                      placeholder="name@example.com"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nombre}
                    />
                  </FloatingLabel>
                  <ErrorMessage
                    name="nombre"
                    component="p"
                    className="input-error"
                  />

                  <FloatingLabel label="Apellido*" className="mb-3">
                    <Form.Control
                      required
                      type="text"
                      placeholder="name@example.com"
                      name="apellido"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.apellido}
                    />
                  </FloatingLabel>
                  <ErrorMessage
                    name="apellido"
                    component="p"
                    className="input-error"
                  />

                  <FloatingLabel label="Tel*" className="mb-3">
                    <Form.Control
                      required
                      type="number"
                      placeholder="name@example.com"
                      name="numero"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.numero}
                    />
                  </FloatingLabel>
                  <ErrorMessage
                    name="numero"
                    component="p"
                    className="input-error"
                  />

                  <FloatingLabel label="Email*" className="mb-3">
                    <Form.Control
                      required
                      type="email"
                      placeholder="name@example.com"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </FloatingLabel>
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="input-error"
                  />

                  <FloatingLabel label="Direccion*" className="mb-3">
                    <Form.Control
                      required
                      name="direccion"
                      type="text"
                      placeholder="Leave a comment here"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.direccion}
                    />
                  </FloatingLabel>
                  <ErrorMessage
                    name="direccion"
                    component="p"
                    className="input-error"
                  />

                  <FloatingLabel
                    controlId="floatingTextarea2"
                    label="Mensaje adicional"
                  >
                    <Form.Control
                      required
                      name="mensaje"
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: "100px" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mensaje}
                    />
                  </FloatingLabel>
                  <ErrorMessage
                    name="mensaje"
                    component="p"
                    className="input-error"
                  />

                  <Button
                    id="idBtnEnviar"
                    disabled={loading}
                    className="contacto__btn"
                    type="submit"
                  >
                    {loading ? "Enviando..." : "Enviar"}
                  </Button>
                </form>
              </Col>
            </Row>
          </Container>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;

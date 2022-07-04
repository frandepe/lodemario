import React, { useState } from "react";
import { Row, Col, Form, FloatingLabel, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import "./ContactForm.scss";
import showAlert from "../../shared/showAlert";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formSchema = yup.object().shape({
    nombre: yup
      .string()
      .required("Por favor, ingrese su nombre")
      .matches(/^[A-Za-z ]*$/, "Ingrese un nombre válido"),
    apellido: yup
      .string()
      .required("Por favor, ingrese su apellido")
      .matches(/^[A-Za-z ]*$/, "Ingrese un apellido válido"),
    email: yup
      .string()
      .required("El email es requerido")
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "Escriba un correo válido"
      )
      .max(80, "El email es demasiado largo"),
    numero: yup
      .number()
      .min(6, "El número es demasiado corto")
      .required("Ingrese solo números"),
    selectEnvio: yup.string().required("Seleccione cómo recibirá la compra"),
    direccion: yup.string().required("Por favor, ingrese su dirección"),
    mensaje: yup.string(),
  });

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
          { email, nombre, apellido, direccion, selectEnvio, numero, mensaje },
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
                selectEnvio,
                apellido,
                direccion,
                mensaje,
              }
            );
            setLoading(false);
            toast.success(data.message);
            showAlert({
              type: "success",
              title: "Gracias por tu compra",
              message:
                "Tu pedido a sido enviado, nos pondremos en contacto con usted una vez procesemos el pedido",
            }) && navigate("/");
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
          <div className="contacto__container">
            <Row>
              <form onSubmit={handleSubmit} className="contacto__form">
                <Row>
                  <Col>
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
                  </Col>
                  <Col>
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
                  </Col>
                </Row>
                <Row>
                  <Col>
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
                  </Col>
                  <Col>
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
                  </Col>
                </Row>

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

                <Form.Select
                  className="mb-3"
                  id="selectEnvio"
                  name="selectEnvio"
                  value={values.selectEnvio}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  {/* <option selected={true} disabled="disabled"></option> */}
                  <option hidden>Seleccione opción de compra</option>
                  <option value="Quiero recibir la compra a domicilio">
                    Quiero recibir la compra a domicilio
                  </option>
                  <option value="Quiero retirar mi compra por el local">
                    Quiero retirar mi compra por el local
                  </option>
                </Form.Select>
                <ErrorMessage
                  name="selectEnvio"
                  component="p"
                  className="input-error"
                />
                <FloatingLabel
                  controlId="floatingTextarea2"
                  label="Mensaje adicional"
                >
                  <Form.Control
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
                  className="ContactForm__btnSubmit"
                  type="submit"
                  variant="secondary"
                >
                  {loading ? "Enviando..." : "Enviar compra"}
                </Button>
              </form>
            </Row>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;

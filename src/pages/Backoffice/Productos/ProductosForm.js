import React, { useState } from "react";
import * as yup from "yup";
import { Button, Form } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import showAlert from "../../../shared/showAlert";
import { privatePostRequest } from "../../../services/privateApiServices";
import { useNavigate, useLocation } from "react-router-dom";
import { privatePutRequest } from "../../../services/privateApiServices";
import "../sharedBack.scss";

const ProductosForm = (patchData) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(
    () => location?.state?.element?.imagen?.url || null
  );
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const [statusForm, setStatusForm] = useState(false);

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("El campo es requerido")
      .max(50, "No puede ingresar más de 50 caracteres"),
    category: yup
      .string()
      .required("El campo es requerido")
      .max(50, "No puede ingresar más de 50 caracteres"),
    price: yup.number().required("El campo es requerido"),
    imagen: yup.lazy((value) => {
      switch (typeof value) {
        case "object":
          return yup.object();
        case "string":
          return yup
            .string()
            .matches(
              /^data:image\/(?:jpg|png|jpeg|)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/g,
              "Solo admite archivos con formato imagen jpg, png o jpeg"
            );
        default:
          return yup.mixed(); // here you can decide what is the default
      }
    }),
  });

  return (
    <div className="container_abm">
      <div className="container_form">
        <p
          onClick={() => {
            navigate("/backoffice/productos");
          }}
          className="btn-atras"
        >
          {"<"} Atras
        </p>
        <h2>Productos</h2>

        <Formik
          initialValues={{
            name: location?.state?.element?.name || "",
            category: location?.state?.element?.category || "",
            price: location?.state?.element?.price || "",
            imagen: location?.state?.element?.imagen || "",
          }}
          validationSchema={formSchema}
          onSubmit={async ({ ...formData }) => {
            setStatusForm(true);
            try {
              setLoading(true);
              if (location?.state?.element?.id) {
                await privatePutRequest({
                  url: `products/${location?.state?.element?.id}`,
                  putData: { ...formData },
                });

                showAlert({ type: "success", title: "Editado correctamente" });
                navigate("/backoffice/productos");
                setLoading(false);
                return;
              }
              await privatePostRequest("products", {
                ...formData,
              });

              showAlert({
                type: "success",
                title: patchData?.location?.state?.id
                  ? "Editado correctamente"
                  : "Creado correctamente",
              }) && navigate("/backoffice/productos");
              setLoading(false);
            } catch (err) {
              setLoading(false);
              console.log("Error catch:", err);
            } finally {
              setStatusForm(false);
            }
          }}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
            setFieldTouched,
          }) => (
            <form className="form_inputs" onSubmit={handleSubmit}>
              {setPreviewImage(values.imagen?.url || values.imagen)}
              <Form.Label htmlFor="name">Nombre</Form.Label>
              <Form.Control
                placeholder="Nombre del producto"
                required
                name="name"
                id="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <ErrorMessage name="name" component="p" className="input-error" />

              <Form.Label htmlFor="countdown">Categoria</Form.Label>
              <Form.Select
                className="select-field"
                name="category"
                id="category"
                data-testid="category"
                value={values.category}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Selecciona categoria
                </option>
                <optgroup label="Carrusel del inicio">
                  <option value="special">Carrusel</option>
                </optgroup>
                <optgroup label="Fiambres">
                  <option value="quesos">Quesos</option>
                  <option value="fiambre">Fiambre</option>
                </optgroup>
                <optgroup label="Otros">
                  <option value="almacen">Almacen</option>
                  <option value="congelados">Congelados</option>
                  <option value="frescos">Frescos</option>
                  <option value="bebidas">Bebidas</option>
                </optgroup>
              </Form.Select>
              <Form.Label htmlFor="price">Precio</Form.Label>
              <Form.Control
                placeholder="Precio"
                required
                type="number"
                name="price"
                id="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
              />
              <ErrorMessage
                name="price"
                component="p"
                className="input-error"
              />

              <Form.Label htmlFor="fecha">Subir imagen</Form.Label>

              <Form.Control
                data-testid="imagen"
                type="file"
                accept="imagen/png, imagen/jpeg, imagen/jpg"
                id="imagen"
                name="imagen"
                onChange={async (event) => {
                  setFieldTouched("imagen", true);
                  const imageBase64 = await getBase64(event.target.files[0]);
                  setFieldValue("imagen", imageBase64);
                }}
              />

              <ErrorMessage
                name="imagen"
                component="p"
                className="input-error"
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Imagen no encontrada"
                  width={300}
                />
              )}
              <div className="btn-nuevo">
                <Button type="submit" disabled={statusForm}>
                  {location?.state?.element?.id
                    ? loading
                      ? "Editando..."
                      : "Editar"
                    : loading
                    ? "Creando..."
                    : "Crear"}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProductosForm;

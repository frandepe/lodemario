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

  const [previewImage, setPreviewImage] = useState(
    () => patchData?.location?.state?.imagen || null
  );

  const SUPPORTED_FORMATS = /(jpg|png|jpeg)/;
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
    imagen: yup
      .mixed()
      .required("La imagen es requerida")
      .test("fileType", "El formato no es correcto", (imagen) => {
        if (!SUPPORTED_FORMATS.test(imagen)) return false;
        setPreviewImage(imagen);
        return true;
      }),
  });
  console.log("PatchData:", patchData);

  return (
    <div className="container_abm">
      <div className="container_form">
        <h2>Productos</h2>
        <Formik
          initialValues={{
            // id: patchData?.location?.state?.id || "",
            name: location?.state?.element?.name || "",
            category: location?.state?.element?.category || "",
            price: location?.state?.element?.price || "",
            imagen: location?.state?.element?.imagen || "",
          }}
          validationSchema={formSchema}
          onSubmit={async ({ ...formData }) => {
            setStatusForm(true);
            try {
              if (location?.state?.element?.id) {
                const putRes = await privatePutRequest({
                  url: `products/${location?.state?.element?.id}`,
                  putData: { ...formData },
                });
                console.log(putRes);

                showAlert({ type: "success", title: "Editado correctamente" });
                navigate("/backoffice/productos");
                return;
              }
              const response = await privatePostRequest("products", {
                ...formData,
              });
              console.log(response);
              // if (!response?.data?.status === 200)
              //   throw new Error("Algo falló");
              showAlert({
                type: "success",
                title: patchData?.location?.state?.id
                  ? "Editado correctamente"
                  : "Creado correctamente",
              }) && navigate("/backoffice/productos");
            } catch (err) {
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
                <option value="almacen">Almacen</option>

                <option value="quesos">Quesos</option>
                <option value="fiambre">Fiambre</option>

                <option value="congelados">Congelados</option>
                <option value="frescos">Frescos</option>
                <option value="bebidas">Bebidas</option>
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
                  height={100}
                />
              )}

              <div className="btn-nuevo">
                <Button type="submit" disabled={statusForm}>
                  {patchData?.location?.state?.id ? "Editar" : "Crear"}
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

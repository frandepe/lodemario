import React, { useState } from "react";
import * as yup from "yup";
import { Button, Form } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import showAlert from "../../../shared/showAlert";
import { privatePostRequest } from "../../../services/privateApiServices";
import { useNavigate, useLocation } from "react-router-dom";
import { privatePutRequest } from "../../../services/privateApiServices";
import "../sharedBack.scss";

const BannerBackForm = (patchData) => {
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
    title: yup
      .string()
      .required("El campo es requerido")
      .max(50, "No puede ingresar más de 50 caracteres"),
    description: yup
      .string()
      .required("El campo es requerido")
      .max(50, "No puede ingresar más de 50 caracteres"),
    imagen: yup
      .mixed()
      .required("La imagen es requerida")
      .test("fileType", "El formato no es correcto", (imagen) => {
        if (!SUPPORTED_FORMATS.test(imagen)) return false;
        setPreviewImage(imagen);
        return true;
      }),
  });

  return (
    <div className="container_abm">
      <div className="container_form">
        <h2>Banner</h2>
        <Formik
          initialValues={{
            title: location?.state?.element?.title || "",
            description: location?.state?.element?.description || "",
            imagen: location?.state?.element?.imagen || "",
          }}
          validationSchema={formSchema}
          onSubmit={async ({ ...formData }) => {
            setStatusForm(true);
            try {
              if (location?.state?.element?.id) {
                const putRes = await privatePutRequest({
                  url: `banner/${location?.state?.element?.id}`,
                  putData: { ...formData },
                });
                console.log(putRes);

                showAlert({ type: "success", title: "Editado correctamente" });
                navigate("/backoffice/banner");
                return;
              }
              const response = await privatePostRequest("banner", {
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
              }) && navigate("/backoffice/banner");
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
              <Form.Label htmlFor="title">Título</Form.Label>
              <Form.Control
                placeholder="Título"
                required
                name="title"
                id="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <ErrorMessage
                name="title"
                component="p"
                className="input-error"
              />

              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                placeholder="Descripción"
                required
                type="text"
                name="description"
                id="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              <ErrorMessage
                name="description"
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

export default BannerBackForm;

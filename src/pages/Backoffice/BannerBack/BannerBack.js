import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bannerAction } from "../../../redux/actions/shoppingAction";
import showAlert from "../../../shared/showAlert";
import { privateDeleteRequest } from "../../../services/privateApiServices";
import { Table, Button } from "react-bootstrap";
import Spiner from "../../../shared/spiner";
import { useNavigate } from "react-router-dom";
import HeaderBack from "../HeaderBack/HeaderBack";
import "../sharedBack.scss";

const BannerBack = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);

  const state = useSelector((state) => state);
  const { banner, loading } = state.shopping;

  async function handleRemove(id) {
    try {
      await privateDeleteRequest(`banner/${id}`);
      showAlert({ type: "success", title: "Eliminado correctamente" });
      setDeleted(true);
    } catch (error) {
      showAlert({
        type: "error",
        title: "No se pudo eliminar",
      });
    }
  }

  useEffect(() => {
    dispatch(bannerAction(banner));
    if (deleted) {
      setDeleted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleted, dispatch]);

  return (
    <div>
      <HeaderBack />
      <section className="container_section container_section_banner">
        <header className="news-header">
          <h1>Banner del inicio</h1>
          <div className="btn-group btn_groups">
            <Button
              onClick={() => navigate("/backoffice")}
              variant="tertiary"
              size="sm"
            >
              Regresar
            </Button>
            <Button
              onClick={() => navigate("/backoffice/bannerForm")}
              variant="tertiary"
              size="sm"
            >
              Agregar banner +
            </Button>
          </div>
        </header>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Titulo</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              <Spiner />
            ) : (
              banner?.banner.map((element) => {
                return (
                  <tr key={element.id}>
                    <td className="img-backoffice">
                      <img src={element.imagen} alt="imgb" />
                    </td>
                    <td className="title">{element.title}</td>
                    <td>{element.description}</td>
                    <td className="options">
                      <Link
                        to="/backoffice/bannerForm"
                        state={{ element: element }}
                        className="change-button-edit"
                      >
                        <MdModeEdit />
                      </Link>

                      <button
                        className="change-button-delete"
                        onClick={() => {
                          handleRemove(element.id);
                        }}
                      >
                        <IoMdTrash />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </section>
    </div>
  );
};

export default BannerBack;

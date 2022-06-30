import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { usersAction } from "../../../redux/actions/usersAction";

import { Table } from "react-bootstrap";
import Spiner from "../../../shared/spiner";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import HeaderBack from "../HeaderBack/HeaderBack";
import "../sharedBack.scss";

const UsuariosBack = () => {
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);
  const state = useSelector((state) => state);
  const { infoUser, loading } = state.users;
  const navigate = useNavigate();
  console.log(infoUser);

  useEffect(() => {
    dispatch(usersAction(infoUser));
    if (deleted) {
      setDeleted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleted, dispatch]);

  return (
    <div>
      <HeaderBack />
      <section className="container_section">
        <header className="news-header">
          <h1>Listado de todos los usuarios</h1>
          <div className="btn-nuevo">
            <Button onClick={() => navigate("/backoffice")}>Regresar</Button>
          </div>
        </header>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Fecha de creación</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Spiner />
            ) : (
              infoUser?.users?.map((element) => {
                return (
                  <tr key={element.id}>
                    <td className="title">{element.firstName}</td>
                    <td>{element.lastName}</td>
                    <td>{element.email}</td>
                    <td>{element.rol}</td>
                    <td>{element.createdDate}</td>
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

export default UsuariosBack;

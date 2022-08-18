import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { productsAction } from "../../../redux/actions/shoppingAction";
import showAlert from "../../../shared/showAlert";
import { privateDeleteRequest } from "../../../services/privateApiServices";
import { Table, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import Spiner from "../../../shared/spiner";
import { useNavigate } from "react-router-dom";
import HeaderBack from "../HeaderBack/HeaderBack";
import "../sharedBack.scss";
import Pagination from "../../../components/Pagination/Pagination";
import Swal from "sweetalert2";

const Productos = () => {
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);
  const [searchCategory, setSearchCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const state = useSelector((state) => state);
  const { products, loading } = state.shopping;

  const navigate = useNavigate();

  async function handleRemove(id) {
    try {
      Swal.fire({
        title: "Eliminar producto?",
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: "No",
        customClass: {
          actions: "my-actions",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Eliminado correctamente", "", "success");
          privateDeleteRequest(`products/${id}`);
          setDeleted(true);
        } else if (result.isDenied) {
          setDeleted(false);
        }
      });
    } catch (error) {
      showAlert({
        type: "error",
        title: "No se pudo eliminar",
      });
    }
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products?.products?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const handleChange = (e) => {
    setSearchCategory(e.target.value);
  };
  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(productsAction(products));
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
          <h1>Listado de todos los productos</h1>
          <div className="btn-group btn_groups">
            <Button
              onClick={() => navigate("/backoffice")}
              variant="tertiary"
              size="sm"
            >
              Regresar
            </Button>
            <Button
              onClick={() => navigate("/backoffice/productosForm")}
              variant="tertiary"
              size="sm"
            >
              Agregar producto +
            </Button>
          </div>
        </header>
        <div className="container_filters">
          <InputGroup
            className="mb-3 ShoppingCart__search"
            style={{ marginLeft: "60px" }}
          >
            <InputGroup.Text id="basic-addon1">
              <BsSearch />
            </InputGroup.Text>
            <FormControl
              onChange={handleInput}
              placeholder="Buscar"
              aria-label="Buscar"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <Form.Select
            value={products}
            onChange={handleChange}
            className="Select__container"
          >
            <option>Filtrar por categoría</option>
            <optgroup label="Carrusel">
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
          <div style={{ marginTop: "30px" }}>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={products?.products?.length}
              paginate={paginate}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoria</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Spiner />
            ) : (
              currentPosts
                ?.filter((element) => {
                  if (searchCategory === null) {
                    return element;
                  } else {
                    return element.category === searchCategory;
                  }
                })
                .filter((element) => {
                  return element.name
                    .toLowerCase()
                    .includes(search.toLowerCase());
                })
                .map((element) => {
                  return (
                    <tr key={element.id}>
                      <td className="img-backoffice">
                        <img src={element?.imagen?.url} alt="imgb" />
                      </td>
                      <td className="title">{element.name}</td>
                      <td>${element.price}</td>
                      <td>{element.category}</td>
                      <td>{element.createdDate}</td>

                      <td className="options">
                        <Link
                          to="/backoffice/productosForm"
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

export default Productos;

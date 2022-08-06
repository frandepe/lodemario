import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Spiner from "../../shared/spiner";
import {
  addToCart,
  productsAction,
  categoryAction,
  addToFav,
  delFromCart,
} from "../../redux/actions/shoppingAction";
import ProductItem from "../ProductItem/ProductItem";
import {
  Form,
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import "./ShoppingCart.scss";
import Pagination from "../Pagination/Pagination";
import "../shared.scss";

const ShoppingCart = () => {
  const [search, setSearch] = useState("");
  const [sortedField, setSortedField] = useState("createdDate");

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { cart, products, category, loading, fav } = state.shopping;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = category?.category?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  console.log(currentPosts);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChange = (e) => {
    dispatch(categoryAction(e.target.value));
  };

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(categoryAction("quesos"));
    dispatch(productsAction(products));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (sortedField !== null) {
    currentPosts?.sort((a, b) => {
      if (a[sortedField] < b[sortedField]) {
        return -1;
      }
      if (a[sortedField] > b[sortedField]) {
        return 1;
      }
      return 0;
    });
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <div className="ShoppingCart__container--filtros">
        <div>
          <InputGroup className="mb-3 ShoppingCart__search">
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
        </div>
        <div className="ShoppingCart__titleSearch">
          <h5>
            Mostrando {currentPosts?.length} de {category?.category?.length}{" "}
            resultados
          </h5>
        </div>

        <div className="ShoppingCart__sortable">
          <DropdownButton
            size="sm"
            variant="light"
            title="Ordenar por"
            id="bg-vertical-dropdown-1"
          >
            <Dropdown.Item eventKey="1" onClick={() => setSortedField("name")}>
              Nombre: A - Z
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => setSortedField("price")}>
              Precio: menor a mayor
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="3"
              onClick={() => setSortedField("createdDate")}
            >
              Últimos
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      <div className="ShoppingCart__h3yPagination">
        <h3 className="ShoppingCart__titleProductos">Productos</h3>

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={category?.category?.length}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <div className="ShoppingCart__container">
        <Form
          value={category}
          onChange={handleChange}
          className="ShoppingCart__container--radios"
        >
          <h6 className="ShoppingCart__titleCategorias">
            Categoría del producto
          </h6>
          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                label="Almacen"
                name="group1"
                type={type}
                id={`inline-${type}-1`}
                value="almacen"
                className="ShoppingCart__radios"
              />
              <Form.Check
                inline
                label="Quesos"
                name="group1"
                type={type}
                id={`inline-${type}-2`}
                value="quesos"
                className="ShoppingCart__radios"
              />
              <Form.Check
                inline
                label="Fiambres"
                name="group1"
                type={type}
                id={`inline-${type}-3`}
                value="fiambre"
                className="ShoppingCart__radios"
              />
              <Form.Check
                inline
                label="Congelados"
                name="group1"
                type={type}
                id={`inline-${type}-4`}
                value="congelados"
                className="ShoppingCart__radios"
              />
              <Form.Check
                inline
                label="Frescos"
                name="group1"
                type={type}
                id={`inline-${type}-5`}
                value="frescos"
                className="ShoppingCart__radios"
              />
              <Form.Check
                inline
                label="Bebidas"
                name="group1"
                type={type}
                id={`inline-${type}-6`}
                value="bebidas"
                className="ShoppingCart__radios"
              />
            </div>
          ))}
        </Form>
        <div className="ShoppingCart__container--products">
          {!loading ? (
            currentPosts
              ?.filter((element) => {
                return element.name
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((product) => (
                <ProductItem
                  key={product.id}
                  data={product}
                  addToFav={() => {
                    dispatch(addToFav(fav, product));
                  }}
                  addToCart={() => dispatch(addToCart(product.id))}
                  delOneFromCart={() => dispatch(delFromCart(product.id))}
                />
              ))
          ) : (
            <Spiner />
          )}
        </div>
      </div>
      <div className="ShoppingCart__pagination-bottom">
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={category?.category?.length}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ShoppingCart;

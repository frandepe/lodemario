import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import {
  addToCart,
  productsAction,
  categoryAction,
  // clearCart,
  delFromCart,
} from "../../redux/actions/shoppingAction";
import ProductItem from "../ProductItem/ProductItem";
import { Form, InputGroup, FormControl, Row, Col } from "react-bootstrap";
import "./ShoppingCart.scss";

const ShoppingCart = () => {
  const [search, setSearch] = useState("");
  // const [price, setPrice] = useState(0);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // const [sort, setSort] = useState();

  const { cart, products, category } = state.shopping;
  console.log(category.category);

  const handleChange = (e) => {
    dispatch(categoryAction(e.target.value));
  };

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  // const handleInputPrice = (e) => {
  //   setPrice(e.target.value);
  //   console.log(e.target.value);
  // };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    dispatch(productsAction(products));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(categoryAction("quesos"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Row>
        <Col>
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
        </Col>
        <Col className="ShoppingCart__titleSearch">
          <h5>Búsqueda por titulo: “{search}”</h5>
        </Col>
      </Row>

      <h3 className="ShoppingCart__titleProductos">Productos</h3>
      <div className="ShoppingCart__container">
        <Form
          value={category}
          onChange={handleChange}
          className="ShoppingCart__container--radios"
        >
          <h5 className="ShoppingCart__titleCategorias">
            Categoría del producto
          </h5>
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
        {/* 
        <input
          onChange={handleInputPrice}
          type="range"
          value={price}
          min="0"
          max="300"
          step="5"
        /> */}

        <div className="ShoppingCart__container--products">
          {category?.category
            ?.filter((element) => {
              return element.name.toLowerCase().includes(search.toLowerCase());
            })
            // .filter((element) => {
            //   return element.price <= price;
            // })
            .map((product) => (
              <ProductItem
                key={product.id}
                data={product}
                addToCart={() => dispatch(addToCart(product.id))}
                delOneFromCart={() => dispatch(delFromCart(product.id))}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

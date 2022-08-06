import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { categoryAction } from "../../redux/actions/shoppingAction";
import "./Select.scss";
const Select = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { category } = state.shopping;

  const handleChange = (e) => {
    dispatch(categoryAction(e.target.value));
    window.scrollTo(0, 1300);
  };

  return (
    <div>
      <Form.Select
        value={category}
        onChange={handleChange}
        className="Select__container"
      >
        <option>Elegí una categoría</option>
        <option value="almacen">Almacen</option>
        <optgroup label="Fiambres">
          <option value="quesos">Quesos</option>
          <option value="fiambre">Fiambre</option>
        </optgroup>
        <option value="congelados">Congelados</option>
        <option value="frescos">Frescos</option>
        <option value="bebidas">Bebidas</option>
      </Form.Select>
    </div>
  );
};

export default Select;

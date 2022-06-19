import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavbarComp from "../components/Navbar/Navbar";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import ComoComprar from "../pages/ComoComprar/ComoComprar";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <NavbarComp />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/como-comprar" element={<ComoComprar />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;

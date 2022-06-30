import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavbarComp from "../components/Navbar/Navbar";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import Login from "../pages/Login/Login";
import Footer from "../components/Footer/Footer";
import ComoComprar from "../pages/ComoComprar/ComoComprar";
import Dashboard from "../pages/Backoffice/Dashboard/Dashboard";
import Productos from "../pages/Backoffice/Productos/Productos";
import ProductosForm from "../pages/Backoffice/Productos/ProductosForm";
import UsuariosBack from "../pages/Backoffice/Usuarios/UsuariosBack";
import QuienesSomos from "../pages/QuienesSomos/QuienesSomos";
import Contacto from "../pages/Contacto/Contacto";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <NavbarComp />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/como-comprar" element={<ComoComprar />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/autenticacion" element={<Login />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/backoffice/productos" element={<Productos />} />
          <Route path="/backoffice/productosForm" element={<ProductosForm />} />
          <Route path="/backoffice/usuarios" element={<UsuariosBack />} />
          <Route path="/backoffice" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default Router;

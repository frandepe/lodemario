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
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import PrivateRoutes from "./private.routes";
import BannerBack from "../pages/Backoffice/BannerBack/BannerBack";
import BannerBackForm from "../pages/Backoffice/BannerBack/BannerBackForm";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <NavbarComp />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/backoffice/productos" element={<Productos />} />
            <Route
              path="/backoffice/productosForm"
              element={<ProductosForm />}
            />
            <Route path="/backoffice/usuarios" element={<UsuariosBack />} />
            <Route path="/backoffice/banner" element={<BannerBack />} />
            <Route path="/backoffice/bannerForm" element={<BannerBackForm />} />
            <Route path="/backoffice" element={<Dashboard />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/como-comprar" element={<ComoComprar />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/autenticacion" element={<Login />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/page-not-found" element={<PageNotFound />} />
          {/* <Route path="*" element={<Navigate to="/page-not-found" />} /> */}
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default Router;

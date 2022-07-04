import React from "react";
import PageNotFoundImage from "../../utilities/images/404.jpg";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="container-404">
      <h1 className="title-404">
        La ruta ingresada no se encuentra registrada
      </h1>
      <img src={PageNotFoundImage} alt="" className="image-404" />
      <p className="subtitle-404">
        Revisa que la ruta sea la indicada y recarga nuevamente la página web o
        navega a travez del menú de navegación
      </p>
    </div>
  );
};

export default PageNotFound;

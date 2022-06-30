import React from "react";
import { Card } from "react-bootstrap";
import "./BannerHeader.scss";

const BannerHeader = ({ src, description, title }) => {
  return (
    <Card className="BannerHeader__container">
      <Card.Img src={src} alt="Card image" />
      <Card.ImgOverlay className="BannerHeader__textBanner">
        <h2>{title}</h2>
        <p>{description}</p>
      </Card.ImgOverlay>
    </Card>
  );
};

export default BannerHeader;

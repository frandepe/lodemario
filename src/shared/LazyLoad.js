import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

/**
 * @param {string} src fuente url de la imagen
 * @param {string} alt texto alternativo a la imagen
 * @param {number} width width opcional
 * @param {number} height heigth opcional
 */

const LazyLoad = ({ alt, height, src, width }) => {
  return <LazyLoadImage src={src} alt={alt} height={height} width={width} />;
};

export default LazyLoad;

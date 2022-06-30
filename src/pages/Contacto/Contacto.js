import React from "react";
import imgBanner from "../../utilities/images/bannerContacto.jpg";
import BannerHeader from "../../components/BannerHeader/BannerHeader";
import ContactForm from "../../components/ContactForm/ContactForm";

const Contacto = () => {
  return (
    <div>
      <BannerHeader
        title="Contactanos"
        description="Estamos a tu disposición"
        src={imgBanner}
      />
      <ContactForm />
    </div>
  );
};

export default Contacto;

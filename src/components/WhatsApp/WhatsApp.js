import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import "./WhatsApp.scss";

const WhatsApp = () => {
  return (
    <a
      className="WhatsApp__container"
      href="https://api.whatsapp.com/send?phone=22143243423&&text=Hola,%20me%20comunico%20desde%20lodemario.com"
    >
      <IoLogoWhatsapp />
    </a>
  );
};

export default WhatsApp;

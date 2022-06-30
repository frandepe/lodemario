import React from "react";
import { Row } from "react-bootstrap";
import { dataFaq } from "./DataFaq";
import "./Faq.scss";

const FAQ = () => {
  return (
    <div>
      {dataFaq.map((e, i) => {
        return (
          <Row className="FAQ__quest" key={i}>
            <b>{e.question}</b>
            <p>{e.answer}</p>
          </Row>
        );
      })}
    </div>
  );
};

export default FAQ;

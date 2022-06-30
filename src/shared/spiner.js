import * as React from "react";
import { Spinner } from "react-bootstrap";

export default function Spiner() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

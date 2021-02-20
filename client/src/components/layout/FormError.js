import React from "react";

const FormError = ({ error = "" }) => {
  if (error !== "") {
    return <span className="textcontrast">{error}</span>;
  }
  return null;
};

export default FormError;

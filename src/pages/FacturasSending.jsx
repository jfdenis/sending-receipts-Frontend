import React from "react";
import "./styles/FacturasSending.css";

import FacturasForm from "../components/FacturasForm";

class FacturasSending extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className='form__description'>
          <h1 className='display-2'>Envío de facturas</h1>
        </div>
        <FacturasForm />
      </React.Fragment>
    );
  }
}

export default FacturasSending;

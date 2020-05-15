import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";
class Navbar extends React.Component {
  render() {
    return (
      <div className='navbar navbar-light bg-light'>
        <Link className='navbar-brand'>
          <p>
            Grupo CORAH <span>| Envío de Facturas</span>
          </p>
        </Link>
      </div>
    );
  }
}

export default Navbar;

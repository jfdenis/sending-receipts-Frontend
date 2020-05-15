import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./styles/App.css";

// Components
import Navbar from "./Navbar";

// Pages
import FacturasFrom from "../pages/FacturasSending";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/' component={FacturasFrom} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

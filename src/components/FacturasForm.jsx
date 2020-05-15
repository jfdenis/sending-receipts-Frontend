/* eslint-disable no-sequences */
import React from "react";
import "./styles/FacturasForm.css";
import axios from "axios";
import Loader from "../components/Loader";

const controller = new AbortController();

class FacturasForm extends React.Component {
  state = {
    loading: false,
    error: null,
    validation: false,
    data: "",
    form: {
      empresa: "Seleccione la empresa ...",
      acronimo: "DAM",
      modulo: "VTAS",
      movimiento: "Factura v3Cfdi",
      folioFactura: "",
      email: "",
      descripcion: "",
    },
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    if (e.target.value) {
      this.setState({ validation: true });
      e.target.className += " is-valid";
    } else {
      this.setState({ validation: false });

      e.target.className += "is-invalid";
    }
  };
  handleClick = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: null });

    if (this.state.validation === true) {
      try {
        const res = await axios.post("http://localhost:3001/send-email", {
          empresa: this.state.form.empresa,
          acronimo: this.state.form.acronimo,
          modulo: this.state.form.modulo,
          movimiento: this.state.form.movimiento,
          folioFactura: this.state.form.folioFactura,
          email: this.state.form.email,
          descripcion: this.state.form.descripcion,
        });
        if (res.status !== 200) {
          this.setState({
            loading: false,
            error: "No se envió, validar los datos o comunicarse con Sistemas",
            data: false,
          });
        } else {
          this.setState({ loading: false, data: true });
        }
      } catch (error) {
        this.setState({ loading: false, error: error.message, data: false });
        this.abortFetching();
      }
    } else {
      this.setState({ loading: false });
    }
    this.abortFetching = () => {
      controller.abort();
    };
  };

  render() {
    return (
      <div className='container form__container'>
        <div className='row'>
          <form
            className='form form__container-items needs-validation'
            novalidate>
            <div className='form-group'>
              <select
                onChange={this.handleChange}
                name='empresa'
                value={this.state.form.empresa}
                className={`form-control  form__item`}
                required>
                <option disabled>Seleccione la empresa ...</option>
                <option value='Distribuidora de Aluminios del Mayab'>
                  Distribuidora de Aluminios del Mayab
                </option>
                <option value='Argentum Mexicana'>Argentum Mexicana</option>
                <option value='La Viga '>La Viga</option>
                <option value='Herramax'>Herramax</option>
                <option value='Grupo Valsi'>Grupo Valsi</option>
                <option value='Alpina'>Alpina</option>
              </select>
            </div>
            <div className='select__container'>
              <div className='form-group'>
                <label htmlFor=''>Acrónimo</label>
                <select
                  onChange={this.handleChange}
                  name='acronimo'
                  value={this.state.form.acronimo}
                  className={`form-control is-valid form__item`}
                  required>
                  <option value='DAM'>DAM</option>
                  <option value='AME'>AME</option>
                  <option value='VVI'>VVI</option>
                  <option value='ALU'>ALU</option>
                  <option value='HER'>HER</option>
                  <option value='ALP'>ALP</option>
                  <option value='CIR'>CIR</option>
                  <option value='AVM'>AVM</option>
                  <option value='VAL'>VAL</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor=''>Seleccione el módulo</label>
                <select
                  onChange={this.handleChange}
                  name='modulo'
                  value={this.state.form.modulo}
                  className={`form-control is-valid form__item`}
                  required>
                  <option value='VTAS'>Ventas</option>
                  <option value='CXC'>Cuentas por Cobrar</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor=''>Seleccione el movimiento</label>
                <select
                  onChange={this.handleChange}
                  name='movimiento'
                  value={this.state.form.movimiento}
                  className={`form-control is-valid form__item`}
                  required>
                  <option value='Factura v3Cfdi'>Factura v3Cfdi</option>
                  <option value='Anticipo v3Cfdi'>Anticipo v3Cfdi</option>
                  <option value='DevolucionVtav3 Cfdi'>
                    Devolución Venta v3Cfdi
                  </option>
                  <option value='Cobro'>Cobro</option>
                </select>
              </div>
            </div>
            <div className='form-group'>
              <input
                onChange={this.handleChange}
                name='folioFactura'
                className={`form-control  form__item`}
                type='text'
                placeholder='Folio de Factura'
                value={this.state.form.folioFactura}
                required
              />
              {/* <div class='invalid-feedback'>Please choose a username.</div> */}
            </div>
            <div className='form-group'>
              <input
                onChange={this.handleChange}
                name='email'
                className={`form-control  form__item`}
                type='email'
                placeholder='E-mail'
                value={this.state.form.email}
                aria-describedby='emailHelp'
                required
              />
            </div>
            <textarea
              onChange={this.handleChange}
              name='descripcion'
              className={`form-control  form__item`}
              placeholder='Descripción'
              value={this.state.form.descripcion}
              required></textarea>

            <button onClick={this.handleClick} className='btn btn-primary mt-4'>
              Enviar
              <span className='ml-1' role='img' aria-label='arrow-right'>
                ➡️
              </span>
            </button>

            {this.state.loading && <Loader className='mt-4' />}
            {this.state.data && (
              <div className='alert alert-success mt-4' role='alert'>
                Enviado{" "}
                <span className='ml-1' role='img' aria-label='arrow-right'>
                  ☑️
                </span>
              </div>
            )}
            {this.state.error && (
              <div className='alert alert-danger mt-4' role='alert'>
                {this.state.error}
              </div>
            )}

            {!this.state.validation && (
              <div className='alert alert-dark mt-4' role='alert'>
                Llenar y validar bien los campos
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default FacturasForm;

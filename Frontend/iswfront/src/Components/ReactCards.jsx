import React, { useState } from 'react';
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import './CreditCards/styleCard.css';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from './CreditCards/utils';

function ReactCards({cardData, setCardData}) {

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setCardData((prevState) => ({ ...prevState, issuer }));
    }
  };

  const handleInputFocus = ({ target }) => {
    setCardData((prevState) => ({ ...prevState, focused: target.name }));
  };

  const handleInputChange = ({ target }) => {
    let { name, value } = target;

    if (name === 'number') {
      value = formatCreditCardNumber(value);
    } else if (name === 'expiry') {
      value = formatExpirationDate(value);
    } else if (name === 'cvc') {
      value = formatCVC(value);
    }

    setCardData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => { e.preventDefault();
    alert('You have finished payment!');
    setCardData({
      number: '',
      name: '',
      expiry: '',
      cvc: '',
      focused: '',
    });
  };

  return (
    <div key='Payment'>
      <div className='App-payment'>
        <div className='textoTarjetas'>
          <h1 className='font-bold'>Ingrese los detalles para el pago</h1>
          <h4 className='font-bold'>Por favor ingrese su información debajo</h4>
        </div>

        <div className='tarjetaYdatos'>
          <Card number={cardData.number} name={cardData.name} expiry={cardData.expiry} cvc={cardData.cvc} focused={cardData.focused} callback={handleCallback}/>

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <small>Nombre del titular</small>
              <input
                type='text'
                name='name'
                className='form-control'
                placeholder='Nombre'
                pattern='[a-zA-Z-]+'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                value={cardData.name}
              />
            </div>
            <div className='form-group'>
              <small>Numero de tarjeta:</small>
              <input
                type='tel'
                name='number'
                className='form-control'
                placeholder='Numero de tarjeta'
                pattern='[\d| ]{16,22}'
                maxLength='19'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                value={cardData.number}
              />
            </div>
            <div className='form-group'>
              <small>Fecha de expiracion:</small>
              <input
                type='tel'
                name='expiry'
                className='form-control'
                placeholder='Fecha expiracion'
                pattern='\d\d/\d\d'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                value={cardData.expiry}
              />
            </div>
            <div className='form-group'>
              <small>CVC:</small>
              <input
                type='tel'
                name='cvc'
                className='form-control'
                placeholder='CVC'
                pattern='\d{3}'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                value={cardData.cvc}
              />
            </div>
            <input type='hidden' name='issuer' value={cardData.issuer}/>

          </form>
        </div>
      </div>
    </div>
  );
}

export default ReactCards;

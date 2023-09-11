import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import './CreditCards/styleCard.css';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function ReactCards() {
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    numero: '',
    mesVencimiento: '01',
    anoVencimiento: currentYear.toString(),
    cvc: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'numero') {
      if (newValue.length > 16) {
        return;
      }
      if (newValue.length === 1 && newValue !== '4') {
        return;
      }
    } else if (name === 'cvc') {
      newValue = newValue.replace(/\D/g, '');
      if (newValue.length > 3) {
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const generateYearOptions = () => {
    const years = [];
    for (let i = currentYear; i <= currentYear + 20; i++) {
      years.push(i.toString());
    }
    return years;
  };

  return (
    <div className='divtotal'>
      <div className="card-container lg:ml-10">
      <Cards
        number={formData.numero}
        name={`${formData.nombre} ${formData.apellido}`}
        expiry={`${formData.mesVencimiento}/${formData.anoVencimiento.slice(-2)}`}
        cvc={formData.cvc}
      />
      </div>

      <div className='inputs mr-4'>
        <div className='nombreYapellido'>
          <TextField
            label="Nombre"
            variant="outlined"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />

          <TextField
            label="Apellido"
            variant="outlined"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleInputChange}
          />
        </div>
        <div className='numerotarjetaYmesvenc'>
          <TextField
            label="Número de tarjeta"
            variant="outlined"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={handleInputChange}
          />
          <div className='divalargue'>
          <TextField
            label="Mes de vencimiento"
            variant="outlined"
            id="mesVencimiento"
            name="mesVencimiento"
            select
            value={formData.mesVencimiento}
            onChange={handleInputChange}
            style={{ width: '100px', marginRight: '10px'}}

          >
            {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Año de vencimiento"
            variant="outlined"
            id="anoVencimiento"
            name="anoVencimiento"
            select
            value={formData.anoVencimiento}
            onChange={handleInputChange}
            style={{ width: '100px' }}

          >
            {generateYearOptions().map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
          </div>
        </div>
        <div className='cvc'>
          <TextField
            label="CVC (3 dígitos)"
            variant="outlined"
            id="cvc"
            name="cvc"
            value={formData.cvc}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ReactCards;

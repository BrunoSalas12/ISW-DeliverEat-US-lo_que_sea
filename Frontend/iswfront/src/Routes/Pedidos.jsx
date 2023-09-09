import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Grid from '@mui/material/Grid';
import Maps from '../Components/Maps';
import { FiUpload } from "react-icons/fi";
import { BsBagCheckFill } from "react-icons/bs";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import ReactCards from '../Components/ReactCards';
import '../Styles/pedidos.css';
import { fetchCiudades } from '../api';
import DetallePedido from '../Components/DetallePedido';
import { FORMA_PAGO } from '../utils/common';

const TODAY = new Date().toISOString().split('T')[0];

const Pedidos = () => {
  const [seleccionarFecha, setSeleccionarFecha] = useState(false);
  const [loAntesPosible, setLoAntesPosible] = useState(true);
  const [ciudades, setCiudades] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const [form, setForm] = useState({
    desc_objetos: '',
    ciudad: {},
    calle_comercio: '',
    nro_comercio: '',
    ref_comercio: '',
    calle_entrega: '',
    nro_entrega: '',
    ref_entrega: '',
    forma_pago: '',
    monto_efectivo: '',
    fecha_entrega: loAntesPosible,
    hora_entrega: '',
    datos_tarjeta: {}
  });

  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focused: '',
  });


  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const handleSeleccionarFechaChange = () => {
    setSeleccionarFecha(!seleccionarFecha);
    setLoAntesPosible(false);
  };

  const handleLoAntesPosibleChange = () => {
    setLoAntesPosible(!loAntesPosible);
    setSeleccionarFecha(false);
    setForm({ ...form, ['fecha_entrega']: 1 });
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    // Chequea que sea un numero, igual el monto efectivo habria que calcularlo automaticamente creo
    if (name === 'monto_efectivo' && !/^\d*$/.test(value)) return;
    setForm({ ...form, [name]: value })
  }

  useEffect(() => {
    fetchCiudades()
      .then(jsonCiudades => {
        setCiudades(jsonCiudades['ciudades']);
        setForm({ ciudad: { ...ciudades[0] } })
      })
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    setForm({ ...form, datos_tarjeta: (function ({ focused, ...cardData }) { return cardData; })(cardData) })
  }, [...Object.values(cardData)])

  return (
    <div>
      <Navbar />

      <h3 className='py-3 pl-4 textos'>Nuevo pedido</h3>
      <div className='detallePedido'>

        <Grid container direction={{ xs: "column-reverse", lg: "row" }}>

          <Grid item xs={12} lg={5}>
            <div className='div1 mt-3 p-2'>
              <label className='font-bold lg:mr-2 pb-2'>Productos:</label>
              <TextField id="filled-basic" name="desc_objetos" label="Descripcion productos" type="text" variant="filled" InputLabelProps={{ shrink: true }} value={form.desc_objetos} onChange={handleChange} />
            </div>
          </Grid>

        </Grid>

        <Grid container direction={{ xs: "column-reverse", lg: "row" }}>

          <Grid item xs={12} lg={5} className='grilla1'>
            <div className='div1'>
              <button className="mt-2 mb-2 rounded-full botonfotos py-2 px-4 flex justify-center flex-col items-center">Subir fotos<FiUpload /></button>
            </div>
          </Grid>

        </Grid>

        <h3 className='py-3 pl-4 textos'>Datos de envío</h3>
        <div className='datosDeEnvio'>
          <div className='selectCiudad ml-10 my-5'>
            <label className='font-bold'>Ciudad:</label>
            {
              ciudades.length > 0 && <Select sx={{ minWidth: '175px', maxWidth: '175px' }} className='ml-3' name="ciudad" labelId="demo-simple-select-label" id="demo-simple-select" value={form.ciudad} onChange={handleChange}>
                {ciudades.map((c, idx) => (
                  <MenuItem key={idx} value={c}>{c['nombre']}</MenuItem>
                )
                )}
              </Select>
            }
          </div>
        </div>

        <h3 className='py-3 pl-4 textos'>Comercio</h3>
        <div className='detallesDeComercio'>
          <Grid container>
            <Grid item xs={12} lg={5}>
              <div className='flex flex-col mx-10 mt-2 mb-4 gap-1'>
                <label className='font-bold lg:mr-2'>Calle:</label>
                <TextField id="filled-search" name="calle_comercio" label="Calle" type="search" variant="filled" InputLabelProps={{ shrink: true }} value={form.calle_comercio} onChange={handleChange} />
                <label className='font-bold lg:mr-2'>Nro:</label>
                <TextField id="filled-search" name="nro_comercio" label="Nro" type="search" variant="filled" value={form.nro_comercio} InputLabelProps={{ shrink: true }} onChange={handleChange} />
                <label className='font-bold lg:mr-2'>Referencia:</label>
                <TextField id="filled-search" name="ref_comercio" label="Referencia" type="search" variant="filled" value={form.ref_comercio} InputLabelProps={{ shrink: true }} onChange={handleChange} />
              </div>
            </Grid>

            <Grid item xs={12} lg={7} className='googleMaps mt-4 text-center'>
              <Maps></Maps>
            </Grid>
          </Grid>
        </div>

        <h3 className='py-3 pl-4 textos'>Destino de entrega</h3>
        <div className='detallesDeEntrega'>
          <Grid container>
            <Grid item xs={12} lg={5}>
              <div className='flex flex-col mx-10 mt-2 mb-4 gap-1'>
                <label className='font-bold lg:mr-2'>Calle:</label>
                <TextField id="filled-search" name="calle_entrega" label="Calle" type="search" variant="filled" value={form.calle_entrega} InputLabelProps={{ shrink: true }} onChange={handleChange} />
                <label className='font-bold lg:mr-2'>Nro:</label>
                <TextField id="filled-search" name="nro_entrega" label="Nro" type="search" variant="filled" value={form.nro_entrega} InputLabelProps={{ shrink: true }} onChange={handleChange} />
                <label className='font-bold lg:mr-2'>Referencia:</label>
                <TextField id="filled-search" name="ref_entrega" label="Referencia" type="search" variant="filled" value={form.ref_entrega} InputLabelProps={{ shrink: true }} onChange={handleChange} />
              </div>
            </Grid>

            <Grid item xs={12} lg={7} className='googleMaps mt-4 text-center'>
              <Maps></Maps>
            </Grid>
          </Grid>
        </div>

        <h3 className='py-3 pl-4 textos'>Datos de pago</h3>
        <Grid container>
          <Grid items xs={12} lg={5}>
            <div className='mx-10 mt-2 datosDePago'>
              <label className='font-bold'>Total a pagar: $...</label>
            </div>
            <div className='mb-4 botonesPagos'>
              <label>Forma de pago</label>
              <div className='direccionbotonesPago'>
                <button name="forma_pago" className={`rounded-full flex flex-col botonfotos py-2 px-4 ${form.forma_pago === FORMA_PAGO.EFECTIVO ? 'seleccionado' : ''}`} value={FORMA_PAGO.EFECTIVO} onClick={handleChange}>En efectivo</button>
                <button name="forma_pago" className={`rounded-full flex flex-col botonfotos py-2 px-4 ${form.forma_pago === FORMA_PAGO.TARJETA ? 'seleccionado' : ''}`} value={FORMA_PAGO.TARJETA} onClick={handleChange}>Con tarjeta</button>
              </div>
            </div>
          </Grid>
          <Grid items xs={12} lg={7} className='divPagos flex justify-start'>
            <div className='interfazPago'>
              {form.forma_pago === FORMA_PAGO.EFECTIVO ? (
                <div className='monto'>
                  <TextField type="text" name="monto_efectivo" id="montoEfectivo" label="Monto en efectivo" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} value={form.monto_efectivo} onChange={handleChange} />
                </div>
              ) : form.forma_pago === FORMA_PAGO.TARJETA ? (
                <div className='datosDeLaTarjeta'>
                  <ReactCards cardData={cardData} setCardData={setCardData}></ReactCards>
                </div>
              ) : null}
            </div>
          </Grid>
        </Grid>

        <h3 className='py-3 pl-4 textos'>Fecha de recepción</h3>
        <div className="fechaRecepcion my-2">
          <div className='labelfechas'>

            <Checkbox {...label} checked={loAntesPosible} onChange={handleLoAntesPosibleChange} />
            <label>Lo antes posible</label>
            <Checkbox {...label} checked={seleccionarFecha} onChange={handleSeleccionarFechaChange} />
            <label>Seleccionar fecha y hora</label>
          </div>

          {seleccionarFecha && (
            <div className="inputsFechaHora">
              <TextField id="fecha" name="fecha_entrega" label="Fecha" type="date" variant="outlined" fullWidth inputProps={{ min: TODAY }} InputLabelProps={{ shrink: true }} defaultValue={form.fecha_entrega} onChange={handleChange} />
              <TextField id="hora" name="hora_entrega" label="Hora" type="time" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} value={form.hora_entrega} onChange={handleChange} />
            </div>
          )}
        </div>

        <div className='botonConfirmar mb-4 flex justify-end lg:mr-10'>
          <button onClick={() => setConfirmationModal(!confirmationModal)} className="flex flex-row gap-2 align-center rounded-full botonfotos py-2 px-4">Confirmar pedido<BsBagCheckFill /></button>
        </div>
      </div>

      <DetallePedido confirmationModal={confirmationModal} setConfirmationModal={setConfirmationModal} form={form} />

      <Footer />
    </div>
  )
}

export default Pedidos
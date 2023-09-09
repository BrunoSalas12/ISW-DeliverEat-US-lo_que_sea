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

const Pedidos = () => {
  const [ciudad, setCiudadSeleccionada] = useState({});

  const [calleComercio, setCalleComercio] = useState("");
  const [numeroComercio, setNumeroComercio] = useState("");
  const [referenciaComercio, setReferenciaComercio] = useState("");

  const [calleEntrega, setCalleEntrega] = useState("");
  const [numeroEntrega, setNumeroEntrega] = useState("");
  const [referenciaEntrega, setReferenciaEntrega] = useState("");

  const [formaDePago, setFormaDePago] = useState('');
  const [montoEfectivo, setMontoEfectivo] = useState(0);

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [seleccionarFecha, setSeleccionarFecha] = useState(false);
  const [loAntesPosible, setLoAntesPosible] = useState(true);
  const [ciudades, setCiudades] = useState([]);

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const handleSeleccionarFechaChange = () => {
    setSeleccionarFecha(!seleccionarFecha);
    setLoAntesPosible(false);
  };

  const handleLoAntesPosibleChange = () => {
    setLoAntesPosible(!loAntesPosible);
    setSeleccionarFecha(false);
  };


  useEffect(() => {
    fetchCiudades()
      .then(jsonCiudades => {
        setCiudades(jsonCiudades['ciudades']);
      })
      .catch(e => console.log(e));
  }, []);

  const handleChangeCiudad = (idx) => {
    setCiudadSeleccionada({ ...ciudades[idx] })
  }

  return (
    <div>
      <Navbar/>

        <h3 className='py-3 pl-4 textos'>Nuevo pedido</h3>
        <div className='detallePedido'>

          <Grid container direction={{ xs: "column-reverse", lg: "row"}}>

            <Grid item xs={12} lg={5} className='grilla1'>
              <div className='div1'>
                <label className='mt-7 mb-2 font-bold'>Productos a enviar:</label>
                <button className="mb-2 rounded-full botonfotos py-2 px-4 flex justify-center flex-col items-center">Subir fotos<FiUpload/></button>              
              </div>
            </Grid>

            <Grid item xs={12} lg={7} className='grilla2'>
              <h1>Grilla para cargar fotos</h1>
            </Grid>
            
          </Grid>

          <h3 className='py-3 pl-4 textos'>Datos de envío</h3>
          <div className='datosDeEnvio'>
            <div className='selectCiudad ml-10 my-5'>
              <label className='font-bold'>Ciudad:</label>
              {
                ciudades.length > 0 && <Select className='ml-3' labelId="demo-simple-select-label" id="demo-simple-select" defaultValue={0} onChange={e => handleChangeCiudad(e.target.value)}>
                {ciudades.map((c, idx) => (
                  <MenuItem key={idx} value={idx}>{c['nombre']}</MenuItem>
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
                  <TextField id="filled-search" label="Calle" type="search" variant="filled" value={calleComercio} onChange={(e) => setCalleComercio(e.target.value)}/>
                  <label className='font-bold lg:mr-2'>Nro:</label>
                  <TextField id="filled-search" label="Nro" type="search" variant="filled" value={numeroComercio} onChange={(e) => setNumeroComercio(e.target.value)}/>
                  <label className='font-bold lg:mr-2'>Referencia:</label>
                  <TextField id="filled-search" label="Referencia" type="search" variant="filled" value={referenciaComercio} onChange={(e) => setReferenciaComercio(e.target.value)}/>
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
                  <TextField id="filled-search" label="Calle" type="search" variant="filled" value={calleEntrega} onChange={(e) => setCalleEntrega(e.target.value)}/>
                  <label className='font-bold lg:mr-2'>Nro:</label>
                  <TextField id="filled-search" label="Nro" type="search" variant="filled" value={numeroEntrega} onChange={(e) => setNumeroEntrega(e.target.value)}/>
                  <label className='font-bold lg:mr-2'>Referencia:</label>
                  <TextField id="filled-search" label="Referencia" type="search" variant="filled" value={referenciaEntrega} onChange={(e) => setReferenciaEntrega(e.target.value)}/>
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
                    <button className={`rounded-full flex flex-col botonfotos py-2 px-4 ${formaDePago === 'efectivo' ? 'seleccionado' : ''}`} onClick={() => setFormaDePago('efectivo')}>En efectivo</button>
                    <button className={`rounded-full flex flex-col botonfotos py-2 px-4 ${formaDePago === 'tarjeta' ? 'seleccionado' : ''}`} onClick={() => setFormaDePago('tarjeta')}>Con tarjeta</button>
                  </div>
              </div>
            </Grid>
            <Grid items xs={12} lg={7} className='divPagos flex justify-start'>
            <div className='interfazPago'>
              {formaDePago === 'efectivo' ? (
                <div className='monto'>
                  <TextField id="montoEfectivo" label="Monto en efectivo" type="number" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} value={montoEfectivo} onChange={(e) => setMontoEfectivo(e.target.value)}/>
                </div>
              ) : formaDePago === 'tarjeta' ? (
                <div className='datosDeLaTarjeta'>
                  <ReactCards></ReactCards>
                </div>
              ) : null}
            </div>
            </Grid>
          </Grid>

          <h3 className='py-3 pl-4 textos'>Fecha de recepción</h3>
          <div className="fechaRecepcion my-2">
            <div className='labelfechas'>

            <Checkbox {...label} checked={loAntesPosible} onChange={handleLoAntesPosibleChange}/>
            <label>Lo antes posible</label>
            <Checkbox {...label} checked={seleccionarFecha} onChange={handleSeleccionarFechaChange}/>
            <label>Seleccionar fecha y hora</label>
            </div>

              {seleccionarFecha && (
              <div className="inputsFechaHora">
                <TextField id="fecha" label="Fecha" type="date" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} value={fecha} onChange={(e) => setFecha(e.target.value)}/>
                <TextField id="hora" label="Hora" type="time" variant="outlined" fullWidth InputLabelProps={{ shrink: true}} value={hora} onChange={(e) => setHora(e.target.value)}/>
              </div>
              )}            
          </div>

          <div className='botonConfirmar mb-4 flex justify-end lg:mr-10'>
            <button className="flex flex-row gap-2 align-center rounded-full botonfotos py-2 px-4">Confirmar pedido<BsBagCheckFill/></button>              
          </div>
        </div>

      <Footer/>
    </div>
  )
}

export default Pedidos
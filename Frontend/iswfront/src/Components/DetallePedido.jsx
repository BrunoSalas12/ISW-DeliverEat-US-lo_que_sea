import '../Styles/detallepedidos.css';

import { Modal, Box, Typography, Grid, Button, Stack } from "@mui/material"
import { FORMA_PAGO } from "../utils/common"
import { postPedido } from "../api"

export default function DetallePedido({ confirmationModal, setConfirmationModal, form }) {

    const handleSend = () => {
        postPedido(form);
    }

    return (
        <Modal
            open={confirmationModal}
            onClose={() => setConfirmationModal(!confirmationModal)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{
                display: 'flex',
                margin: '3rem',
                backgroundColor: '#007090',
                color: '#EAEBED',
                padding: '2rem',
                alignContent: 'center',
                justifyContent: 'center',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            }}>
                <Stack>
                    <Typography sx={{ fontFamily: 'Montserrat', textAlign: 'center', textJustify: 'center', overflowX: 'hidden', textOverflow: 'ellipsis' }}>
                        <b>Detalle del pedido</b><br />
                        <Grid style={{ margin: '10px 0px 15px 0px', height: '2px', backgroundColor: 'white' }}></Grid>
                        <b>Comercio </b><br />
                        {form.ciudad?.nombre} <br />
                        {form.calle_comercio} {form.nro_comercio} <br />
                        {form.ref_comercio} <br />
                        <Grid style={{ margin: '10px 0px 15px 0px', height: '2px', backgroundColor: 'white' }}></Grid>
                        <b>Entrega </b><br />
                        {form.calle_entrega} {form.nro_entrega} <br />
                        {form.ref_entrega} <br />
                        <Grid style={{ margin: '10px 0px 15px 0px', height: '2px', backgroundColor: 'white' }}></Grid>
                        <b>Forma de Pago </b><br />
                        {form.forma_pago} <br />
                        {form.forma_pago === FORMA_PAGO.EFECTIVO && '$ ' + form.monto_efectivo}
                        <Grid style={{ margin: '10px 0px 15px 0px', height: '2px', backgroundColor: 'white' }}></Grid>
                        <b>Fecha de Entrega </b><br />
                        {form.fecha_entrega === 1 ? "Lo antes posible" : form.fecha_entrega + ' ' + form.hora_entrega}
                    </Typography>
                    <Grid className='containerBotonDetalleConfirmar'>
                        <button className='botonConfirmarDetallePedido align-center rounded-full py-2 px-4' onClick={handleSend}>Confirmar</button>
                    </Grid>
                </Stack>
            </Box>
        </Modal>
    )
}
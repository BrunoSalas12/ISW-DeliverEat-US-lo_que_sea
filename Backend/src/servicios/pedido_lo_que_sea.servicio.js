import conexionBD from "../base-datos/conexionBD.js"
import CONSTANTES from "../constantes.js";

const mapearPedido = (pedidoReq) => {
    let pedidoLQS = conexionBD.models.PedidoLoQueSea.build();
    pedidoLQS.Desc_Objetos = pedidoReq.desc_objetos;
    pedidoLQS.Id_Ciudad = pedidoReq.ciudad;
    pedidoLQS.Dir_Comercio = pedidoReq.dir_comercio;
    pedidoLQS.Dir_Entrega = pedidoReq.dir_entrega;
    if(pedidoReq.pago.forma == CONSTANTES.METODOS_FORMA_PAGO.METODO_EFECTIVO){
        pedidoLQS.Forma_Pago = pedidoReq.pago.forma;
        pedidoLQS.Monto_Efectivo = pedidoReq.pago.monto_efectivo;
    }
    else if(pedidoReq.pago.forma == CONSTANTES.METODOS_FORMA_PAGO.METODO_TARJETA_CREDITO){
        pedidoLQS.Forma_Pago = pedidoReq.pago.forma;
        pedidoLQS.Numero_TC = pedidoReq.pago.nro_TC;
        pedidoLQS.Nombre_Titular_TC = pedidoReq.pago.nombre_titular_TC;
        pedidoLQS.Apellido_Titular_TC = pedidoReq.pago.apellido_titular_TC;
        pedidoLQS.Fecha_Vencimiento_TC = pedidoReq.pago.fecha_ven_TC;
        pedidoLQS.CVC_TC = pedidoReq.pago.CVC_TC;
    }
    pedidoLQS.Fecha_Entrega = pedidoReq.fecha_entrega;
    pedidoLQS.Monto_Total = pedidoReq.monto_total;
    pedidoLQS.Id_Usuario = pedidoReq.usuario.id;
    return pedidoLQS;
};


const insertarPedidoLoQueSea = async (pedidoAGuardar) => {
    await pedidoAGuardar.save();
};

const pedidosLoQueSeaServicio = {insertarPedidoLoQueSea, mapearPedido};

export default pedidosLoQueSeaServicio;
import { Sequelize } from "sequelize";
import CONSTANTES from "../constantes.js";
import modeloCiudades from "../modelos/modelo-ciudades.js";
import modeloPedidoLoQueSea from "../modelos/modelo-pedido_lo_que_sea.js";

const conexionBD = new Sequelize({
    dialect: "sqlite",
    storage: "./BD/base-DeliverEat.db"
})

const Ciudaes = conexionBD.define(
    CONSTANTES.MODELOS_BD.MODELO_CIUDADES,
    modeloCiudades.atributosCiudaes,
    modeloCiudades.opcionesCiudades
)
const PedidosLoQueSea = conexionBD.define(
    CONSTANTES.MODELOS_BD.MODELO_PEDIDO,
    modeloPedidoLoQueSea.atributosPedidoLoQueSea,
    modeloPedidoLoQueSea.opcionesPedidosLoQueSea
)

export default conexionBD
import { Sequelize } from "sequelize";
import CONSTANTES from "../constantes.js";
import modeloCiudades from "../modelos/modelo-ciudades.js";

const conexionBD = new Sequelize({
    dialect: "sqlite",
    storage: "./BD/base-DeliverEat.db"
})

const Ciudaes = conexionBD.define(
    CONSTANTES.MODELOS_BD.MODELO_CIUDADES,
    modeloCiudades.atributosCiudaes,
    modeloCiudades.opcionesCiudades
)

export default conexionBD
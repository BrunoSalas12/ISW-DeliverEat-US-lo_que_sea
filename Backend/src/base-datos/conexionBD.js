import { Sequelize } from "sequelize";
import CONSTANTES from "../constantes";
import modeloCiudades from "../modelos/modelo-ciudades";

const conexionBD = new Sequelize({
    dialect: "sqlite",
    storage: "../BD/base-DeliveriEat.db"
})

const Ciudaes = conexionBD.define(
    CONSTANTES.MODELOS_BD.MODELO_CIUDADES,
    modeloCiudades.atributosCiudaes,
    modeloCiudades.opcionesCiudades
)

export default conexionBD
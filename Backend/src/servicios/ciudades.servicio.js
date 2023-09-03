import conexionBD from "../base-datos/conexionBD.js";

const obtenerCiudades = async () => {
    const resultado = await conexionBD.models.Ciudades.findAll({
        attributes:['Id', 'Nombre'],
        order:[['Nombre', 'ASC']]
    })

    const vecCid = resultado.map(c =>{
        return{
            id_c: c.dataValues.Id,
            nombre: c.dataValues.Nombre
        }
    })
    return {"ciudades": vecCid}
};

const ciudadesServicio = {obtenerCiudades};

export default ciudadesServicio;
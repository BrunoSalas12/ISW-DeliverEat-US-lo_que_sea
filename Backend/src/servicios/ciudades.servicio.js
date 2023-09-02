import conexionBD from "../base-datos/conexionBD";

const obtenerCiudades = async () => {
    const resultado = await conexionBD.models.Ciudades.findAll({
        attributes:['Id', 'Nombre'],
        order:[['Nombre', 'ASC']]
    })

    return resultado.map(c =>{
        return{
            id: c.dataValues.Id,
            nombre: c.dataValues.Nombre
        }
    })
}
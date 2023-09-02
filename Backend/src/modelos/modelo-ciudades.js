import { DataType, DataTypes } from "sequelize";

const atributosCiudaes = {
    Id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    Nombre:{
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    }
};

const opcionesCiudades ={
    timestamps: false
};

const modeloCiudades = {atributosCiudaes, opcionesCiudades};
export default modeloCiudades;
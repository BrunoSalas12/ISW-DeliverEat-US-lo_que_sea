import express from 'express';
import CONSTANTES from './src/constantes.js';
import ciudadesServicio from './src/servicios/ciudades.servicio.js';


const app = express();

app.use(express.json())

app.get('/api/ciudades', async (req,res)=>{ 
        try{
            const ciudades = await ciudadesServicio.obtenerCiudades()
            return res.status(200).json(ciudades)
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    })


app.listen(CONSTANTES.PUERTO, () => {
    console.log(`Aplicacion levantada en el puerto ${CONSTANTES.PUERTO}`)
})
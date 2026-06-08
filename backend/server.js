const express= require ('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor del facturador funcionando');
                           });

app.get("/api/prueba",(req,res)=>{

    res.json({
        mensaje:"Backend funcionando correctamente"
    })
}) 

const PORT= process.env.PORT ||4000;

app.listen(PORT,()=>{
    console.log("Servidor corriendo en el puerto",PORT);
})
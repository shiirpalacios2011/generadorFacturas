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

app.get("/api/clientes", (req, res) => {
  const clientes = [
    {
      id: 1,
      nombre: "Cliente de prueba",
      email: "cliente@test.com",
      documento: "12345678",
      telefono: "3804000000",
    },
    {
      id: 2,
      nombre: "María Gómez",
      email: "maria@gmail.com",
      documento: "30111222",
      telefono: "3804555555",
    },
  ];

  res.json(clientes);
});






app.listen(PORT,()=>{
    console.log("Servidor corriendo en el puerto",PORT);
})
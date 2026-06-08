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

let facturas = [];

app.post("/api/facturas", (req, res) => {
  const { cliente, descripcion, precio } = req.body;

  if (!cliente || !descripcion || !precio) {
    return res.status(400).json({
      mensaje: "Faltan datos para generar la factura",
    });
  }

  const nuevaFactura = {
    id: facturas.length + 1,
    numero: Math.floor(Math.random() * 100000),
    fecha: new Date().toLocaleDateString(),
    cliente,
    descripcion,
    precio: Number(precio),
  };

  facturas.push(nuevaFactura);

  res.status(201).json({
    mensaje: "Factura generada correctamente",
    factura: nuevaFactura,
  });
});

app.get("/api/facturas", (req, res) => {
  res.json(facturas);
});




app.listen(PORT,()=>{
    console.log("Servidor corriendo en el puerto",PORT);
})
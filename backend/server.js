const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();;

const app = express();

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, "data");
const FACTURAS_FILE = path.join(DATA_DIR, "facturas.json");

const asegurarArchivoFacturas = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
  }

  if (!fs.existsSync(FACTURAS_FILE)) {
    fs.writeFileSync(FACTURAS_FILE, JSON.stringify([], null, 2));
  }
};

const leerFacturas = () => {
  asegurarArchivoFacturas();

  const contenido = fs.readFileSync(FACTURAS_FILE, "utf-8");
  return JSON.parse(contenido);
};

const guardarFacturas = (facturas) => {
  asegurarArchivoFacturas();

  fs.writeFileSync(FACTURAS_FILE, JSON.stringify(facturas, null, 2));
};

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

let facturas = leerFacturas();

app.post("/api/facturas", (req, res) => {
  const { cliente, descripcion, precio } = req.body;

  if (!cliente || !descripcion || precio === undefined || precio === "") {
    return res.status(400).json({
      mensaje: "Faltan datos para generar la factura",
    });
  }

  const precioNumero = Number(precio);

  if (Number.isNaN(precioNumero) || precioNumero <= 0) {
    return res.status(400).json({
      mensaje: "El precio debe ser un número mayor a 0",
    });
  }

  const numeroFactura = `F-${String(facturas.length + 1).padStart(5, "0")}`;

  const nuevaFactura = {
    id: facturas.length + 1,
    numero: numeroFactura,
    fecha: new Date().toLocaleDateString(),
    cliente,
    descripcion,
    precio: precioNumero,
  };

  facturas.push(nuevaFactura);
  guardarFacturas(facturas);

  res.status(201).json({
    mensaje: "Factura generada correctamente",
    factura: nuevaFactura,
  });
});

app.get("/api/facturas", (req, res) => {
  res.json(facturas);
});

app.delete("/api/facturas/:id", (req, res) => {
  const id = Number(req.params.id);

  const facturaExiste = facturas.find((factura) => factura.id === id);

  if (!facturaExiste) {
    return res.status(404).json({
      mensaje: "Factura no encontrada",
    });
  }

  facturas = facturas.filter((factura) => factura.id !== id);
  guardarFacturas(facturas);

  res.json({
    mensaje: "Factura eliminada correctamente",
  });
});


app.listen(PORT,()=>{
    console.log("Servidor corriendo en el puerto",PORT);
})
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const facturasRoutes = require("./routes/facturas.routes");
const clientesRoutes = require("./routes/clientes.routes");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Servidor del facturador funcionando");
});

app.get("/api/prueba", (req, res) => {
  res.json({
    mensaje: "Backend funcionando correctamente",
  });
});



app.use("/api/facturas", facturasRoutes);
app.use("/api/clientes", clientesRoutes);

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto", PORT);
});
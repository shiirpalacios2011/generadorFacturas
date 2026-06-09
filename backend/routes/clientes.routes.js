const express = require("express");

const {
  obtenerClientes,
  crearCliente,
  eliminarCliente,
} = require("../controllers/clientes.controller");

const router = express.Router();

router.get("/", obtenerClientes);
router.post("/", crearCliente);
router.delete("/:id", eliminarCliente);

module.exports = router;
const express = require("express");

const {
  obtenerFacturas,
  crearFactura,
  eliminarFactura,
} = require("../controllers/facturas.controller");

const router = express.Router();

router.get("/", obtenerFacturas);
router.post("/", crearFactura);
router.delete("/:id", eliminarFactura);

module.exports = router;
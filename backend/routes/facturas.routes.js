const express = require("express");

const {
  obtenerFacturas,
  crearFactura,
  anularFactura,
} = require("../controllers/facturas.controller");

const router = express.Router();

router.get("/", obtenerFacturas);
router.post("/", crearFactura);
router.patch("/:id/anular", anularFactura);

module.exports = router;
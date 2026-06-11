const {
  obtenerTodasLasFacturas,
  crearFacturaRepository,
  anularFacturaRepository,
} = require("../repositories/facturas.repository");

const obtenerFacturas = (req, res) => {
  const facturas = obtenerTodasLasFacturas();
  res.json(facturas);
};

const crearFactura = (req, res) => {
  const {
    cliente,
    clienteEmail,
    clienteDocumento,
    clienteTelefono,
    descripcion,
    precio,
  } = req.body || {};

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

  const facturas = obtenerTodasLasFacturas();

  const nuevoId =
    facturas.length > 0
      ? Math.max(...facturas.map((factura) => factura.id)) + 1
      : 1;

  const numeroFactura = `F-${String(nuevoId).padStart(5, "0")}`;

  const nuevaFactura = {
    id: nuevoId,
    numero: numeroFactura,
    fecha: new Date().toLocaleDateString(),
    cliente: cliente.trim(),
    clienteEmail: clienteEmail || "",
    clienteDocumento: clienteDocumento || "",
    clienteTelefono: clienteTelefono || "",
    descripcion: descripcion.trim(),
    precio: precioNumero,
    estado: "Emitida",
  };

  crearFacturaRepository(nuevaFactura);

  res.status(201).json({
    mensaje: "Factura generada correctamente",
    factura: nuevaFactura,
  });
};

const anularFactura = (req, res) => {
  const id = Number(req.params.id);

  const resultado = anularFacturaRepository(id);

  if (!resultado) {
    return res.status(404).json({
      mensaje: "Factura no encontrada",
    });
  }

  if (resultado.error === "FACTURA_YA_ANULADA") {
    return res.status(400).json({
      mensaje: "La factura ya se encuentra anulada",
    });
  }

  res.json({
    mensaje: "Factura anulada correctamente",
    factura: resultado,
  });
};

module.exports = {
  obtenerFacturas,
  crearFactura,
  anularFactura,
};
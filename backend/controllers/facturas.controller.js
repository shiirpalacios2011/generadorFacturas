const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");
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

const obtenerFacturas = (req, res) => {
  const facturas = leerFacturas();
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

  const facturas = leerFacturas();

  const nuevoId =
    facturas.length > 0
      ? Math.max(...facturas.map((factura) => factura.id)) + 1
      : 1;

  const numeroFactura = `F-${String(nuevoId).padStart(5, "0")}`;

  const nuevaFactura = {
    id: nuevoId,
    numero: numeroFactura,
    fecha: new Date().toLocaleDateString(),
    cliente,
    clienteEmail: clienteEmail || "",
    clienteDocumento: clienteDocumento || "",
    clienteTelefono: clienteTelefono || "",
    descripcion,
    precio: precioNumero,
    estado: "Emitida",
  };

  facturas.push(nuevaFactura);
  guardarFacturas(facturas);

  res.status(201).json({
    mensaje: "Factura generada correctamente",
    factura: nuevaFactura,
  });
};

const anularFactura = (req, res) => {
  const id = Number(req.params.id);

  const facturas = leerFacturas();

  const facturaExiste = facturas.find((factura) => factura.id === id);

  if (!facturaExiste) {
    return res.status(404).json({
      mensaje: "Factura no encontrada",
    });
  }

  if (facturaExiste.estado === "Anulada") {
    return res.status(400).json({
      mensaje: "La factura ya se encuentra anulada",
    });
  }

  const facturasActualizadas = facturas.map((factura) => {
    if (factura.id === id) {
      return {
        ...factura,
        estado: "Anulada",
        fechaAnulacion: new Date().toLocaleDateString(),
      };
    }

    return factura;
  });

  guardarFacturas(facturasActualizadas);

  res.json({
    mensaje: "Factura anulada correctamente",
  });
};

module.exports = {
  obtenerFacturas,
  crearFactura,
  anularFactura,
};
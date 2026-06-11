const { leerJSON, guardarJSON } = require("../services/fileService");

const FACTURAS_FILE = "facturas.json";

const obtenerTodasLasFacturas = () => {
  return leerJSON(FACTURAS_FILE, []);
};

const guardarFacturas = (facturas) => {
  guardarJSON(FACTURAS_FILE, facturas);
};

const crearFacturaRepository = (nuevaFactura) => {
  const facturas = obtenerTodasLasFacturas();

  facturas.push(nuevaFactura);
  guardarFacturas(facturas);

  return nuevaFactura;
};

const anularFacturaRepository = (id) => {
  const facturas = obtenerTodasLasFacturas();

  const facturaExiste = facturas.find((factura) => factura.id === id);

  if (!facturaExiste) {
    return null;
  }

  if (facturaExiste.estado === "Anulada") {
    return {
      error: "FACTURA_YA_ANULADA",
      factura: facturaExiste,
    };
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

  return facturasActualizadas.find((factura) => factura.id === id);
};

module.exports = {
  obtenerTodasLasFacturas,
  crearFacturaRepository,
  anularFacturaRepository,
};
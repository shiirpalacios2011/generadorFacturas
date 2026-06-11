const {
  obtenerTodosLosClientes,
  crearClienteRepository,
  eliminarClienteRepository,
} = require("../repositories/clientes.repository");

const obtenerClientes = (req, res) => {
  const clientes = obtenerTodosLosClientes();
  res.json(clientes);
};

const crearCliente = (req, res) => {
  const { nombre, email, documento, telefono } = req.body || {};

  if (!nombre || !nombre.trim()) {
    return res.status(400).json({
      mensaje: "El nombre del cliente es obligatorio",
    });
  }

  const clientes = obtenerTodosLosClientes();

  const nuevoId =
    clientes.length > 0
      ? Math.max(...clientes.map((cliente) => cliente.id)) + 1
      : 1;

  const nuevoCliente = {
    id: nuevoId,
    nombre: nombre.trim(),
    email: email || "",
    documento: documento || "",
    telefono: telefono || "",
  };

  crearClienteRepository(nuevoCliente);

  res.status(201).json({
    mensaje: "Cliente creado correctamente",
    cliente: nuevoCliente,
  });
};

const eliminarCliente = (req, res) => {
  const id = Number(req.params.id);

  const clienteEliminado = eliminarClienteRepository(id);

  if (!clienteEliminado) {
    return res.status(404).json({
      mensaje: "Cliente no encontrado",
    });
  }

  res.json({
    mensaje: "Cliente eliminado correctamente",
  });
};

module.exports = {
  obtenerClientes,
  crearCliente,
  eliminarCliente,
};
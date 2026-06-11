const { leerJSON, guardarJSON } = require("../services/fileService");

const CLIENTES_FILE = "clientes.json";

const leerClientes = () => {
  return leerJSON(CLIENTES_FILE, []);
};

const guardarClientes = (clientes) => {
  guardarJSON(CLIENTES_FILE, clientes);
};

const obtenerClientes = (req, res) => {
  const clientes = leerClientes();
  res.json(clientes);
};

const crearCliente = (req, res) => {
  const { nombre, email, documento, telefono } = req.body || {};

  if (!nombre || !nombre.trim()) {
    return res.status(400).json({
      mensaje: "El nombre del cliente es obligatorio",
    });
  }

  const clientes = leerClientes();

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

  clientes.push(nuevoCliente);
  guardarClientes(clientes);

  res.status(201).json({
    mensaje: "Cliente creado correctamente",
    cliente: nuevoCliente,
  });
};

const eliminarCliente = (req, res) => {
  const id = Number(req.params.id);

  const clientes = leerClientes();

  const clienteExiste = clientes.find((cliente) => cliente.id === id);

  if (!clienteExiste) {
    return res.status(404).json({
      mensaje: "Cliente no encontrado",
    });
  }

  const clientesActualizados = clientes.filter((cliente) => cliente.id !== id);

  guardarClientes(clientesActualizados);

  res.json({
    mensaje: "Cliente eliminado correctamente",
  });
};

module.exports = {
  obtenerClientes,
  crearCliente,
  eliminarCliente,
};
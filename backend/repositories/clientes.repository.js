const { leerJSON, guardarJSON } = require("../services/fileService");

const CLIENTES_FILE = "clientes.json";

const obtenerTodosLosClientes = () => {
  return leerJSON(CLIENTES_FILE, []);
};

const guardarClientes = (clientes) => {
  guardarJSON(CLIENTES_FILE, clientes);
};

const crearClienteRepository = (nuevoCliente) => {
  const clientes = obtenerTodosLosClientes();

  clientes.push(nuevoCliente);
  guardarClientes(clientes);

  return nuevoCliente;
};

const eliminarClienteRepository = (id) => {
  const clientes = obtenerTodosLosClientes();

  const clienteExiste = clientes.find((cliente) => cliente.id === id);

  if (!clienteExiste) {
    return null;
  }

  const clientesActualizados = clientes.filter((cliente) => cliente.id !== id);

  guardarClientes(clientesActualizados);

  return clienteExiste;
};

module.exports = {
  obtenerTodosLosClientes,
  crearClienteRepository,
  eliminarClienteRepository,
};

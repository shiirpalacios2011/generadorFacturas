const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const obtenerMensajeBackend = async () => {
  const respuesta = await fetch(`${API_URL}/api/prueba`);
  return respuesta.json();
};

export const obtenerClientes = async () => {
  const respuesta = await fetch(`${API_URL}/api/clientes`);
  return respuesta.json();
};

export const crearCliente = async (clienteNuevo) => {
  const respuesta = await fetch(`${API_URL}/api/clientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clienteNuevo),
  });

  const datos = await respuesta.json();

  return {
    ok: respuesta.ok,
    datos,
  };
};

export const eliminarCliente = async (id) => {
  const respuesta = await fetch(`${API_URL}/api/clientes/${id}`, {
    method: "DELETE",
  });

  const datos = await respuesta.json();

  return {
    ok: respuesta.ok,
    datos,
  };
};

export const obtenerFacturas = async () => {
  const respuesta = await fetch(`${API_URL}/api/facturas`);
  return respuesta.json();
};

export const crearFactura = async (facturaParaEnviar) => {
  const respuesta = await fetch(`${API_URL}/api/facturas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(facturaParaEnviar),
  });

  const datos = await respuesta.json();

  return {
    ok: respuesta.ok,
    datos,
  };
};

export const anularFactura = async (id) => {
  const respuesta = await fetch(`${API_URL}/api/facturas/${id}/anular`, {
    method: "PATCH",
  });

  const datos = await respuesta.json();

  return {
    ok: respuesta.ok,
    datos,
  };
};
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [mensaje, setMensaje] = useState("Cargando conexión...");
  const [clientes, setClientes] = useState([]);
  const [clienteNuevo, setClienteNuevo] = useState({
  nombre: "",
  email: "",
  documento: "",
  telefono: "",
});

  const [factura, setFactura] = useState({
    cliente: "",
    descripcion: "",
    precio: "",
  });

  const [facturaGenerada, setFacturaGenerada] = useState(null);
  const [historialFacturas, setHistorialFacturas] = useState([]);

  const datosEmisor = {
    nombre: "Facturador APP",
    cuit: "20-12345678-9",
    domicilio: "Argentina",
    condicionFiscal: "Monotributista",
  };

  const obtenerFacturas = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/api/facturas`);
      const datos = await respuesta.json();
      setHistorialFacturas(datos);
    } catch (error) {
      console.error("Error al obtener facturas:", error);
    }
  };

  useEffect(() => {
    fetch(`${API_URL}/api/prueba`)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setMensaje(datos.mensaje);
      })
      .catch(() => {
        setMensaje("No se pudo conectar con el backend");
      });

    fetch(`${API_URL}/api/clientes`)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setClientes(datos);
      })
      .catch((error) => {
        console.error("Error al obtener clientes:", error);
      });

    obtenerFacturas();
  }, []);

  const manejarCambio = (e) => {
    setFactura({
      ...factura,
      [e.target.name]: e.target.value,
    });
  };

  const manejarCambioCliente = (e) => {
  setClienteNuevo({
    ...clienteNuevo,
    [e.target.name]: e.target.value,
  });
};

const crearCliente = async (e) => {
  e.preventDefault();

  try {
    const respuesta = await fetch(`${API_URL}/api/clientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clienteNuevo),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      alert(datos.mensaje || "Error al crear el cliente");
      return;
    }

    setClientes([...clientes, datos.cliente]);

    setClienteNuevo({
      nombre: "",
      email: "",
      documento: "",
      telefono: "",
    });

    alert("Cliente creado correctamente");
  } catch (error) {
    console.error("Error al crear cliente:", error);
    alert("No se pudo conectar con el backend");
  }
};


  <section className="card historial">
  <h2>Clientes cargados</h2>

  {clientes.length === 0 ? (
    <p>No hay clientes cargados todavía</p>
  ) : (
    <ul>
      {clientes.map((cliente) => (
        <li key={cliente.id}>
          <strong>{cliente.nombre}</strong>

          {cliente.email && <span>Email: {cliente.email}</span>}
          {cliente.documento && <span>Documento: {cliente.documento}</span>}
          {cliente.telefono && <span>Teléfono: {cliente.telefono}</span>}

          <button
            className="boton-eliminar"
            onClick={() => eliminarCliente(cliente.id)}
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  )}
</section>
  
  const eliminarCliente = async (id) => {
  const confirmar = confirm("¿Seguro querés eliminar este cliente?");

  if (!confirmar) {
    return;
  }

  try {
    const respuesta = await fetch(`${API_URL}/api/clientes/${id}`, {
      method: "DELETE",
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      alert(datos.mensaje || "Error al eliminar el cliente");
      return;
    }

    setClientes(clientes.filter((cliente) => cliente.id !== id));
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    alert("No se pudo conectar con el backend");
  }
};

  const generarFactura = async (e) => {
    e.preventDefault();

    const clienteSeleccionado = clientes.find(
  (cliente) => cliente.nombre.toLowerCase() === factura.cliente.toLowerCase()
);

const facturaParaEnviar = {
  ...factura,
  clienteEmail: clienteSeleccionado?.email || "",
  clienteDocumento: clienteSeleccionado?.documento || "",
  clienteTelefono: clienteSeleccionado?.telefono || "",
};

    try {
      const respuesta = await fetch(`${API_URL}/api/facturas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(facturaParaEnviar),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        alert(datos.mensaje || "Error al generar la factura");
        return;
      }

      setFacturaGenerada(datos.factura);
      obtenerFacturas();

      setFactura({
        cliente: "",
        descripcion: "",
        precio: "",
      });
    } catch (error) {
      console.error("Error al enviar factura:", error);
      alert("No se pudo conectar con el backend");
    }
  };

  const descargarPDF = (facturaParaDescargar) => {
    if (!facturaParaDescargar) {
      alert("No hay factura para descargar");
      return;
    }

    const pdf = new jsPDF();

    pdf.setFontSize(11);
pdf.text(`Cliente: ${facturaParaDescargar.cliente}`, 20, 82);

if (facturaParaDescargar.clienteDocumento) {
  pdf.text(`Documento: ${facturaParaDescargar.clienteDocumento}`, 20, 90);
}

if (facturaParaDescargar.clienteEmail) {
  pdf.text(`Email: ${facturaParaDescargar.clienteEmail}`, 20, 98);
}

if (facturaParaDescargar.clienteTelefono) {
  pdf.text(`Teléfono: ${facturaParaDescargar.clienteTelefono}`, 20, 106);
}

    pdf.setFontSize(11);
    pdf.text(`CUIT: ${datosEmisor.cuit}`, 20, 30);
    pdf.text(`Domicilio: ${datosEmisor.domicilio}`, 20, 38);
    pdf.text(`Condición fiscal: ${datosEmisor.condicionFiscal}`, 20, 46);

    pdf.setFontSize(18);
    pdf.text("FACTURA SIMULADA", 120, 25);

    pdf.setFontSize(11);
    pdf.text(`N°: ${facturaParaDescargar.numero}`, 120, 35);
    pdf.text(`Fecha: ${facturaParaDescargar.fecha}`, 120, 43);
    pdf.text(`Estado: ${facturaParaDescargar.estado || "Emitida"}`, 120, 51);
    if (facturaParaDescargar.estado === "Anulada") {
  pdf.setFontSize(22);
  pdf.text("ANULADA", 75, 95);
}

    pdf.line(20, 55, 190, 55);

    pdf.setFontSize(14);
    pdf.text("Datos del cliente", 20, 70);

    pdf.setFontSize(11);
    pdf.text(`Cliente: ${facturaParaDescargar.cliente}`, 20, 82);

    pdf.setFontSize(14);
    pdf.text("Detalle del comprobante", 20, 122);

    pdf.setFontSize(11);
    pdf.text("Descripción", 20, 135);
    pdf.text("Importe", 155, 135);

    pdf.line(20, 140, 190, 140);

    pdf.text(facturaParaDescargar.descripcion, 20, 152);
    pdf.text(`$${facturaParaDescargar.precio}`, 155, 152);

    pdf.line(20, 162, 190, 162);

    pdf.setFontSize(16);
    pdf.text(`TOTAL: $${facturaParaDescargar.precio}`, 135, 177);

    pdf.setFontSize(10);
    pdf.text("Este comprobante es simulado y no tiene validez fiscal.", 20, 275);
    pdf.text("Generado por Facturador APP.", 20, 282);

    pdf.save(`factura-${facturaParaDescargar.numero}.pdf`);
  };

   const anularFactura = async (id) => {
  const confirmar = confirm("¿Seguro querés anular esta factura?");

  if (!confirmar) {
    return;
  }

  try {
    const respuesta = await fetch(`${API_URL}/api/facturas/${id}/anular`, {
      method: "PATCH",
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      alert(datos.mensaje || "Error al anular la factura");
      return;
    }

    obtenerFacturas();

    if (facturaGenerada && facturaGenerada.id === id) {
      setFacturaGenerada({
        ...facturaGenerada,
        estado: "Anulada",
      });
    }
  } catch (error) {
    console.error("Error al anular factura:", error);
    alert("No se pudo conectar con el backend");
  }
};

  return (
    <main className="contenedor">
      <h1>Facturador APP</h1>
      <p>Proyecto de facturación para emprendedores</p>

      <div className="card">
        <h2>Estado del backend</h2>
        <p>{mensaje}</p>
      </div>

      <section className="card">
  <h2>Crear cliente</h2>

  <form onSubmit={crearCliente} className="formulario">
    <label>Nombre</label>
    <input
      type="text"
      name="nombre"
      value={clienteNuevo.nombre}
      onChange={manejarCambioCliente}
      placeholder="Ej: Juan Pérez"
      required
    />

    <label>Email</label>
    <input
      type="email"
      name="email"
      value={clienteNuevo.email}
      onChange={manejarCambioCliente}
      placeholder="Ej: cliente@mail.com"
    />

    <label>Documento</label>
    <input
      type="text"
      name="documento"
      value={clienteNuevo.documento}
      onChange={manejarCambioCliente}
      placeholder="Ej: 30111222"
    />

    <label>Teléfono</label>
    <input
      type="text"
      name="telefono"
      value={clienteNuevo.telefono}
      onChange={manejarCambioCliente}
      placeholder="Ej: 3804000000"
    />

    <button type="submit">Guardar cliente</button>
    </form>
    </section>

      <section className="card">
        <h2>Crear factura simulada</h2>

        <form onSubmit={generarFactura} className="formulario">
          <label>Cliente</label>

          <input
            type="text"
            name="cliente"
            list="lista-clientes"
            value={factura.cliente}
            onChange={manejarCambio}
            placeholder="Seleccionar o escribir cliente"
            required
          />

          <datalist id="lista-clientes">
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.nombre} />
            ))}
          </datalist>

          <label>Producto o servicio</label>
          <input
            type="text"
            name="descripcion"
            value={factura.descripcion}
            onChange={manejarCambio}
            placeholder="Ej: Servicio de diseño"
            required
          />

          <label>Precio</label>
          <input
            type="number"
            name="precio"
            value={factura.precio}
            onChange={manejarCambio}
            placeholder="Ej: 15000"
            required
          />

          <button type="submit">Generar factura</button>
        </form>
      </section>

      {facturaGenerada && (
        <section className="card factura">
          <h2>Última factura generada</h2>

          <p>
            <strong>N°:</strong> {facturaGenerada.numero}
          </p>

          <p>
            <strong>Fecha:</strong> {facturaGenerada.fecha}
          </p>

          <p>
            <strong>Cliente:</strong> {facturaGenerada.cliente}
          </p>

          {facturaGenerada.clienteDocumento && (
  <p>
    <strong>Documento:</strong> {facturaGenerada.clienteDocumento}
  </p>
)}

{facturaGenerada.clienteEmail && (
  <p>
    <strong>Email:</strong> {facturaGenerada.clienteEmail}
  </p>
)}

{facturaGenerada.clienteTelefono && (
  <p>
    <strong>Teléfono:</strong> {facturaGenerada.clienteTelefono}
  </p>
)}

          <p>
            <strong>Detalle:</strong> {facturaGenerada.descripcion}
          </p>

          <p>
            <strong>Total:</strong> ${facturaGenerada.precio}
          </p>

          <p>
          <strong>Estado:</strong> {facturaGenerada.estado || "Emitida"}
          </p>

          <button
            className="boton-pdf"
            onClick={() => descargarPDF(facturaGenerada)}
          >
            Descargar PDF
          </button>
        </section>
      )}

      <section className="card historial">
        <h2>Historial de facturas</h2>

        {historialFacturas.length === 0 ? (
          <p>No hay facturas generadas todavía</p>
        ) : (
          <ul>
            {historialFacturas.map((factura) => (
              <li key={factura.id}>
                <strong>Factura N° {factura.numero}</strong>
                <span>Fecha: {factura.fecha}</span>
                <span>Cliente: {factura.cliente}</span>
                {factura.clienteDocumento && (
                <span>Documento: {factura.clienteDocumento}</span>
                 )}
                <span>Detalle: {factura.descripcion}</span>
                <span>Estado: {factura.estado || "Emitida"}</span>

                <button
                  className="boton-pdf boton-pdf-historial"
                  onClick={() => descargarPDF(factura)}
                >
                  Descargar PDF
                </button>

                {factura.estado !== "Anulada" && (
                <button
                className="boton-eliminar"
                onClick={() => anularFactura(factura.id)}
                >
                Anular
               </button>
                 )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
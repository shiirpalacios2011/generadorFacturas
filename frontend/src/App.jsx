import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "./App.css";

function App() {
  const [mensaje, setMensaje] = useState("Cargando conexión...");
  const [clientes, setClientes] = useState([]);

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
      const respuesta = await fetch("http://localhost:4000/api/facturas");
      const datos = await respuesta.json();
      setHistorialFacturas(datos);
    } catch (error) {
      console.error("Error al obtener facturas:", error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:4000/api/prueba")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setMensaje(datos.mensaje);
      })
      .catch(() => {
        setMensaje("No se pudo conectar con el backend");
      });

    fetch("http://localhost:4000/api/clientes")
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

  const generarFactura = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch("http://localhost:4000/api/facturas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(factura),
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

  // Encabezado principal
  pdf.setFontSize(20);
  pdf.text(datosEmisor.nombre, 20, 20);

  pdf.setFontSize(11);
  pdf.text(`CUIT: ${datosEmisor.cuit}`, 20, 30);
  pdf.text(`Domicilio: ${datosEmisor.domicilio}`, 20, 38);
  pdf.text(`Condición fiscal: ${datosEmisor.condicionFiscal}`, 20, 46);

  // Tipo de comprobante
  pdf.setFontSize(18);
  pdf.text("FACTURA SIMULADA", 120, 25);

  pdf.setFontSize(11);
  pdf.text(`N°: ${facturaParaDescargar.numero}`, 120, 35);
  pdf.text(`Fecha: ${facturaParaDescargar.fecha}`, 120, 43);

  // Línea separadora
  pdf.line(20, 55, 190, 55);

  // Datos del cliente
  pdf.setFontSize(14);
  pdf.text("Datos del cliente", 20, 70);

  pdf.setFontSize(11);
  pdf.text(`Cliente: ${facturaParaDescargar.cliente}`, 20, 82);

  // Detalle
  pdf.setFontSize(14);
  pdf.text("Detalle del comprobante", 20, 105);

  pdf.setFontSize(11);
  pdf.text("Descripción", 20, 118);
  pdf.text("Importe", 155, 118);

  pdf.line(20, 123, 190, 123);

  pdf.text(facturaParaDescargar.descripcion, 20, 135);
  pdf.text(`$${facturaParaDescargar.precio}`, 155, 135);

  pdf.line(20, 145, 190, 145);

  // Total
  pdf.setFontSize(16);
  pdf.text(`TOTAL: $${facturaParaDescargar.precio}`, 135, 160);

  // Aclaración
  pdf.setFontSize(10);
  pdf.text("Este comprobante es simulado y no tiene validez fiscal.", 20, 275);
  pdf.text("Generado por Facturador APP.", 20, 282);

  pdf.save(`factura-${facturaParaDescargar.numero}.pdf`);
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
        <h2>Crear factura simulada</h2>

        <form onSubmit={generarFactura} className="formulario">
          <label>Cliente</label>
          <select
            name="cliente"
            value={factura.cliente}
            onChange={manejarCambio}
            required
          >
            <option value="">Seleccionar cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.nombre}>
                {cliente.nombre}
              </option>
            ))}
          </select>

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

          <p>
            <strong>Detalle:</strong> {facturaGenerada.descripcion}
          </p>

          <p>
            <strong>Total:</strong> ${facturaGenerada.precio}
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
    <span>Detalle: {factura.descripcion}</span>
    <span>Total: ${factura.precio}</span>

    <button
      className="boton-pdf boton-pdf-historial"
      onClick={() => descargarPDF(factura)}
    >
      Descargar PDF
    </button>
  </li>
))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
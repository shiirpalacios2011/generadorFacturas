import { useEffect, useState } from "react";
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
          <h2>Factura simulada</h2>

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
        </section>
      )}
    </main>
  );
}

export default App;
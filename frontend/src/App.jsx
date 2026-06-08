import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [mensaje, setMensaje] = useState("Cargando conexión...");
  const [clientes, setClientes] = useState([]);

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

  return (
    <main className="contenedor">
      <h1>Facturador APP</h1>
      <p>Proyecto de facturación para emprendedores</p>

      <div className="card">
        <h2>Estado del backend</h2>
        <p>{mensaje}</p>
      </div>

      <section className="card clientes">
        <h2>Clientes</h2>

        {clientes.length === 0 ? (
          <p>No hay clientes cargados</p>
        ) : (
          <ul>
            {clientes.map((cliente) => (
              <li key={cliente.id}>
                <strong>{cliente.nombre}</strong>
                <span>{cliente.email}</span>
                <span>DNI/CUIT: {cliente.documento}</span>
                <span>Tel: {cliente.telefono}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
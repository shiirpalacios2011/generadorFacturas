import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [mensaje, setMensaje] = useState("Cargando conexión...");

  useEffect(() => {
    fetch("http://localhost:4000/api/prueba")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setMensaje(datos.mensaje);
      })
      .catch((error) => {
        console.error("Error al conectar con el backend:", error);
        setMensaje("No se pudo conectar con el backend");
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
    </main>
  );
}

export default App;
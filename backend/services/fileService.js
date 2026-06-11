const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");

const asegurarArchivo = (nombreArchivo, valorInicial = []) => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
  }

  const rutaArchivo = path.join(DATA_DIR, nombreArchivo);

  if (!fs.existsSync(rutaArchivo)) {
    fs.writeFileSync(rutaArchivo, JSON.stringify(valorInicial, null, 2));
  }

  return rutaArchivo;
};

const leerJSON = (nombreArchivo, valorInicial = []) => {
  const rutaArchivo = asegurarArchivo(nombreArchivo, valorInicial);

  const contenido = fs.readFileSync(rutaArchivo, "utf-8");

  if (!contenido) {
    return valorInicial;
  }

  return JSON.parse(contenido);
};

const guardarJSON = (nombreArchivo, datos) => {
  const rutaArchivo = asegurarArchivo(nombreArchivo);

  fs.writeFileSync(rutaArchivo, JSON.stringify(datos, null, 2));
};

module.exports = {
  leerJSON,
  guardarJSON,
};
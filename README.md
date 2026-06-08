# 🧾 Facturador APP

**Facturador APP** es un proyecto web desarrollado como MVP de un sistema de facturación para emprendedores.
Permite crear comprobantes simulados, visualizar un historial de facturas, descargar facturas en PDF y administrar registros desde una interfaz web.

> ⚠️ Este proyecto es una simulación con fines educativos y de portfolio.
> Los comprobantes generados no tienen validez fiscal.

---

## 📌 Objetivo del proyecto

El objetivo principal fue desarrollar una aplicación full stack sencilla que permita practicar el flujo completo entre frontend y backend:

* Crear una interfaz visual con React.
* Conectar React con un servidor en Node.js.
* Enviar datos desde formularios.
* Crear facturas desde el backend.
* Mostrar historial de comprobantes.
* Descargar comprobantes en formato PDF.
* Practicar rutas HTTP como GET, POST y DELETE.

---

## 🚀 Tecnologías utilizadas

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS
* jsPDF

### Backend

* Node.js
* Express
* CORS
* Dotenv
* Nodemon

### Herramientas

* Visual Studio Code
* Git
* GitHub
* Navegador web
* Postman / pruebas desde localhost

---

## 🧠 Funcionalidades principales

### ✅ Conexión frontend y backend

La aplicación cuenta con un frontend en React conectado a un backend desarrollado con Node.js y Express.

El frontend corre en:

```txt
http://localhost:5173
```

El backend corre en:

```txt
http://localhost:4000
```

---

### ✅ Estado del backend

La app muestra un mensaje de conexión para verificar que el frontend se comunica correctamente con el backend.

Ruta utilizada:

```txt
GET /api/prueba
```

---

### ✅ Clientes simulados

El backend devuelve una lista de clientes simulados para poder seleccionar un cliente al crear una factura.

Ruta utilizada:

```txt
GET /api/clientes
```

---

### ✅ Crear factura

El usuario puede completar un formulario con:

* Cliente
* Producto o servicio
* Precio

Al enviar el formulario, React manda los datos al backend y el backend genera una factura.

Ruta utilizada:

```txt
POST /api/facturas
```

---

### ✅ Historial de facturas

Las facturas generadas se muestran en un historial dentro de la aplicación.

Ruta utilizada:

```txt
GET /api/facturas
```

---

### ✅ Descargar factura en PDF

Cada factura puede descargarse en formato PDF usando la librería `jsPDF`.

El PDF incluye:

* Datos del emisor
* Número de factura
* Fecha
* Cliente
* Detalle del servicio/producto
* Total
* Aclaración de comprobante simulado

---

### ✅ Eliminar facturas

Cada factura del historial puede eliminarse mediante un botón.

Ruta utilizada:

```txt
DELETE /api/facturas/:id
```

---

## 📂 Estructura del proyecto

```txt
Facturador-APP/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── package.json
│   └── package-lock.json
│
└── .gitignore
```

---

## ⚙️ Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/shiirpalacios2011/generadorFacturas
```

### 2. Entrar al proyecto

```bash
cd Facturador-APP
```

---

## ▶️ Ejecutar el backend

```bash
cd backend
npm install
npm run dev
```

El backend queda disponible en:

```txt
http://localhost:4000
```

---

## ▶️ Ejecutar el frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

El frontend queda disponible en:

```txt
http://localhost:5173
```

---

## 🔗 Endpoints del backend

### Probar conexión

```txt
GET /api/prueba
```

### Obtener clientes

```txt
GET /api/clientes
```

### Obtener facturas

```txt
GET /api/facturas
```

### Crear factura

```txt
POST /api/facturas
```

Ejemplo de body:

```json
{
  "cliente": "Cliente de prueba",
  "descripcion": "Servicio de diseño",
  "precio": "15000"
}
```

### Eliminar factura

```txt
DELETE /api/facturas/:id
```

---

## 🖥️ Vista general de la aplicación

La aplicación cuenta con:

* Un encabezado principal.
* Estado de conexión con el backend.
* Formulario para crear facturas.
* Card de última factura generada.
* Historial de facturas.
* Botones para descargar PDF.
* Botón para eliminar facturas.
* Diseño visual en tonos rosas.

---

## 📚 Qué aprendí con este proyecto

Durante el desarrollo de este proyecto practiqué:

* Organización de un proyecto full stack.
* Creación de servidor con Express.
* Manejo de rutas HTTP.
* Comunicación entre frontend y backend.
* Uso de `fetch` para consumir APIs.
* Manejo de estados con `useState`.
* Uso de `useEffect` para cargar datos.
* Envío de datos mediante formularios.
* Generación de archivos PDF desde React.
* Control de versiones con Git.
* Separación entre frontend y backend.

---

## 🚧 Próximas mejoras

Algunas mejoras pensadas para futuras versiones:

* Conectar con una base de datos MySQL.
* Crear login de usuarios.
* Guardar facturas de forma persistente.
* Agregar búsqueda de facturas por cliente o número.
* Agregar edición de facturas.
* Mejorar el diseño del PDF.
* Crear panel de configuración del emisor.
* Agregar deploy del frontend y backend.
* Adaptar el diseño a dispositivos móviles.
* Integrar facturación real en entorno de prueba.

---

## 🧩 Estado del proyecto

Proyecto en desarrollo.
Actualmente funciona como MVP educativo y de portfolio.

---

## 👩‍💻 Autora

Desarrollado por **Shirley Palacios** como proyecto práctico para portfolio web.

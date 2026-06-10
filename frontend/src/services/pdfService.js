import { jsPDF } from "jspdf";
import { formatearMoneda } from "./formatService";

const datosEmisor = {
  nombre: "Facturador APP",
  cuit: "20-12345678-9",
  domicilio: "Argentina",
  condicionFiscal: "Monotributista",
};

export const descargarPDF = (facturaParaDescargar) => {
  if (!facturaParaDescargar) {
    alert("No hay factura para descargar");
    return;
  }

  const pdf = new jsPDF();

  pdf.setFontSize(20);
  pdf.text(datosEmisor.nombre, 20, 20);

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

  pdf.line(20, 58, 190, 58);

  pdf.setFontSize(14);
  pdf.text("Datos del cliente", 20, 72);

  pdf.setFontSize(11);
  pdf.text(`Cliente: ${facturaParaDescargar.cliente}`, 20, 84);

  if (facturaParaDescargar.clienteDocumento) {
    pdf.text(`Documento: ${facturaParaDescargar.clienteDocumento}`, 20, 92);
  }

  if (facturaParaDescargar.clienteEmail) {
    pdf.text(`Email: ${facturaParaDescargar.clienteEmail}`, 20, 100);
  }

  if (facturaParaDescargar.clienteTelefono) {
    pdf.text(`Teléfono: ${facturaParaDescargar.clienteTelefono}`, 20, 108);
  }

  if (facturaParaDescargar.estado === "Anulada") {
    pdf.setFontSize(22);
    pdf.text("ANULADA", 75, 120);
  }

  pdf.setFontSize(14);
  pdf.text("Detalle del comprobante", 20, 130);

  pdf.setFontSize(11);
  pdf.text("Descripción", 20, 143);
  pdf.text("Importe", 155, 143);

  pdf.line(20, 148, 190, 148);

  pdf.text(facturaParaDescargar.descripcion, 20, 160);
  pdf.text(formatearMoneda(facturaParaDescargar.precio), 155, 160);

  pdf.line(20, 170, 190, 170);

  pdf.setFontSize(16);
  pdf.text(`TOTAL: ${formatearMoneda(facturaParaDescargar.precio)}`, 120, 185);

  pdf.setFontSize(10);
  pdf.text("Este comprobante es simulado y no tiene validez fiscal.", 20, 275);
  pdf.text("Generado por Facturador APP.", 20, 282);

  pdf.save(`factura-${facturaParaDescargar.numero}.pdf`);
};
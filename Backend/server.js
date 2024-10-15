const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");
const app = express();

app.use(cors());
// Cargar las credenciales del archivo JSON
const creds = require("./fish-stock-management-1ebfe78ac9e4.json");
const SPREADSHEET_ID = "1O_yzv_NT5XKMrUE4SvjaflQoIFAA2zgts4Qxgffhmmw";

// Crear una instancia de autenticación JWT globalmente
const serviceAccountAuth = new JWT({
  email: creds.client_email,
  key: creds.private_key.replace(/\\n/g, "\n"), // Reemplazar saltos de línea
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

async function accessSpreadsheet() {
  try {
    // Crear una instancia de GoogleSpreadsheet con la autenticación inyectada
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo(); // Cargar la información de la hoja de cálculo
    return doc;
  } catch (error) {
    console.error("Error accediendo a la hoja de cálculo:", error);
  }
}

// Middleware para procesar JSON
app.use(bodyParser.json());

// Puerto donde correrá el servidor
const PORT = process.env.PORT || 3000;

// Ruta básica para probar que el servidor está funcionando
app.get("/", (req, res) => {
  res.send("Backend funcionando!");
});

// Ruta para obtener información de un pez por referencia
app.get("/getFishInfo/:reference", async (req, res) => {
  const reference = req.params.reference;
  console.log(`Referencia recibida del frontend: ${reference}`);

  try {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0]; // Primera hoja
    const rows = await sheet.getRows();

    // Verificar cuántas filas está obteniendo de la hoja
    console.log(`Total de filas obtenidas: ${rows.length}`);

    // Añadir un log para cada fila obtenida
    rows.forEach((row, index) => {
      console.log(`Fila ${index + 1}:`, row._rawData); // Muestra los datos sin procesar de la fila
    });

    // Buscar la fila correspondiente a la referencia escaneada (usamos índice 0 para el Código QR)
    const row = rows.find((r) => r._rawData[0].trim() === reference.trim());

    if (row) {
      console.log(
        `Fila encontrada para referencia ${reference}: ${JSON.stringify(
          row._rawData
        )}`
      );
      res.json({
        reference: row._rawData[0], // Código QR
        fishReference: row._rawData[1], // Referencia (Pez)
        tank: row._rawData[2], // Tanque
        stock: row._rawData[3], // Stock
      });
    } else {
      console.log("No se encontró la referencia en la hoja");
      res.status(404).send("No se encontró la referencia");
    }
  } catch (error) {
    console.error("Error obteniendo los datos:", error);
    res.status(500).send("Error al obtener los datos");
  }
});

// Servidor escuchando en el puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

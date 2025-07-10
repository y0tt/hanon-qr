const express = require("express");
const app = express();
const path = require("path");

// Configura EJS y carpeta pública
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  const orderId = "ABC123";
  const name = "Gustavo";
  const amount = 9234912.83;
  const qrData = "https://vercel.com"; // Puedes cambiarlo luego

  res.render("index", { qrData, amount, orderId, name });
});

// Exporta como función para Vercel
module.exports = app;

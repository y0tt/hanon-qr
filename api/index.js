import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { renderFile } from "ejs";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar EJS
app.engine("ejs", renderFile);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  const { amount = 0, order = "ABC123", name = "Cliente" } = req.query;
  const amountFormatted = parseFloat(amount).toFixed(2);
  const qrData = `https://hanon.io/pagar?monto=${amountFormatted}`; // o lo que tú quieras que contenga el QR

  res.render("index", {
    qrData,
    amount: amountFormatted,
    order,
    name
  });
});

export default app;

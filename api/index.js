import path from "path";
import { fileURLToPath } from "url";
import { renderFile } from "ejs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  try {
    const { amount = 0, order = "ABC123", name = "Cliente" } = req.query;
    const amountFormatted = parseFloat(amount).toFixed(2);
    const qrData = `https://hanon.io/pagar?monto=${amountFormatted}`;

    const viewPath = path.join(__dirname, "../views/index.ejs");

    renderFile(
      viewPath,
      { qrData, amount: amountFormatted, order, name },
      (err, html) => {
        if (err) {
          res.status(500).send("Error rendering EJS: " + err.toString());
        } else {
          res.setHeader("Content-Type", "text/html");
          res.status(200).send(html);
        }
      }
    );
  } catch (err) {
    res.status(500).send("Server Error: " + err.toString());
  }
}

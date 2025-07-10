const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");

async function getUSDT_BOB_P2P() {
  const body = {
    page: 1,
    rows: 5,
    payTypes: [],
    asset: "USDT",
    tradeType: "SELL",
    fiat: "BOB"
  };

  try {
    const { data } = await axios.post(
      "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search",
      body,
      { headers: { "Content-Type": "application/json" } }
    );

    const rates = data.data.map(ad => parseFloat(ad.adv.price));
    const avg = rates.reduce((a, b) => a + b, 0) / rates.length;
    return avg;
  } catch (err) {
    console.error("Error al obtener tasa de Binance P2P:", err.message);
    return null;
  }
}

app.get("/qr", async (req, res) => {
  const { order, monto, nombre } = req.query;
  if (!monto || !order) return res.send("Faltan parámetros");

  const rate = await getUSDT_BOB_P2P();
  if (!rate) return res.send("Error al obtener tipo de cambio");

  const montoBOB = (parseFloat(monto) * rate).toFixed(2);
  const qrLink = `https://pago.ejemplo.com/?orden=${order}&monto=${montoBOB}`;
  res.render("index", { nombre, order, montoBOB, qrLink });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const QRCode = require("qrcode");

module.exports = async (req, res) => {
  const { amount = "100", order = "ORD123", name = "Gustavo" } = req.query;

  const qrText = `Pago de ${amount} BOB para el pedido ${order} de ${name}`;

  try {
    const qrImage = await QRCode.toDataURL(qrText);
    const img = Buffer.from(qrImage.split(",")[1], "base64");

    res.setHeader("Content-Type", "image/png");
    res.send(img);
  } catch (err) {
    res.status(500).send("Error generando el código QR");
  }
};

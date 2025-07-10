// Este endpoint sirve el JavaScript que inyectaremos en Shopify
app.get('/loader.js', (req, res) => {
    const orderId = req.query.order_id || 'UNKNOWN';
  
    // Genera QR apuntando a tu backend con el ID real del pedido
    const qrUrl = `https://hanon-qr.vercel.app/api?order_id=${orderId}`;
  
    res.setHeader('Content-Type', 'application/javascript');
    res.send(`
      (function() {
        const qr = document.createElement('img');
        qr.src = '${qrUrl}';
        qr.style.maxWidth = '300px';
        qr.style.margin = '20px auto';
        qr.style.display = 'block';
        document.body.appendChild(qr);
      })();
    `);
  });
  
export default function handler(req, res) {
  res.setHeader("Content-Type", "application/javascript");
  res.send(`
    window.addEventListener("load", function () {
      const currentURL = window.location.href;
      if (currentURL.includes("/checkouts/") && currentURL.includes("/thank_you")) {
        const orderId = window.Shopify?.checkout?.order_id;
        if (orderId) {
          window.location.href = \`https://hanon-qr.vercel.app/api?order_id=\${orderId}\`;
        }
      }
    });
  `);
}

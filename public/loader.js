window.addEventListener("DOMContentLoaded", function () {
    const orderNumber = Shopify.checkout.order_id;
    const customerName = Shopify.checkout.customer.first_name;
    const total = Shopify.checkout.total_price;
  
    const url = `https://hanon-qr.vercel.app/api?amount=${total}&order=${orderNumber}&name=${customerName}`;
  
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.style = "width:300px;height:300px;border:none;margin-top:20px;";
  
    const container = document.querySelector(".os-order-number"); // donde insertar
    if (container) {
      container.parentNode.insertBefore(iframe, container.nextSibling);
    }
  });
  
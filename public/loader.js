window.addEventListener("DOMContentLoaded", () => {
    const amount = 189.90;
    const order = "ABC123";
    const name = "Gustavo";
  
    const img = document.createElement("img");
    img.src = `https://TUAPP.vercel.app/api?amount=${amount}&order=${order}&name=${name}`;
    img.style = "display:block;margin:40px auto;width:250px";
  
    document.body.appendChild(img);
  });
  
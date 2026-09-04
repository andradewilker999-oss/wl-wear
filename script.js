const products=[
{id:1,name:"Camiseta Polo ",category:"Camisetas",price:100.00,badge:"NOVO"},
{id:2,name:"Camiseta Hugo Boss Branca",category:"Camisetas",price:119.90,badge:"NOVO"},
{id:3,name:"Juliete",category:"Óculos",price:189.90,badge:"NOVO"},
{id:4,name:"Calça Cargo Preta",category:"Calças",price:169.90,badge:"-15%"},
{id:6,name:"Tênis ",category:"Tênis",price:139.90,badge:"NOVO"},

{id:9,name:"Shoulder Bag W&L",category:"Acessórios",price:79.90,badge:""},
{id:10,name:"Camiseta Logo W&L",category:"Camisetas",price:124.90,badge:""}];

let cart=JSON.parse(localStorage.getItem("wl_cart")||"[]"), filter="";
const money=n=>n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
function renderProducts(){
 const grid=document.getElementById("productGrid");
 const q=(document.getElementById("searchInput")?.value||"").toLowerCase();
 const list=products.filter(p=>(!filter||p.category===filter)&&p.name.toLowerCase().includes(q));
 grid.innerHTML=list.map(p=>`<article class="product"><span class="badge">${p.badge||"W&L"}</span><div class="product-image" role="img" aria-label="${p.name}"></div><h3>${p.name}</h3><div class="price">${money(p.price)}</div><div class="installment">6x de ${money(p.price/6)}</div><button onclick="addToCart(${p.id})">ADICIONAR AO CARRINHO</button></article>`).join("");
}
function addToCart(id){const p=products.find(x=>x.id===id);cart.push(p);saveCart();openCart()}
function removeCart(i){cart.splice(i,1);saveCart()}
function saveCart(){localStorage.setItem("wl_cart",JSON.stringify(cart));renderCart()}
function renderCart(){
 document.getElementById("cartCount").textContent=cart.length;
 const box=document.getElementById("cartItems");
 box.innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-row"><div><strong>${p.name}</strong><div>${money(p.price)}</div></div><button onclick="removeCart(${i})">✕</button></div>`).join(""):"<p>Seu carrinho está vazio.</p>";
 document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price,0));
}
function openCart(){document.getElementById("cartPanel").classList.add("open");document.getElementById("backdrop").classList.remove("hidden")}
function closeCart(){document.getElementById("cartPanel").classList.remove("open");document.getElementById("backdrop").classList.add("hidden")}
document.querySelectorAll(".category").forEach(b=>b.onclick=()=>{filter=b.dataset.filter;renderProducts();document.getElementById("produtos").scrollIntoView()});
document.getElementById("clearFilter").onclick=()=>{filter="";renderProducts()};
document.getElementById("cartBtn").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;document.getElementById("backdrop").onclick=closeCart;
document.getElementById("searchBtn").onclick=()=>{document.getElementById("searchPanel").classList.remove("hidden");document.getElementById("searchInput").focus()};
document.querySelector("[data-close]").onclick=()=>document.getElementById("searchPanel").classList.add("hidden");
document.getElementById("searchInput").addEventListener("input",renderProducts);
document.getElementById("newsletter").onsubmit=e=>{e.preventDefault();alert("Cadastro realizado!");e.target.reset()};
document.getElementById("checkout").onclick=()=>{
  if(!cart.length){
    alert("Adicione um produto ao carrinho.");
    return;
  }

  const chavePix="61992823440";
  const telefoneWhatsApp="61994379523";
  const total=cart.reduce((s,p)=>s+p.price,0);

  const itens=cart.map(p=>
    `<div class="checkout-item">
      <span>${p.name}</span>
      <strong>${money(p.price)}</strong>
    </div>`
  ).join("");

  const checkoutBox=document.createElement("div");

  checkoutBox.id="checkoutModal";

  checkoutBox.innerHTML=`
    <div class="checkout-overlay"></div>

    <div class="checkout-card">

      <button class="checkout-close">×</button>

      <p class="checkout-label">W&L WEAR</p>
      <h2>Finalizar pedido</h2>

      <div class="checkout-section">
        <h3>Seu pedido</h3>
        ${itens}

        <div class="checkout-total">
          <span>Total</span>
          <strong>${money(total)}</strong>
        </div>
      </div>

      <div class="checkout-section pix-section">
        <h3>Pagamento via Pix</h3>

        <p>Copie a chave Pix abaixo e faça o pagamento.</p>

        <div class="pix-box">
          <span id="pixKey">${chavePix}</span>
          <button id="copyPix">COPIAR PIX</button>
        </div>
      </div>

      <button id="sendWhatsApp" class="checkout-whatsapp">
        ENVIAR PEDIDO PELO WHATSAPP
      </button>

      <p class="checkout-note">
        Após realizar o pagamento, envie o comprovante pelo WhatsApp.
      </p>

    </div>
  `;

  document.body.appendChild(checkoutBox);

  document.getElementById("copyPix").onclick=()=>{
    navigator.clipboard.writeText(chavePix);

    document.getElementById("copyPix").textContent="PIX COPIADO ✓";

    setTimeout(()=>{
      document.getElementById("copyPix").textContent="COPIAR PIX";
    },2000);
  };

  document.querySelector(".checkout-close").onclick=()=>{
    checkoutBox.remove();
  };

  document.querySelector(".checkout-overlay").onclick=()=>{
    checkoutBox.remove();
  };

  document.getElementById("sendWhatsApp").onclick=()=>{

    const mensagem=
      "Olá! Quero finalizar meu pedido na W&L Wear.%0A%0A"+
      "Total: "+money(total)+"%0A%0A"+
      "Produtos:%0A"+
      cart.map(p=>"- "+p.name+" - "+money(p.price)).join("%0A")+
      "%0A%0AVou realizar o pagamento via Pix e enviar o comprovante.";

    window.open(
      "https://wa.me/"+telefoneWhatsApp+"?text="+mensagem,
      "_blank"
    );
  };
};

renderProducts();
renderCart();

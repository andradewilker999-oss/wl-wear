const products=[
{id:1,name:"Camiseta Polo W&L Preta",category:"Camisetas",price:100,badge:"NOVO"},
{id:2,name:"Camiseta Hugo Boss Branca",category:"Camisetas",price:119.90,badge:"NOVO"},
{id:3,name:"Camiseta Logo W&L",category:"Camisetas",price:124.90,badge:"BEST"},
{id:4,name:"Camiseta Oversized Preta",category:"Camisetas",price:129.90,badge:"NOVO"},
{id:5,name:"Calça Cargo Preta",category:"Calças",price:169.90,badge:"-15%"},
{id:6,name:"Calça Wide Leg Preta",category:"Calças",price:179.90,badge:""},
{id:7,name:"Bermuda Cargo Preta",category:"Bermudas",price:119.90,badge:"NOVO"},
{id:8,name:"Bermuda Moletom Cinza",category:"Bermudas",price:99.90,badge:""},
{id:9,name:"Tênis Urban W&L",category:"Tênis",price:139.90,badge:"NOVO"},
{id:10,name:"Tênis Street Black",category:"Tênis",price:159.90,badge:""},
{id:11,name:"Shoulder Bag W&L",category:"Acessórios",price:79.90,badge:""},
{id:12,name:"Boné W&L Preto",category:"Acessórios",price:89.90,badge:"NOVO"}];
let cart=JSON.parse(localStorage.getItem("wl_cart")||"[]"),filter="";
const money=n=>n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
function renderProducts(){const grid=document.getElementById("productGrid"),q=(document.getElementById("searchInput")?.value||"").toLowerCase().trim();
const list=products.filter(p=>(!filter||p.category===filter)&&p.name.toLowerCase().includes(q));
grid.innerHTML=list.length?list.map(p=>`<article class="product"><span class="badge">${p.badge||"W&L"}</span><div class="productImage" role="img" aria-label="${p.name}"></div><h3>${p.name}</h3><div class="price">${money(p.price)}</div><div class="installment">6x de ${money(p.price/6)}</div><button onclick="addToCart(${p.id})">ADICIONAR AO CARRINHO</button></article>`).join(""):"<p>Nenhum produto encontrado.</p>"}
function addToCart(id){const p=products.find(x=>x.id===id);if(p){cart.push(p);saveCart();openCart()}}
function removeCart(i){cart.splice(i,1);saveCart()}
function saveCart(){localStorage.setItem("wl_cart",JSON.stringify(cart));renderCart()}
function renderCart(){document.getElementById("cartCount").textContent=cart.length;document.getElementById("cartItems").innerHTML=cart.length?cart.map((p,i)=>`<div class="cartRow"><div><strong>${p.name}</strong><div>${money(p.price)}</div></div><button onclick="removeCart(${i})">✕</button></div>`).join(""):"<p>Seu carrinho está vazio.</p>";document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price,0))}
function openCart(){document.getElementById("cartPanel").classList.add("open");document.getElementById("backdrop").classList.remove("hidden")}
function closeCart(){document.getElementById("cartPanel").classList.remove("open");document.getElementById("backdrop").classList.add("hidden")}
document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{filter=b.dataset.filter||"";document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===filter));renderProducts();document.getElementById("produtos").scrollIntoView({behavior:"smooth"})});
document.getElementById("cartBtn").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;document.getElementById("backdrop").onclick=closeCart;
document.getElementById("searchBtn").onclick=()=>{document.getElementById("searchPanel").classList.remove("hidden");document.getElementById("searchInput").focus()};
document.getElementById("closeSearch").onclick=()=>document.getElementById("searchPanel").classList.add("hidden");
document.getElementById("searchInput").oninput=renderProducts;
document.getElementById("newsletter").onsubmit=e=>{e.preventDefault();alert("Cadastro realizado! 🚀");e.target.reset()};
document.getElementById("checkout").onclick=()=>{if(!cart.length)return alert("Adicione um produto ao carrinho.");alert("O carrinho está funcionando. Agora falta configurar o checkout e o pagamento seguro para vender de verdade.")};
document.getElementById("menuBtn").onclick=()=>{const n=document.querySelector(".nav");n.style.display=n.style.display==="flex"?"":"flex";if(n.style.display==="flex"){n.style.position="absolute";n.style.top="82px";n.style.left=0;n.style.right=0;n.style.background="#090909";n.style.flexDirection="column";n.style.padding="25px"}};
renderProducts();renderCart();
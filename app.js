const products = [
  {
    id: 1,
    name: "Нон",
    price: 5,
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec"
  },
  {
    id: 2,
    name: "Шир",
    price: 10,
    image: "https://smorgonmilk.by/bel/praduktsyya/item/2043-malako-paster-m-d-t-2-5-p-et-paket"
  },
  {
    id: 3,
    name: "Шакар 1кг",
    price: 8,
    image: "https://www.bbc.com/russian/features-50417397"
  },
  {
    id: 4,
    name: "Орд",
    price: 45,
    image: "https://fatir.tj/product-category/perviy-sort/"
  },
   {
    id: 4,
    name: "Рафған",
    price: 45,
    image: "https://images.unsplash.com/photo-1627482266972-29d98a16c85d"
  },
   {
    id: 4,
    name: "Маска",
    price: 45,
    image: "https://images.unsplash.com/photo-1627482266972-29d98a16c85d"
  },
   {
    id: 4,
    name: "Картошка",
    price: 45,
    image: "https://images.unsplash.com/photo-1627482266972-29d98a16c85d"
  },
   {
    id: 4,
    name: "Себ",
    price: 45,
    image: "https://images.unsplash.com/photo-1627482266972-29d98a16c85d"
  },
   {
    id: 4,
    name: "Банан",
    price: 45,
    image: "https://images.unsplash.com/photo-1627482266972-29d98a16c85d"
  },
   {
    id: 4,
    name: "Оби сиёма",
    price: 45,
    image: "https://images.unsplash.com/photo-1627482266972-29d98a16c85d"
  }
];

let cart = [];

const productsEl = document.getElementById("products");
const cartEl = document.getElementById("cartItems");
const totalEl = document.getElementById("totalPrice");

/* Render products */
products.forEach(p => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <div class="product-content">
      <h3>${p.name}</h3>
      <span>${p.price} сомонӣ</span>
      <button class="btn btn-primary" onclick="addToCart(${p.id})">
        Ба карзина
      </button>
    </div>
  `;
  productsEl.appendChild(div);
});

function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) item.qty++;
  else {
    const p = products.find(p => p.id === id);
    cart.push({ ...p, qty: 1 });
  }
  renderCart();
}

function renderCart() {
  cartEl.innerHTML = "";
  let total = 0;

  cart.forEach(i => {
    total += i.price * i.qty;
    cartEl.innerHTML += `
      <div class="cart-item">
        <span>${i.name} × ${i.qty}</span>
        <strong>${i.price * i.qty}</strong>
      </div>
    `;
  });

  totalEl.textContent = total + " сомонӣ";
}

function sendOrder() {
  if (!cart.length) {
    alert("Карзина холӣ аст");
    return;
  }

  const order = {
    items: cart,
    total: totalEl.textContent,
    created_at: new Date().toISOString()
  };

  if (window.Telegram?.WebApp) {
    Telegram.WebApp.sendData(JSON.stringify(order));
  } else {
    console.log(order);
    alert("Заказ ирсол шуд (test)");
  }

  cart = [];
  renderCart();
}

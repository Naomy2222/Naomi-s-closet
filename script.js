// =========================
// 🛒 CLOTHING SHOP CART SCRIPT
// =========================

// ---- GLOBAL VARIABLES ----
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ---- SELECTORS ----
const cartSidebar = document.querySelector(".cart-sidebar");
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotalElement = document.querySelector(".cart-total");
const cartCountElement = document.querySelector(".cart-count");

// ---- SAVE CART ----
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ---- ADD TO CART ----
function addToCart(id, name, price, image) {
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }

  saveCart();
  displayCart();
}

// ---- REMOVE ITEM ----
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
}

// ---- UPDATE QUANTITY ----
function updateQuantity(index, newQty) {
  if (newQty <= 0) {
    removeItem(index);
  } else {
    cart[index].quantity = newQty;
    saveCart();
    displayCart();
  }
}

// ---- DISPLAY CART ----
function displayCart() {
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)}</p>
        <div class="quantity-control">
          <button class="qty-btn" onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
        </div>
        <p class="item-total"><strong>$${itemTotal.toFixed(2)}</strong></p>
      </div>
      <button class="remove-item" onclick="removeItem(${index})">🗑</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  if (cartTotalElement) {
    cartTotalElement.textContent = `$${total.toFixed(2)};`
  }

  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }
}

// ---- TOGGLE CART SIDEBAR ----
function toggleCart() {
  cartSidebar.classList.toggle("open");
}

// ---- CHECKOUT ----
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("✅ Thank you for your purchase!");
  localStorage.removeItem("cart");
  cart = [];
  displayCart();

  // Optionally redirect:
  // window.location.href = "checkout.html";
}

// ---- LOAD CART ON PAGE START ----
window.addEventListener("DOMContentLoaded", () => {
  displayCart();
});
// Select all the "Add to Cart" buttons
const cartButtons = document.querySelectorAll(".add-to-cart");

// When a button is clicked
cartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const productCard = button.parentElement;
    const product = {
      name: productCard.getAttribute("data-name"),
      price: parseFloat(productCard.getAttribute("data-price")),
      image: productCard.getAttribute("data-image"),
      quantity: 1
    };

    // Get cart from localStorage or create new one
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item already in cart
    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(product);
    }

    // Save cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert (`${product.name} added to cart 🛒`);
  });
});
// CART PAGE LOGIC
if (window.location.pathname.includes("cart.html")) {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function displayCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty 🛍</p>";
      totalPriceElement.textContent = "0";
      return;
    }

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>KSh ${item.price} x ${item.quantity}</p>
        </div>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;
      cartItemsContainer.appendChild(div);
    });

    totalPriceElement.textContent = total;
    addRemoveListeners();
  }

  function addRemoveListeners() {
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
      });
    });
  }

  document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Checkout successful! 🎉");
    localStorage.removeItem("cart");
    displayCart();
  });

  displayCart();
}
// CHECKOUT PAGE LOGIC
if (window.location.pathname.includes("checkout.html")) {
  const orderSummary = document.getElementById("order-summary");
  const totalElement = document.getElementById("checkout-total");
  const checkoutForm = document.getElementById("checkout-form");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function displayOrderSummary() {
    orderSummary.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      orderSummary.innerHTML = "<p>Your cart is empty 🛒</p>";
      totalElement.textContent = "0";
      return;
    }

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const p = document.createElement("p");
      p.textContent = `${item.name} x ${item.quantity} — KSh ${itemTotal};`
      orderSummary.appendChild(p);
    });

    totalElement.textContent = total;
  }

  checkoutForm.addEventListener("submit", e => {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const payment = document.getElementById("payment").value;

  if (!name || !email || !address || !payment) {
    alert("Please fill in all details.");
    return;
  }

  localStorage.removeItem("cart");
  window.location.href = "confirmation.html";
});

  displayOrderSummary();
}
// Back to cart button
const backBtn = document.getElementById("back-to-cart-btn");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.location.href = "cart.html";
  });
}

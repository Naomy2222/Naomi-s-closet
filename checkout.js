document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const checkoutItems = document.getElementById('checkout-items');
  const checkoutTotal = document.getElementById('checkout-total');
  const form = document.getElementById('checkout-form');

  if (cart.length === 0) {
    checkoutItems.innerHTML = '<p>Your cart is empty 😕</p>';
    checkoutTotal.textContent = '';
    return;
  }

  // Display cart items
  let total = 0;
  checkoutItems.innerHTML = '';
  cart.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <span>KSh ${(item.price * item.quantity).toLocaleString()}</span>
    `;
    checkoutItems.appendChild(div);
    total += item.price * item.quantity;
  });

  checkoutTotal.textContent = Total= KSh `${total.toLocaleString()};`

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('🎉 Thank you for your order!');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
  });
});

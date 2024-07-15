const cart = [];
let total = 0;

function handleAddToCart(title, price) {
  cart.push({ title, price });
  total += price;
  document.getElementById('cart-count').innerText = cart.length;
}

function handleCartPress() {
  const cartModal = document.getElementById('cart-modal');
  const cartItems = document.getElementById('cart-items');
  const totalText = document.getElementById('total-text');

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span>${item.title}</span>
      <span>R$ ${item.price.toFixed(2)}</span>
    </div>
  `).join('');

  totalText.innerText = `Total: R$ ${total.toFixed(2)}`;
  cartModal.style.display = 'flex';
}

function handleCloseCart() {
  const cartModal = document.getElementById('cart-modal');
  cart.length = 0;
  total = 0;
  document.getElementById('cart-count').innerText = cart.length;
  cartModal.style.display = 'none';
}

function handleCloseOrder() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const customerName = document.getElementById('customer-name').value.trim();
  if (!customerName) {
    alert("Por favor, insira o nome do cliente.");
    return;
  }

  const message = `Olá! Gostaria de fazer o pedido para ${customerName}:\n\n${cart.map(item => `${item.title} - R$ ${item.price.toFixed(2)}`).join('\n')}\n\nTotal: R$ ${total.toFixed(2)}`;
  const phoneNumber = '63991293427';
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, '_blank');

  handleCloseCart();
}

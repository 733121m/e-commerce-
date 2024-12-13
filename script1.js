// Shared Cart Logic
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to Cart (Product Page)
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const product = e.target.closest('.product');
    const id = product.dataset.id;
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);

    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
  });
});

// Render Cart Items (Cart Page)
if (document.getElementById('cart-items')) {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalElement = document.getElementById('total');

  const renderCart = () => {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>
          <button class="decrease" data-index="${index}">-</button>
          ${item.quantity}
          <button class="increase" data-index="${index}">+</button>
        </td>
        <td>${subtotal.toFixed(2)}</td>
        <td><button class="remove" data-index="${index}">Remove</button></td>
      `;
      cartItemsContainer.appendChild(row);
    });

    totalElement.textContent = total.toFixed(2);

    document.querySelectorAll('.increase').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        cart[index].quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });

    document.querySelectorAll('.decrease').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });

    document.querySelectorAll('.remove').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });
  };

  renderCart();
}

// Cart Array & State
let cart = [];

// Toggle Cart Drawer
function toggleCart() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('overlay');
    drawer.classList.toggle('open');
    overlay.classList.toggle('active');
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Select Product Size
function selectSize(element) {
    const parent = element.parentElement;
    parent.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
}

// Add Item to Cart
function addToCart(name, price, button) {
    const card = button.closest('.product-card');
    const selectedSizeEl = card.querySelector('.size-option.selected');
    const size = selectedSizeEl ? selectedSizeEl.innerText : 'OS';

    // Check if item with same size already exists
    const existingItem = cart.find(item => item.name === name && item.size === size);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, size, quantity: 1 });
    }

    updateCartUI();
    showToast(`${name} (${size}) added to bag`);
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Update Cart UI & Badge
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cartTotal');

    let totalCount = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-text">Your bag is currently empty.</p>`;
    } else {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            totalCount += item.quantity;
            totalPrice += item.price * item.quantity;

            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <strong>${item.name}</strong>
                        <span>Size: ${item.size} | Qty: ${item.quantity}</span>
                        <p>$${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
        });
    }

    cartCount.innerText = totalCount;
    cartTotal.innerText = `$${totalPrice.toFixed(2)}`;
}

// Filter Products
function filterProducts(category, btn) {
    // Update active button state
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Show Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// Checkout action (cleaned from simulations)
function checkout() {
    if (cart.length === 0) {
        showToast('Your bag is empty.');
        return;
    }
    showToast('Order placed successfully.');
    cart = [];
    updateCartUI();
    toggleCart();
}

// Newsletter Subscription Handler
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    showToast('Successfully subscribed to inner circle.');
    document.getElementById('newsletterEmail').value = '';
}
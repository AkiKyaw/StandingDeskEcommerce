let cartCount = 0;
let cartTotal = 0;

function addToCart(itemName, itemPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;

    let cartCount = cart.length + 1;
    document.getElementById('cartCount').textContent = cartCount;
    document.getElementById('cartCountMobile').textContent = cartCount;


    cart.push({ name: itemName, price: itemPrice });
    localStorage.setItem('cart', JSON.stringify(cart));

    cartTotal += itemPrice;
    localStorage.setItem('cartTotal', cartTotal.toFixed(2));
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;

    cartTotal -= cart[index].price;
    localStorage.setItem('cartTotal', cartTotal.toFixed(2));

    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));

    document.getElementById('cartCount').textContent = cart.length;
    document.getElementById('cartCountMobile').textContent = cart.length;
    

    loadCart();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cartCount').textContent = cart.length;
    document.getElementById('cartCountMobile').textContent = cart.length;

}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;

    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
        <div class="cart-item-row">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <div class="cart-item-remove">
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        </div>
`;

        cartList.appendChild(cartItem);
    });

    document.getElementById('cartTotal').textContent = `Total : $${cartTotal.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', loadCart);

document.addEventListener('DOMContentLoaded', updateCartCount);

function clearCart() {
    localStorage.removeItem('cart');
    localStorage.removeItem('cartTotal');

    document.getElementById('cartCount').textContent = 0;
    document.getElementById('cartCountMobile').textContent = 0;
    document.getElementById('cartTotal').textContent = `Total : $0.00`;

    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';
}

function completePurchase() {
    clearCart();

    alert('Purchase completed! Your cart has been cleared.');
}
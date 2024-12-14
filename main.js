document.addEventListener('DOMContentLoaded', (event) => {
    loadCart();
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
});

function addToCart(event) {
    const button = event.target;
    const name = button.getAttribute('data-name');
    const price = button.getAttribute('data-price');

    simulateServerRequest(name, price)
        .then((product) => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        })
        .catch((error) => {
            console.error('Error adding product to cart:', error);
        });
}

function simulateServerRequest(name, price) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) {
                resolve({ name, price });
            } else {
                reject('Failed to add product');
            }
        }, 1000);
    });
}

function loadCart() {
    const cartItems = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.innerHTML = '';
    cart.forEach(item => {
        cartItems.innerHTML += `<div class="card mb-2">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">Precio: $${item.price}</p>
            </div>
        </div>`;
    });
}

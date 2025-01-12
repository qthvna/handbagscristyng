// Initialize cart only if it's not already set
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Function to add item to the cart
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: productName, price: parseFloat(productPrice) });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} added to cart!`);
}

// Update the cart count in the navbar
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cartCount').textContent = cart.length;
}

// Display cart items on the cart page
function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById('cartItems');
    let totalAmount = 0;
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
    } else {
        cartItems.forEach((item, index) => {
            let itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <p>${item.name} - RM ${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartContainer.appendChild(itemDiv);
            totalAmount += item.price;
        });
        document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
    }

    // Disable checkout if cart is empty
    document.getElementById('checkoutButton').disabled = cartItems.length === 0;
}

// Remove an item from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Refresh the cart display
    updateCartCount(); // Update cart count in the navbar
}

// Checkout function
function checkout() {
    if (confirm('Are you sure you want to checkout?')) {
        localStorage.removeItem('cart'); // Clear the cart
        alert("Thank you for your purchase!");
        window.location.href = 'order-successful.html'; // Redirect to a success page
    }
}

// Call updateCartCount on page load to ensure the count is accurate
window.onload = updateCartCount;

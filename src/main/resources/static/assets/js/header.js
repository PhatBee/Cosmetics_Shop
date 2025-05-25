function updateCartCount(count) {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

// Initial call to update cart count (example)
document.addEventListener("DOMContentLoaded", function() {
    updateCartCount(0);
});
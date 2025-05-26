document.addEventListener("DOMContentLoaded", function () {
    // Cập nhật số lượng giỏ hàng
    function updateCartCount(count) {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = count;
        }
    }

    const logoutLink = document.getElementById('logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', function (event) {
            event.preventDefault(); // Ngăn hành động mặc định của thẻ <a>
            document.getElementById('logoutForm').submit(); // Submit form ngay lập tức
        });
    }

    // Gọi hàm khởi tạo
    updateCartCount(0);
});
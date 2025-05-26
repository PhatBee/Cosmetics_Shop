document.addEventListener("DOMContentLoaded", function () {
    // Hàm định dạng giá
    function formatPrice() {
        const priceElements = document.querySelectorAll('.formatted-price');
        priceElements.forEach(function (element) {
            let price = parseFloat(element.textContent);
            if (!isNaN(price)) {
                element.textContent = price.toLocaleString('vi-VN');
            }
        });
    }

    // Gọi hàm định dạng giá khi trang tải
    formatPrice();

    // Xử lý sự kiện xác nhận cho các hành động (xoá, kích hoạt, vô hiệu)
    document.querySelectorAll('.delete-btn, .activate-btn, .disable-btn').forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // Ngăn hành động mặc định của thẻ <a>
            const action = button.getAttribute('data-action');
            const id = button.getAttribute('data-id');
            let message = '';

            switch (action) {
                case 'delete':
                    message = 'Bạn có chắc chắn muốn xoá sản phẩm này không?';
                    break;
                case 'activate':
                    message = 'Bạn có muốn kích hoạt lại sản phẩm này không?';
                    break;
                case 'disable':
                    message = 'Bạn có muốn vô hiệu sản phẩm này không?';
                    break;
            }

            if (confirm(message)) {
                window.location.href = button.getAttribute('href'); // Chuyển hướng nếu xác nhận
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // Lấy CSRF token và header từ meta tags
    const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');
    const csrfHeader = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');

    // Thiết lập CSRF token cho tất cả AJAX requests
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader(csrfHeader, csrfToken);
        }
    });

    // Hàm định dạng giá
    function formatPrice(price) {
        return price.toLocaleString('vi-VN');
    }

    // Định dạng giá khi tải trang
    document.querySelectorAll('.card .card-text strong').forEach(function (priceElement) {
        var priceText = priceElement.innerText.replace('đ', '').trim();
        var price = parseInt(priceText.replace(/,/g, ''));
        if (!isNaN(price)) {
            priceElement.innerText = formatPrice(price) + ' đ';
        }
    });

    // Xử lý thêm vào giỏ hàng
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productCode = this.getAttribute('data-product-code');
            $.ajax({
                url: '/customer/cart/add-to-cart',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    productCode: productCode,
                    quantity: 1
                }),
                success: function (response) {
                    if (response.indexOf('loginForm') > 0) {
                        window.location.href = '/auth/login';
                    } else {
                        alert(response);
                    }
                },
                error: function (xhr, status, error) {
                    alert(xhr.responseText);
                }
            });
        });
    });
});
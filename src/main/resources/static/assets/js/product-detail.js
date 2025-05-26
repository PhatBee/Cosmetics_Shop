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

    // Lấy productCode từ data attribute
    const addToCartButton = document.getElementById('add-cart');
    const productCode = addToCartButton ? addToCartButton.getAttribute('data-product-code') : '';

    // Thêm sự kiện cho nút "Thêm vào giỏ hàng"
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function () {
            $.ajax({
                url: '/customer/cart/add-to-cart',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    productCode: productCode,
                    quantity: document.getElementById('inputQuantity').value
                }),
                success: function (response) {
                    if (response.indexOf('loginForm') > 0) {
                        window.location.href = '/auth/login';
                    } else {
                        alert(response);
                    }
                },
                error: function (xhr, status, error) {
                    if (xhr.status === 403) {
                        alert('Lỗi CSRF: Vui lòng tải lại trang và thử lại.');
                        location.reload();
                    } else {
                        alert(xhr.responseText || 'Có lỗi xảy ra, vui lòng thử lại.');
                    }
                }
            });
        });
    }

    // Thêm sự kiện cho nút "Mua ngay"
    const buyNowButtons = document.querySelectorAll('.buy-now');
    buyNowButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productCode = this.getAttribute('data-product-code');
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '/customer/order/preview-checkout';

            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'productCode';
            input.value = productCode;
            form.appendChild(input);

            const quantity = document.getElementById('inputQuantity').value;
            const inputQuantity = document.createElement('input');
            inputQuantity.type = 'hidden';
            inputQuantity.name = 'quantity';
            inputQuantity.value = quantity;
            form.appendChild(inputQuantity);


            const csrfInput = document.createElement('input');
            csrfInput.type = 'hidden';
            csrfInput.name = '_csrf'; // Spring Security expects this name for form submissions
            csrfInput.value = csrfToken;
            form.appendChild(csrfInput);

            document.body.appendChild(form);
            form.submit();
        });
    });

    // Định dạng giá sản phẩm
    const priceElement = document.getElementById('product-price');
    if (priceElement) {
        const rawPrice = priceElement.getAttribute('data-price');
        const formattedPrice = new Intl.NumberFormat('vi-VN').format(rawPrice);
        priceElement.innerText = formattedPrice + ' đ';
    }

    // Kiểm tra CSRF token có tồn tại không
    if (!csrfToken || !csrfHeader) {
        console.warn('CSRF token hoặc header không được tìm thấy. Các AJAX request có thể bị lỗi.');
    }
});
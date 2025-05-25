document.addEventListener('DOMContentLoaded', function () {
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
                    alert(xhr.responseText);
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
});
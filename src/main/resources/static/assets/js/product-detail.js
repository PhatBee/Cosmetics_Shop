document.addEventListener('DOMContentLoaded', function () {
    // Hàm định dạng giá
    const priceElement = document.getElementById('product-price');
    const rawPrice = /*[[${product.cost}]]*/ null; // Thay bằng giá trị từ server
    if (priceElement && rawPrice !== null) {
        const formattedPrice = new Intl.NumberFormat('vi-VN').format(rawPrice);
        priceElement.innerText = formattedPrice + ' đ';
    }

    // Hàm thêm vào giỏ hàng
    const addToCartButton = document.getElementById('add-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function () {
            const productCode = /*[[${product.productCode}]]*/ null; // Thay bằng mã sản phẩm từ server
            const quantity = document.getElementById('inputQuantity').value || 1;
            $.ajax({
                url: '/customer/cart/add-to-cart',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    productCode: productCode,
                    quantity: quantity
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

    // Hàm mua ngay
    document.querySelectorAll('.btn-success[type="button"]').forEach(button => {
        if (!button.disabled) {
            button.addEventListener('click', function () {
                const productCode = /*[[${product.productCode}]]*/ null; // Thay bằng mã sản phẩm từ server
                const quantity = document.getElementById('inputQuantity').value || 1;
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = '/customer/order/preview-checkout';
                const inputCode = document.createElement('input');
                inputCode.type = 'hidden';
                inputCode.name = 'productCode';
                inputCode.value = productCode;
                form.appendChild(inputCode);
                const inputQuantity = document.createElement('input');
                inputQuantity.type = 'hidden';
                inputQuantity.name = 'quantity';
                inputQuantity.value = quantity;
                form.appendChild(inputQuantity);
                document.body.appendChild(form);
                form.submit();
            });
        }
    });
});
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

    // Function to prepare checkout
    function prepareCheckout() {
        const selectedItems = Array.from(document.querySelectorAll('.item-checkbox:checked'))
            .map(checkbox => checkbox.getAttribute('data-cart-item-id'));

        if (selectedItems.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
            return;
        }

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/customer/order/preview-checkout';

        selectedItems.forEach(id => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'cartItemIds';
            input.value = id;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
    }

    // Remove exposure of prepareCheckout to global scope since inline onclick is removed
    // window.prepareCheckout = prepareCheckout;

    // Add event listener for checkout button
    document.querySelector('.checkout-btn').addEventListener('click', prepareCheckout);

    // Function to handle the removal of cart items
    function removeItem(cartItemId) {
        $.ajax({
            url: '/customer/cart/remove-from-cart',
            type: 'POST',
            data: {cartItemId: cartItemId},
            success: function (response) {
                location.reload();
            },
            error: function (xhr, status, error) {
                alert(xhr.responseText);
            }
        });
    }

    // Remove exposure of removeItem to global scope since inline onclick is removed
    // window.removeItem = removeItem;

    // Add event listener for remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function () {
            const cartItemId = this.getAttribute('data-cart-item-id');
            if (cartItemId) {
                removeItem(cartItemId);
            }
        });
    });

    // Function to update the total after any changes
    function updateTotal() {
        let total = 0;
        let selectedItemsTotal = 0;

        document.querySelectorAll('.row.item').forEach(function (itemRow) {
            const checkbox = itemRow.querySelector('.item-checkbox');
            const priceElement = itemRow.querySelector('.main__cart-price');
            const quantityInput = itemRow.querySelector('.input-qty');

            if (checkbox && checkbox.checked) {
                const price = parseFloat(priceElement.innerText.replace('₫', '').replace(',', ''));
                const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
                selectedItemsTotal += price * quantity;
            }

            total += parseFloat(priceElement.innerText.replace('₫', '').replace(',', ''));
        });

        document.querySelector('.total-money').innerText = 'Tổng cộng: ' + selectedItemsTotal.toLocaleString() + ' ₫';
    }

    // Event listener for quantity changes
    document.querySelectorAll('.input-qty').forEach(input => {
        input.addEventListener('change', function () {
            const cartItemId = input.getAttribute('data-cart-item-id');
            const quantity = input.value;

            $.ajax({
                url: '/customer/cart/update-quantity',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    cartItemId: cartItemId,
                    quantity: quantity
                }),
                success: function (response) {
                    updateTotal();
                },
                error: function (xhr, status, error) {
                    alert(xhr.responseText);
                }
            });
        });
    });

    // Event listener for checkbox change
    document.querySelectorAll('.item-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            updateTotal();
        });
    });

    // Initial total calculation on page load
    updateTotal();
});
document.addEventListener('DOMContentLoaded', function () {
    let discountApplied = 0;

    // Function to apply discount
    function applyDiscount() {
        const discountCode = document.getElementById('discountCode').value.trim();
        const discountMessage = document.getElementById('discountMessage');
        const subtotalElement = document.getElementById('subtotal');
        const discountElement = document.getElementById('discount');
        const totalElement = document.getElementById('total');

        if (!discountCode) {
            discountMessage.innerText = 'Vui lòng nhập mã giảm giá.';
            discountMessage.className = 'text-danger mt-2';
            return;
        }

        $.ajax({
            url: '/customer/order/apply-discount',
            type: 'POST',
            data: { discountCode: discountCode },
            success: function (response) {
                if (response.discountAmount) {
                    discountApplied = response.discountAmount;
                    discountMessage.innerText = 'Mã giảm giá được áp dụng thành công!';
                    discountMessage.className = 'text-success mt-2';

                    const subtotalText = subtotalElement.innerText.replace('₫', '').replace(',', '');
                    const subtotal = parseFloat(subtotalText);
                    const total = subtotal - discountApplied;

                    discountElement.innerText = discountApplied.toLocaleString() + ' ₫';
                    totalElement.innerText = total.toLocaleString() + ' ₫';
                } else {
                    discountMessage.innerText = response.message || 'Mã giảm giá không hợp lệ.';
                    discountMessage.className = 'text-danger mt-2';
                }
            },
            error: function (xhr, status, error) {
                discountMessage.innerText = 'Đã xảy ra lỗi khi áp dụng mã giảm giá.';
                discountMessage.className = 'text-danger mt-2';
            }
        });
    }

    // Add event listener for apply discount button
    document.querySelector('.apply-discount').addEventListener('click', applyDiscount);

    // Function to toggle temporary address form
    function useTemporaryAddress() {
        const temporaryAddressForm = document.getElementById('temporaryAddressForm');
        const addressSelect = document.getElementById('addressSelect');
        const checkbox = document.querySelector('.temporary-address-checkbox');

        if (checkbox.checked) {
            temporaryAddressForm.style.display = 'block';
            addressSelect.disabled = true;
        } else {
            temporaryAddressForm.style.display = 'none';
            addressSelect.disabled = false;
        }
    }

    // Add event listener for temporary address checkbox
    document.querySelector('.temporary-address-checkbox').addEventListener('change', useTemporaryAddress);

    // Function to place order
    function placeOrder() {
        const addressSelect = document.getElementById('addressSelect');
        const temporaryAddressCheckbox = document.querySelector('.temporary-address-checkbox');
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

        const orderData = {
            paymentMethod: paymentMethod,
            discountCode: document.getElementById('discountCode').value.trim()
        };

        if (temporaryAddressCheckbox.checked) {
            const fullName = document.getElementById('fullName').value;
            const phoneNumber = document.getElementById('phoneNumber').value;
            const address = document.getElementById('address').value;
            const province = document.getElementById('province').value;
            const district = document.getElementById('district').value;
            const ward = document.getElementById('ward').value;

            if (!fullName || !phoneNumber || !address || !province || !district || !ward) {
                alert('Vui lòng điền đầy đủ thông tin địa chỉ giao hàng.');
                return;
            }

            orderData.temporaryAddress = {
                fullName: fullName,
                phoneNumber: phoneNumber,
                address: address,
                province: province,
                district: district,
                ward: ward
            };
        } else {
            const addressId = addressSelect.value;
            if (!addressId) {
                alert('Vui lòng chọn địa chỉ giao hàng.');
                return;
            }
            orderData.addressId = addressId;
        }

        $.ajax({
            url: '/customer/order/place-order',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(orderData),
            success: function (response) {
                if (response.redirectUrl) {
                    window.location.href = response.redirectUrl; // Redirect to payment gateway or success page
                } else {
                    alert('Đặt hàng thành công!');
                    window.location.href = '/customer/order/history';
                }
            },
            error: function (xhr, status, error) {
                alert('Đã xảy ra lỗi khi đặt hàng: ' + xhr.responseText);
            }
        });
    }

    // Add event listener for place order button
    document.querySelector('.place-order').addEventListener('click', placeOrder);
});
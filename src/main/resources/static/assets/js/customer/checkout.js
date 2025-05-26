document.addEventListener('DOMContentLoaded', function () {
    // Lấy CSRF token và header từ meta tags
    const csrfToken = document.querySelector('meta[name="_csrf"]')?.getAttribute('content');
    const csrfHeader = document.querySelector('meta[name="_csrf_header"]')?.getAttribute('content');

    // Debug: Kiểm tra CSRF token
    console.log('CSRF Token:', csrfToken);
    console.log('CSRF Header:', csrfHeader);

    // Thiết lập CSRF token cho tất cả AJAX requests
    if (csrfToken && csrfHeader) {
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                // Chỉ thêm CSRF token cho non-GET requests
                if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader(csrfHeader, csrfToken);
                }
            }
        });
    }

    const addresses = JSON.parse(document.body.getAttribute('data-addresses') || '[]');
    const isSingleProduct = parseInt(document.body.getAttribute('data-is-single-product') || '0');

    // Function to generate a simple UUID
    function generateSimpleUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Function to apply discount
    function applyDiscount() {
        const discountCode = $("#discountCode").val();

        if ($.trim(discountCode) === "") {
            alert("Please enter a discount code!");
            return;
        }

        const url = '/customer/voucher?voucherCode=' + encodeURIComponent(discountCode);

        $.ajax({
            url: url,
            type: 'GET', // GET request không cần CSRF token
            success: function (data) {
                const subtotal = parseFloat($("#subtotal").text().replace(/[^\d.-]/g, ''));
                const discount = data.voucherValue || 0;
                let total = subtotal - discount;

                if (total < 0) {
                    total = 0;
                }

                $("#discount").text('-' + discount.toLocaleString('vi-VN') + ' đ');
                $("#total").text(total.toLocaleString('vi-VN') + ' đ');
            },
            error: function (xhr, status, error) {
                console.error('Apply discount error:', xhr.responseText);
                alert("Error applying discount: " + (xhr.responseText || error));
            }
        });
    }

    // Function to handle place order
    function placeOrder(event) {
        event.preventDefault();

        const paymentMethod = document.querySelector("input[name='paymentMethod']:checked")?.id;
        if (!paymentMethod) {
            alert("Please select a payment method!");
            return;
        }

        const cartItems = Array.from(document.querySelectorAll(".row.g-0")).map(row => {
            const productCodeInput = row.querySelector("input[name='productCode']");
            const quantityInput = row.querySelector("input[name='quantity']");

            if (!productCodeInput || !quantityInput) {
                console.error('Missing product code or quantity input in row:', row);
                return null;
            }

            return {
                productCode: productCodeInput.value,
                quantity: parseInt(quantityInput.value) || 1
            };
        }).filter(item => item !== null);

        if (cartItems.length === 0) {
            alert("No valid cart items found!");
            return;
        }

        const voucherCodes = Array.from(document.querySelectorAll("#discountCode"))
            .map(v => v.value)
            .filter(value => value !== "");

        let selectedAddressId = document.getElementById("address-select")?.value;
        let selectedAddress = addresses.find(address => address.addressId == selectedAddressId);
        let address = null;

        if (document.getElementById("newAddress")?.checked) {
            address = {
                receiverName: document.getElementById("fullName")?.value || '',
                receiverPhone: document.getElementById("phone")?.value || '',
                address: document.getElementById("address")?.value || '',
                city: document.getElementById("city")?.value || '',
                district: document.getElementById("district")?.value || '',
                ward: document.getElementById("ward")?.value || '',
                province: document.getElementById("city")?.value || ''
            };

            // Validate new address
            if (!address.receiverName || !address.receiverPhone || !address.address) {
                alert("Please fill in all required address fields!");
                return;
            }
        } else {
            address = selectedAddress;
            if (!address) {
                alert("Please select an address!");
                return;
            }
        }

        // Tạo request object
        const createOrderRequest = {
            address: address,
            paymentMethod: paymentMethod,
            cartItemForOrderDTOS: cartItems,
            voucherCodes: voucherCodes
        };

        console.log('Order request:', createOrderRequest);

        const url = isSingleProduct === 0 ? "/customer/order/create" : "/customer/order/create-single-product";

        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(createOrderRequest),
            beforeSend: function(xhr) {
                // Explicitly set CSRF token for this request
                if (csrfToken && csrfHeader) {
                    xhr.setRequestHeader(csrfHeader, csrfToken);
                }
            },
            success: function (response) {
                console.log('Order created successfully:', response);
                if (response.redirectUrl) {
                    window.location.href = response.redirectUrl;
                } else {
                    alert("Order created successfully!");
                }
            },
            error: function (xhr, status, error) {
                console.error('Place order error:', xhr);
                let errorMessage = "Error placing order: ";

                if (xhr.responseText) {
                    try {
                        const errorData = JSON.parse(xhr.responseText);
                        errorMessage += errorData.message || xhr.responseText;
                    } catch (e) {
                        errorMessage += xhr.responseText;
                    }
                } else {
                    errorMessage += error;
                }

                alert(errorMessage);
            }
        });
    }

    // Function to handle address suggestions
    const apiKey = 'NrT24q9uGwGNuzfOGsJO6whgLmM4iP7jQPmbL4X7';
    const addressInput = document.getElementById('address');
    const suggestionsContainer = document.getElementById('suggestions');
    const cityInput = document.getElementById('city');
    const districtInput = document.getElementById('district');
    const wardInput = document.getElementById('ward');
    let sessionToken = generateSimpleUUID();

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const debouncedSearch = debounce((query) => {
        if (query.length < 2) {
            if (suggestionsContainer) {
                suggestionsContainer.style.display = 'none';
            }
            return;
        }

        fetch(`https://rsapi.goong.io/Place/AutoComplete?api_key=${apiKey}&input=${encodeURIComponent(query)}&sessiontoken=${sessionToken}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'OK' && suggestionsContainer) {
                    suggestionsContainer.innerHTML = '';
                    suggestionsContainer.style.display = 'block';

                    data.predictions.forEach(prediction => {
                        const div = document.createElement('div');
                        div.className = 'suggestion-item';
                        div.textContent = prediction.description;
                        div.addEventListener('click', () => {
                            addressInput.value = prediction.description;
                            suggestionsContainer.style.display = 'none';

                            if (prediction.compound) {
                                if (cityInput) cityInput.value = prediction.compound.province || '';
                                if (districtInput) districtInput.value = prediction.compound.district || '';
                                if (wardInput) wardInput.value = prediction.compound.commune || '';
                            }
                        });
                        suggestionsContainer.appendChild(div);
                    });
                }
            })
            .catch(error => console.error('Address suggestion error:', error));
    }, 300);

    // Event listeners
    if (addressInput) {
        addressInput.addEventListener('input', (e) => debouncedSearch(e.target.value));
    }

    document.addEventListener('click', function (e) {
        if (suggestionsContainer && !suggestionsContainer.contains(e.target) && e.target !== addressInput) {
            suggestionsContainer.style.display = 'none';
        }
    });

    // Add event listeners with error handling
    const applyDiscountBtn = document.querySelector('.apply-discount-btn');
    const placeOrderBtn = document.querySelector('.place-order-btn');

    if (applyDiscountBtn) {
        applyDiscountBtn.addEventListener('click', applyDiscount);
    }

    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', placeOrder);
    }

    // Toggle address form visibility
    const newAddressCheckbox = document.getElementById('newAddress');
    const addressForm = document.querySelector('main.container');

    if (newAddressCheckbox && addressForm) {
        newAddressCheckbox.addEventListener('change', function() {
            if (this.checked) {
                addressForm.style.display = 'block';
            } else {
                addressForm.style.display = 'none';
            }
        });

        // Initially hide the form
        addressForm.style.display = 'none';
    }
});
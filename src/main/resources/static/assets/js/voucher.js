document.addEventListener('DOMContentLoaded', function () {
    // Lazy loading variables
    let x = 0; // Use let instead of const as you'll be incrementing this
    const size = 8;
    let vouchers = []; // Initialize vouchers as an empty array

    // Function to create voucher card
    function createVoucherCard(voucher) {
        return `
            <div class="col">
                <div class="card voucher-card">
                    <img src="https://cdn.chanhtuoi.com/uploads/2021/09/e-voucher-shopee3-1.jpg.webp" class="card-img-top voucher-image" alt="Voucher Image">
                    <div class="card-body">
                        <h5 class="card-title voucher-title">Mã giảm giá</h5>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="voucher-code">${voucher.voucherCode}</span>
                            <i class="fas fa-copy copy-btn" data-code="${voucher.voucherCode}" title="Copy code"></i>
                        </div>
                        <p class="card-text voucher-value">Giảm ${voucher.voucherValue}đ</p>
                        <p class="card-text voucher-dates">
                            <small>
                                <i class="far fa-calendar-alt"></i> ${voucher.startDate} - ${voucher.endDate}
                            </small>
                        </p>
                        <p class="card-text voucher-quantity">
                            <i class="fas fa-ticket-alt"></i> Tổng số: ${voucher.quantity}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to fetch vouchers
    function fetchVouchers(page, size) {
        return $.ajax({
            url: "/browser/getVouchers",
            type: "GET",
            data: {
                page: page,
                size: size
            }
        });
    }

    // Function to render vouchers
    function renderVouchers(vouchers) {
        const container = document.querySelector('#voucherContainer .row');
        vouchers.forEach(voucher => {
            container.innerHTML += createVoucherCard(voucher);
        });
    }

    // Function to copy voucher code
    function copyVoucherCode(code) {
        navigator.clipboard.writeText(code).then(() => {
            alert('Voucher code copied to clipboard!');
        });
    }

    // Initial fetch on page load
    fetchVouchers(x, size)
        .done(data => {
            vouchers = data;
            renderVouchers(vouchers);
        })
        .fail(error => {
            console.log(error);
        });
    x = 2;

    // Event lazy loading
    window.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 2) {
            x++; // Increment the page number
            fetchVouchers(x, 4)
                .done(data => {
                    vouchers = vouchers.concat(data); // Add new vouchers to the existing array
                    renderVouchers(data); // Render only the new vouchers
                })
                .fail(error => {
                    console.log(error);
                });
        }
    });

    document.querySelector('#voucherContainer').addEventListener('click', function (e) {
        if (e.target.classList.contains('copy-btn')) {
            const code = e.target.getAttribute('data-code');
            copyVoucherCode(code);
        }
    });
});


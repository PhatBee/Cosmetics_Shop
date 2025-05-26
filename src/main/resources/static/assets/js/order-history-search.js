document.addEventListener('DOMContentLoaded', function () {
    let currentPage = 0;
    const pageSize = 3; // Giống với pageSize trong controller
    let isLoading = false;
    let keyword = document.querySelector('input[name="keyword"]').value;

    function loadMoreOrders() {
        if (isLoading) return;

        isLoading = true;

        $.ajax({
            url: '/customer/order/order-history-search',
            type: 'GET',
            data: {
                keyword: keyword,
                page: currentPage
            },
            success: function (data) {
                // Tạo HTML cho các order mới
                const newOrdersHTML = data.map(order => {
                    let orderHtml = `
                        <div class="card mb-3 container">
                            <div class="card-header">
                                <a href="/customer/order/followOrder/${order.orderId}">
                                    <h5>Đơn hàng ngày: ${new Date(order.orderDate).toLocaleDateString('vi-VN')}</h5>
                                </a>
                            </div>
                    `;

                    order.orderLines.forEach(orderline => {
                        orderHtml += `
                            <div class="row g-0">
                                <div class="col-md-3">
                                    <img src="${orderline.productSnapshot.image}" class="img-fluid rounded-start" alt="Sản phẩm" style="width: 150px;">
                                </div>
                                <div class="col-md-9">
                                    <div class="card-body">
                                        <h5 class="card-title">${orderline.productSnapshot.productName}</h5>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <p class="card-text">${orderline.productSnapshot.cost}</p>
                                            </div>
                                            <div class="col-md-6 text-end">
                                                <p class="card-text">x${orderline.quantity}</p>
                                            </div>
                                        </div>
                                        <hr>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 text-end mb-4">
                                        <strong class="card-text">Tổng tiền: ${order.total}</strong>
                                    </div>
                                </div>
                            </div>
                        `;
                    });

                    orderHtml += `</div>`;
                    return orderHtml;
                }).join('');

                // Thêm HTML vào tab-content
                $('.tab-content').append(newOrdersHTML);
                console.log(newOrdersHTML);

                currentPage++;
                isLoading = false;
            },
            error: function (error) {
                console.error("Lỗi khi tải đơn hàng:", error);
                isLoading = false;
            }
        });
    }

    // Gọi loadMoreOrders() khi người dùng cuộn đến gần cuối trang
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
            loadMoreOrders();
        }
    });

    // Gọi loadMoreOrders() lần đầu để hiển thị trang đầu tiên
    loadMoreOrders();
});
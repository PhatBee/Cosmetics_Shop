document.addEventListener("DOMContentLoaded", function () {

    // Hàm cập nhật số lượng giỏ hàng (hiện tại không sử dụng, giữ để tương lai)
    function updateCartCount(count) {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = count;
        }
    }


    // Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');

    fetch('/api/revenue/annual-data')
        .then(response => response.json())
        .then(data => {
            new Chart(salesCtx, {
                type: 'line',
                data: {
                    labels: [
                        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
                        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
                    ],
                    datasets: [{
                        label: 'Doanh thu (VND)',
                        data: data.monthlyRevenue,
                        borderColor: 'rgb(232, 62, 140)',
                        tension: 0.1
                    }]
                },
                options: {
                    animation: {
                        duration: 1000,
                        easing: 'easeInOutQuart'
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(200, 200, 200, 0.5)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: 14,
                                    family: "'Roboto', Arial, sans-serif"
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: '#007bff',
                            titleColor: '#fff',
                            bodyColor: '#fff'
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Có lỗi khi lấy dữ liệu doanh thu 12 tháng:', error);
        });

    // Category Chart
    fetch('/admin/report/category-total-sold')
        .then(response => response.json())
        .then(data => {
            const categoryCtx = document.getElementById('categoryChart').getContext('2d');
            new Chart(categoryCtx, {
                type: 'doughnut',
                data: {
                    labels: data.map(item => item.categoryName),
                    datasets: [{
                        data: data.map(item => item.percentage),
                        backgroundColor: [
                            'rgb(232, 62, 140)',
                            'rgb(111, 66, 193)',
                            'rgb(255, 193, 7)',
                            'rgb(23, 162, 184)'
                        ]
                    }]
                },
                options: {
                    animation: {
                        duration: 1000,
                        easing: 'easeInOutQuart'
                    },
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: 14,
                                    family: "'Roboto', Arial, sans-serif"
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: '#007bff',
                            titleColor: '#fff',
                            bodyColor: '#fff'
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Có lỗi khi lấy dữ liệu danh mục sản phẩm:', error);
        });

    // Cập nhật doanh thu hôm nay
    fetch('/api/revenue/today')
        .then(response => response.json())
        .then(data => {
            document.getElementById('todayRevenue').textContent = new Intl.NumberFormat().format(data.revenue) + " VND";
        })
        .catch(error => console.error('Có lỗi khi lấy dữ liệu doanh thu hôm nay:', error));
});
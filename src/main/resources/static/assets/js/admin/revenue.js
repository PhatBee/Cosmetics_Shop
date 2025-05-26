document.addEventListener("DOMContentLoaded", function () {
    // Hàm lấy và cập nhật dữ liệu doanh thu
    function fetchRevenue(endpoint, elementId) {
        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                document.getElementById(elementId).textContent = new Intl.NumberFormat().format(data.revenue) + " VND";
            })
            .catch(error => {
                console.error(`Có lỗi khi lấy dữ liệu từ ${endpoint}:`, error);
                document.getElementById(elementId).textContent = "Lỗi tải dữ liệu";
            });
    }

    // Lấy dữ liệu doanh thu hôm nay
    fetchRevenue('/api/revenue/today', 'todayRevenue');

    // Lấy dữ liệu doanh thu trong tháng
    fetchRevenue('/api/revenue/monthly', 'monthlyRevenue');

    // Lấy dữ liệu doanh thu trong năm
    fetchRevenue('/api/revenue/annual', 'annualRevenue');

    // Lấy dữ liệu doanh thu 12 tháng và vẽ biểu đồ
    fetch('/api/revenue/annual-data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const ctx = document.getElementById('monthlyRevenueChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [
                        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
                        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
                    ],
                    datasets: [{
                        label: 'Doanh thu (VND)',
                        data: data.monthlyRevenue,
                        backgroundColor: 'rgba(54, 162, 235, 0.7)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
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
            const ctx = document.getElementById('monthlyRevenueChart').getContext('2d');
            ctx.canvas.style.display = 'none'; // Ẩn canvas nếu có lỗi
        });
});
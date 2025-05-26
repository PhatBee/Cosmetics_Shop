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

    // Biến toàn cục từ server (sẽ được truyền qua HTML)
    const contextPath = window.location.origin + '/';
    let currentCategoryId = 1; // Mặc định

    // Hàm định dạng giá tiền
    function formatCurrency(value) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    }

    // Hàm tạo sao từ ratingAverage
    function generateStars(rating) {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += i < rating ? '<i class="fa fa-star star--fill" aria-hidden="true"></i>' : '<i class="fa fa-star" aria-hidden="true"></i>';
        }
        return stars;
    }

    // Hàm thêm vào giỏ hàng
    function addToCart(productCode) {
        console.log('Add to cart:', productCode);
        $.ajax({
            url: contextPath + 'customer/cart/add-to-cart',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                productCode: productCode,
                quantity: 1
            }),
            success: function (response) {
                alert(response);
            },
            error: function (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        });
    }

    // Hàm lấy sản phẩm theo danh mục
    function getProductByCategory(categoryId, page) {
        $.ajax({
            url: contextPath + 'browser/category/products',
            type: 'GET',
            data: {
                page: page,
                categoryId: categoryId,
            },
            success: function (response) {
                const products = response.products;
                let html = '';
                products.forEach(product => {
                    html += `
                        <div class="col">
                            <div class="card h-100">
                                <img src="${contextPath}api/images?imageName=${product.image}" class="card-img-top product-image" alt="${product.productName}">
                                <div class="card-body">
                                    <h5 class="card-title">${product.productName}</h5>
                                    <p class="card-text"><strong>${formatCurrency(product.cost)}</strong></p>
                                    <div class="mb-2">
                                        <span class="star-rating">${generateStars(product.ratingAverage)}</span>
                                        <small class="text-muted">(${product.ratingAverage})</small>
                                    </div>
                                    <p class="card-text"><small class="text-muted">${product.sellCount} sold</small></p>
                                    <button class="btn btn-primary add-to-cart" data-product-code="${product.productCode}">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    `;
                });
                $('#products-container').html(html);
                loadPagination(response.data.totalPages, response.data.pageNumber);
                attachEventListeners(); // Gắn lại event listeners cho các nút mới
            },
            error: function (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        });
    }

    // Hàm tải phân trang
    function loadPagination(totalPages, currentPage) {
        $('#pagination').empty();
        const maxVisiblePages = 5;

        function addPage(page, isActive = false) {
            const activeClass = isActive ? 'active' : '';
            $('#pagination').append(`
                <li class="page-item ${activeClass}">
                    <a class="page-link" href="javascript:void(0)" data-page="${page}">${page + 1}</a>
                </li>
            `);
        }

        if (totalPages > maxVisiblePages) {
            addPage(0, currentPage === 0);
            if (currentPage > 2) $('#pagination').append('<li class="page-item disabled"><span class="page-link">...</span></li>');
            const startPage = Math.max(1, currentPage - 1);
            const endPage = Math.min(totalPages - 2, currentPage + 1);
            for (let i = startPage; i <= endPage; i++) addPage(i, currentPage === i);
            if (currentPage < totalPages - 3) $('#pagination').append('<li class="page-item disabled"><span class="page-link">...</span></li>');
            addPage(totalPages - 1, currentPage === totalPages - 1);
        } else {
            for (let i = 0; i < totalPages; i++) addPage(i, currentPage === i);
        }

        $('#pagination .page-link').on('click', function () {
            const page = $(this).data('page');
            getProductByCategory(currentCategoryId, page);
        });
    }

    // Hàm gắn event listeners
    function attachEventListeners() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function () {
                const productCode = this.getAttribute('data-product-code');
                addToCart(productCode);
            });
        });
    }

    // Khởi tạo khi trang tải
    $.ajax({
        url: contextPath + 'browser/categories',
        type: 'GET',
        success: function (response) {
            let html = '';
            response.forEach(category => {
                html += `<a href="" class="product__item-link" data-category-id="${category.categoryId}">`;
                html += `<li class="product__items-item">${category.categoryName}</li>`;
                html += '</a>';
            });
            $('.product__items-list').html(html);
            // Gắn sự kiện cho các danh mục
            document.querySelectorAll('.product__item-link').forEach(link => {
                link.addEventListener('click', function (event) {
                    event.preventDefault();
                    currentCategoryId = this.getAttribute('data-category-id');
                    console.log('Category ID:', currentCategoryId);
                    getProductByCategory(currentCategoryId, 0);
                });
            });
        },
        error: function (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    });

    // Tải sản phẩm mặc định
    getProductByCategory(currentCategoryId, 0);

    // Xử lý tìm kiếm
    document.getElementById('button-addon2').addEventListener('click', function () {
        const searchTerm = document.querySelector('.form-control').value;
        $.ajax({
            url: contextPath + 'browser/search',
            type: 'GET',
            data: { term: searchTerm },
            success: function (response) {
                let html = '';
                response.forEach(product => {
                    html += `
                        <div class="col">
                            <div class="card h-100">
                                <img src="${contextPath}api/images?imageName=${product.image}" class="card-img-top product-image" alt="${product.productName}">
                                <div class="card-body">
                                    <h5 class="card-title">${product.productName}</h5>
                                    <p class="card-text"><strong>${formatCurrency(product.cost)}</strong></p>
                                    <div class="mb-2">
                                        <span class="star-rating">${generateStars(product.ratingAverage)}</span>
                                        <small class="text-muted">(${product.ratingAverage})</small>
                                    </div>
                                    <p class="card-text"><small class="text-muted">${product.sellCount} sold</small></p>
                                    <button class="btn btn-primary add-to-cart" data-product-code="${product.productCode}">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    `;
                });
                $('#products-container').html(html);
                attachEventListeners();
            },
            error: function (error) {
                console.error('Lỗi khi tìm kiếm:', error);
            }
        });
    });
});
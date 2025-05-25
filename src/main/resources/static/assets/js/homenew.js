document.addEventListener('DOMContentLoaded', function () {
    let currentPage = {
        bestSellers: 0,
        newArrivals: 0,
        topRated: 0
    };
    const size = 5;

    // Slide function
    function slide(sliderId, direction) {
        const slider = document.getElementById(sliderId);
        const container = slider.querySelector('.product-container');
        const cardWidth = 270; // 250px width + 20px margin
        const visibleCards = Math.floor(slider.offsetWidth / cardWidth);
        const itemsToScroll = 5;

        const scrollAmount = direction * cardWidth * visibleCards;

        container.style.transition = 'transform 0.5s ease';
        container.style.transform = `translateX(${-scrollAmount}px)`;

        setTimeout(() => {
            container.style.transition = 'none';

            if (direction > 0) {
                for (let i = 0; i < itemsToScroll; i++) {
                    container.appendChild(container.firstElementChild);
                }
            } else {
                for (let i = 0; i < itemsToScroll; i++) {
                    container.prepend(container.lastElementChild);
                }
            }

            container.style.transform = 'translateX(0)';

            setTimeout(() => {
                container.style.transition = 'transform 0.5s ease';
            }, 50);
        }, 500);

        if (sliderId === 'bestSellersSlider') {
            renderBestSellers();
        } else if (sliderId === 'newArrivalsSlider') {
            renderNewestProduct();
        } else if (sliderId === 'top20RatedProductsSlider') {
            renderTopRating();
        }
    }

    // Remove exposure of slide to global scope since inline onclick is removed
    // window.slide = slide;

    // Add event listeners for slider buttons
    document.querySelectorAll('.slider-button').forEach(button => {
        button.addEventListener('click', function () {
            const sliderId = this.getAttribute('data-slider');
            const direction = parseInt(this.getAttribute('data-direction'));
            slide(sliderId, direction);
        });
    });

    // Render Best Sellers
    function renderBestSellers() {
        if (currentPage["bestSellers"] === 4) return;
        $.ajax({
            url: `/topSellingProducts`,
            method: "GET",
            data: { page: currentPage["bestSellers"]++, size: 5 },
            success: function (data) {
                const sliderContainer = document.getElementById("bestSellersSlider").querySelector(".product-container");
                data.forEach(product => {
                    const productCard = `
                        <div class="product-card">
                            <img src="/api/images?imageName=${product.image}" alt="${product.productId}" class="product-image">
                            <div class="product-info">
                                <a href="/browser/product/${product.productId}" class="product-title">${product.productName}</a>
                                <p class="product-price">Giá: ${new Intl.NumberFormat().format(product.cost)} đ</p>
                                <p class="numsold">Đã mua trong 30 ngày: ${product.totalSoldLast30Days}</p>
                                <button data-product-code="${product.productCode}" class="btn btn-custom add-to-cart">Thêm vào giỏ hàng</button>
                            </div>
                        </div>
                    `;
                    sliderContainer.innerHTML += productCard;
                });
            },
            error: function (err) {
                console.error("Error loading products:", err);
            }
        });
    }

    // Render Newest Products
    function renderNewestProduct() {
        if (currentPage["newArrivals"] === 4) return;
        $.ajax({
            url: `/topNewestProducts`,
            method: "GET",
            data: { page: currentPage["newArrivals"]++, size: 5 },
            success: function (data) {
                const sliderContainer = document.getElementById("newArrivalsSlider").querySelector(".product-container");
                data.forEach(product => {
                    const productCard = `
                        <div class="product-card">
                            <img src="/api/images?imageName=${product.image}" alt="${product.productId}" class="product-image">
                            <div class="product-info">
                                <a href="/browser/product/${product.productId}" class="product-title">${product.productName}</a>
                                <p class="product-price">Giá: ${new Intl.NumberFormat().format(product.cost)} đ</p>
                                <button data-product-code="${product.productCode}" class="btn btn-custom add-to-cart">Thêm vào giỏ hàng</button>
                            </div>
                        </div>
                    `;
                    sliderContainer.innerHTML += productCard;
                });
            },
            error: function (err) {
                console.error("Error loading products:", err);
            }
        });
    }

    // Render Top Rated Products
    function renderTopRating() {
        if (currentPage["topRated"] === 4) return;
        $.ajax({
            url: `/topHighestRatingProducts`,
            method: "GET",
            data: { page: currentPage["topRated"]++, size: 5 },
            success: function (data) {
                const sliderContainer = document.getElementById("top20RatedProductsSlider").querySelector(".product-container");
                data.forEach(product => {
                    const productCard = `
                        <div class="product-card">
                            <img src="/api/images?imageName=${product.image}" alt="${product.productId}" class="product-image">
                            <div class="product-info">
                                <a href="/browser/product/${product.productId}" class="product-title">${product.productName}</a>
                                <p class="product-price">Giá: ${new Intl.NumberFormat().format(product.cost)} đ</p>
                                <p class="rating">Đánh giá: ${product.averageRating} <span class="star gold"><i class="fas fa-star"></i></span></p>
                                <button data-product-code="${product.productCode}" class="btn btn-custom add-to-cart">Thêm vào giỏ hàng</button>
                            </div>
                        </div>
                    `;
                    sliderContainer.innerHTML += productCard;
                });
            },
            error: function (err) {
                console.error("Error loading products:", err);
            }
        });
    }

    // Initial render
    renderBestSellers();
    renderNewestProduct();
    renderTopRating();

    // Add to Cart function
    function addToCart(productCode) {
        $.ajax({
            url: '/customer/cart/add-to-cart',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                productCode: productCode,
                quantity: 1
            }),
            success: function (response) {
                if (response.indexOf('loginForm') > 0) {
                    window.location.href = '/auth/login';
                } else {
                    alert(response);
                }
            },
            error: function (xhr, status, error) {
                alert("Error: " + xhr.responseText);
            }
        });
    }

    // Event listener for add to cart buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productCode = this.getAttribute("data-product-code");
            if (productCode) {
                addToCart(productCode);
            }
        });
    });

    // Smooth scroll on button click
    $('.btn-custom.btn-lg').click(function(event) {
        event.preventDefault();
        var targetPosition = 500;
        $('html, body').animate({
            scrollTop: targetPosition
        }, 10);
    });
});
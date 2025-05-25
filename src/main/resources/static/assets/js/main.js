function slide(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    if (slider === document.getElementById("bestSellersSlider")) {
        renderBestSellers();
    }
    if (slider === document.getElementById("newArrivalsSlider")) {
        renderNewestProduct();
    }
    if (slider === document.getElementById("top20RatedProductsSlider")) {
        renderTopRating();
    }
    const container = slider.querySelector('.product-container');
    const cardWidth = 270; // 250px width + 20px margin
    const visibleCards = Math.floor(slider.offsetWidth / cardWidth);
    const itemsToScroll = 5; // Số lượng item bạn muốn cuộn

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
}

let currentPage = {
    bestSellers: 0,
    newArrivals: 0,
    topRated: 0
};
const size = 5;

function renderBestSellers() {
    if (currentPage["bestSellers"] === 4) {
        return;
    }
    $.ajax({
        url: `/topSellingProducts`,
        method: "GET",
        data: {
            page: currentPage["bestSellers"]++,
            size: 5
        },
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
                        <button class="btn btn-custom add-to-cart" data-product-code="${product.productCode}">Thêm vào giỏ hàng</button>
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

function renderNewestProduct() {
    if (currentPage["newArrivals"] === 4) {
        return;
    }
    $.ajax({
        url: `/topNewestProducts`,
        method: "GET",
        data: {
            page: currentPage["newArrivals"]++,
            size: 5
        },
        success: function (data) {
            const sliderContainer = document.getElementById("newArrivalsSlider").querySelector(".product-container");
            data.forEach(product => {
                const productCard = `
                <div class="product-card">
                    <img src="/api/images?imageName=${product.image}" alt="${product.productId}" class="product-image">
                    <div class="product-info">
                        <a href="/browser/product/${product.productId}" class="product-title">${product.productName}</a>
                        <p class="product-price">Giá: ${new Intl.NumberFormat().format(product.cost)} đ</p>
                        <button class="btn btn-custom add-to-cart" data-product-code="${product.productCode}">Thêm vào giỏ hàng</button>
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

function renderTopRating() {
    if (currentPage["topRated"] === 4) {
        return;
    }
    $.ajax({
        url: `/topHighestRatingProducts`,
        method: "GET",
        data: {
            page: currentPage["topRated"]++,
            size: 5
        },
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
                        <button class="btn btn-custom add-to-cart" data-product-code="${product.productCode}">Thêm vào giỏ hàng</button>
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

document.addEventListener("DOMContentLoaded", function () {
    // Smooth scroll for "Shop Now" button
    $('.btn-custom.btn-lg').click(function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 500
        }, 10);
    });

    // Add to cart event listeners
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const productCode = this.getAttribute("data-product-code");
            addToCart(productCode);
        });
    });

    // Slider event listeners
    document.querySelectorAll('.slider-button').forEach(button => {
        button.addEventListener('click', () => {
            const sliderId = button.getAttribute('data-slider');
            const direction = parseInt(button.getAttribute('data-direction'));
            slide(sliderId, direction);
        });
    });

    // Initial render
    renderBestSellers();
    renderNewestProduct();
    renderTopRating();
});
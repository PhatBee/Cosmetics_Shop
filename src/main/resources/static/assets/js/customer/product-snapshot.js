document.addEventListener('DOMContentLoaded', function () {
    // Lấy dữ liệu sản phẩm từ data attribute
    const productDataElement = document.getElementById('product-data');
    const productData = productDataElement ? JSON.parse(productDataElement.getAttribute('data-product')) : null;

    // Populate the HTML with the product data
    if (productData) {
        document.title = productData.productName; // Đảm bảo tiêu đề được cập nhật
        document.querySelector('h1').textContent = productData.productName;
        document.getElementById('productCode').textContent = productData.productCode;
        document.getElementById('cost').textContent = productData.cost.toLocaleString('vi-VN') + ' đ';
        document.getElementById('brand').textContent = productData.brand;
        document.getElementById('origin').textContent = productData.origin;
        document.getElementById('volume').textContent = productData.volume;
        document.getElementById('manufactureDate').textContent = new Date(productData.manufactureDate).toLocaleDateString('vi-VN');
        document.getElementById('expirationDate').textContent = new Date(productData.expirationDate).toLocaleDateString('vi-VN');
        document.getElementById('description').textContent = productData.description;
        document.getElementById('ingredient').textContent = productData.ingredient;
        document.getElementById('howToUse').innerHTML = productData.how_to_use.replace(/\n/g, '<br>');
        document.querySelector('.product-image').src = '/api/images?imageName=' + productData.image;
    } else {
        console.error('Không tìm thấy dữ liệu sản phẩm.');
    }

    // Function to view direct
    function viewDirect() {
        if (productData) {
            window.location.href = '/browser/product/' + productData.productId;
        } else {
            console.error('Không thể chuyển hướng: Dữ liệu sản phẩm không tồn tại.');
        }
    }

    // Add event listener for view direct button
    const viewDirectBtn = document.querySelector('.view-direct-btn');
    if (viewDirectBtn) {
        viewDirectBtn.addEventListener('click', viewDirect);
    }
});
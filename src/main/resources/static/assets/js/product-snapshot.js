document.addEventListener('DOMContentLoaded', function () {
    const productData = document.querySelector('script[th:inline="javascript"]').getAttribute('data-product-data');

    // Populate the HTML with the product data
    if (productData) {
        const parsedProductData = JSON.parse(productData.replace(/'/g, '"'));
        document.title = parsedProductData.productName;
        document.querySelector('h1').textContent = parsedProductData.productName;
        document.getElementById('productCode').textContent = parsedProductData.productCode;
        document.getElementById('cost').textContent = parsedProductData.cost.toLocaleString('vi-VN') + ' đ';
        document.getElementById('brand').textContent = parsedProductData.brand;
        document.getElementById('origin').textContent = parsedProductData.origin;
        document.getElementById('volume').textContent = parsedProductData.volume;
        document.getElementById('manufactureDate').textContent = new Date(parsedProductData.manufactureDate).toLocaleDateString('vi-VN');
        document.getElementById('expirationDate').textContent = new Date(parsedProductData.expirationDate).toLocaleDateString('vi-VN');
        document.getElementById('description').textContent = parsedProductData.description;
        document.getElementById('ingredient').textContent = parsedProductData.ingredient;
        document.getElementById('howToUse').innerHTML = parsedProductData.how_to_use.replace(/\n/g, '<br>');
        document.querySelector('.product-image').src = '/api/images?imageName=' + parsedProductData.image;
    }

    // Function to view direct
    function viewDirect() {
        if (productData) {
            const parsedProductData = JSON.parse(productData.replace(/'/g, '"'));
            window.location.href = '/browser/product/' + parsedProductData.productId;
        }
    }

    // Add event listener for view direct button
    document.querySelector('.view-direct-btn').addEventListener('click', viewDirect);
});
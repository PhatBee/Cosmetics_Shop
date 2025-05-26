document.addEventListener('DOMContentLoaded', function () {
    const orderId = document.body.getAttribute('data-order-id');
    const orderStatus = document.body.getAttribute('data-order-status');

    // Function to cancel an order
    function cancelOrder() {
        if (confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
            $.ajax({
                url: `/customer/order/cancel/${orderId}`,
                type: 'POST',
                success: function (response) {
                    showModalWithMessage(response);
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                },
                error: function (xhr) {
                    showModalWithMessage('Có lỗi xảy ra khi hủy đơn hàng: ' + xhr.responseText);
                }
            });
        }
    }

    // Function to retry payment for an order
    function pay() {
        $.ajax({
            url: `/customer/order/retry-payment/${orderId}`,
            type: 'POST',
            success: function (response) {
                if (response.redirectUrl) {
                    window.location.href = response.redirectUrl;
                } else {
                    showModalWithMessage('Thanh toán lại thành công!');
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                }
            },
            error: function (xhr) {
                showModalWithMessage('Có lỗi xảy ra khi thanh toán lại: ' + xhr.responseText);
            }
        });
    }

    // Function to display uploaded image
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const customButton = document.getElementById('customButton');
    const fileNameDisplay = document.getElementById('fileName');
    let selectedFile = null;
    let previousImageUrl = imagePreview.src === "#" ? null : imagePreview.src;

    customButton.addEventListener('click', function () {
        imageInput.click();
    });

    function displayImage(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previousImageUrl = imagePreview.src;
                imagePreview.src = e.target.result;
                selectedFile = input.files[0];
                imagePreview.style.display = 'block';
                fileNameDisplay.textContent = input.files[0].name;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    function restorePreviousImage() {
        if (previousImageUrl) {
            imagePreview.src = previousImageUrl;
            imagePreview.style.display = 'block';
        } else {
            imagePreview.style.display = 'none';
        }
        fileNameDisplay.textContent = "No file chosen";
    }

    imageInput.addEventListener('change', function () {
        if (this.files.length > 0) {
            displayImage(this);
        } else {
            restorePreviousImage();
        }
    });

    imageInput.addEventListener('click', function () {
        setTimeout(() => {
            this.value = '';
        }, 0);
    });

    // Handle review submission
    if (orderStatus !== 'COMPLETED') {
        document.getElementById('reviewContainer').style.display = 'none';
    }

    document.getElementById('productSelect').addEventListener('change', function () {
        var productId = this.value;
        $.ajax({
            type: 'GET',
            url: '/customer/product/review',
            contentType: 'application/json',
            data: {
                orderId: orderId,
                productId: productId
            },
            success: function (response) {
                if (response != null && response !== '') {
                    document.getElementById('rating').value = response.rating;
                    document.getElementById('review').value = response.comment;
                    document.getElementById('imagePreview').style.display = 'block';
                    if (response.image != null && response.image !== '') {
                        document.getElementById('imagePreview').src = '/api/images?imageName=' + response.image;
                    } else {
                        document.getElementById('imagePreview').src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';
                    }
                    updateStars(response.rating);
                    document.getElementById('rating').disabled = true;
                    document.getElementById('review').disabled = true;
                    document.getElementById('submitReview').disabled = true;
                } else {
                    document.getElementById('imagePreview').style.display = 'none';
                    document.getElementById('rating').disabled = false;
                    document.getElementById('review').disabled = false;
                    document.getElementById('submitReview').disabled = false;
                    document.getElementById('rating').value = '1';
                    document.getElementById('review').value = '';
                    updateStars(0);
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });

    document.getElementById('submitReview').addEventListener('click', function () {
        var productId = document.getElementById('productSelect').value;
        var rating = document.getElementById('rating').value;
        var review = document.getElementById('review').value;
        var formData = new FormData();
        formData.append("review", JSON.stringify({
            orderId: orderId,
            productId: productId,
            rating: rating,
            comment: review
        }));
        formData.append('image', selectedFile);
        console.log("click submit review");
        $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: '/customer/product/addReview',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                showModalWithMessage(response);
            },
            error: function (xhr, status, error) {
                showModalWithMessage(xhr.responseText);
            }
        });
    });

    // Star rating logic
    const starRating = document.getElementById('starRating');
    const stars = starRating.getElementsByClassName('fa-star');
    const ratingInput = document.getElementById('rating');

    starRating.addEventListener('click', function (e) {
        if (e.target.classList.contains('fa-star')) {
            const rating = e.target.getAttribute('data-rating');
            ratingInput.value = rating;
            updateStars(rating);
        }
    });

    starRating.addEventListener('mouseover', function (e) {
        if (e.target.classList.contains('fa-star')) {
            const rating = e.target.getAttribute('data-rating');
            updateStars(rating);
        }
    });

    starRating.addEventListener('mouseout', function () {
        updateStars(ratingInput.value);
    });

    function updateStars(rating) {
        for (let i = 0; i < stars.length; i++) {
            stars[i].classList.toggle('active', i < rating);
        }
    }

    // Function to show modal with message
    function showModalWithMessage(message) {
        const modalMessage = document.getElementById('message');
        modalMessage.textContent = message;
        $('#customModal').modal('show');
    }

    // Add event listeners
    document.querySelector('.cancel-order-btn').addEventListener('click', function () {
        cancelOrder();
    });

    document.querySelector('.retry-payment-btn').addEventListener('click', function () {
        pay();
    });

    document.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            $('#customModal').modal('hide');
        });
    });

    document.querySelector('.ok-modal-btn').addEventListener('click', function () {
        $('#customModal').modal('hide');
    });
});
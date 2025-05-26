document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const customButton = document.getElementById('customButton');
    const fileNameDisplay = document.getElementById('fileName');
    const productEditForm = document.getElementById('productEditForm');
    let selectedFile = null;
    let previousImageUrl = imagePreview.src || null; // Lấy URL ảnh hiện tại từ Thymeleaf

    // Click vào nút tùy chỉnh để kích hoạt input file
    customButton.addEventListener('click', function () {
        imageInput.click();
    });

    // Hiển thị ảnh được chọn
    function displayImage(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previousImageUrl = imagePreview.src;
                imagePreview.src = e.target.result;
                selectedFile = input.files[0];
                imagePreview.style.display = 'block'; // Không cần vì ảnh hiện tại đã hiển thị
                fileNameDisplay.textContent = input.files[0].name;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    // Khôi phục ảnh trước đó
    function restorePreviousImage() {
        if (previousImageUrl) {
            imagePreview.src = previousImageUrl;
            imagePreview.style.display = 'block';
        } else {
            imagePreview.style.display = 'none';
        }
        fileNameDisplay.textContent = "No file chosen";
    }

    // Xử lý khi file input thay đổi
    imageInput.addEventListener('change', function () {
        if (this.files.length > 0) {
            displayImage(this);
        } else {
            restorePreviousImage();
        }
    });

    // Đặt lại input file khi nhấp
    imageInput.addEventListener('click', function () {
        setTimeout(() => {
            this.value = '';
        }, 0);
    });

    // Validation cơ bản trước khi submit
    function validateForm() {
        const manufactureDate = document.getElementById('manufactureDate').value;
        const expirationDate = document.getElementById('expirationDate').value;

        if (!manufactureDate || !expirationDate) {
            alert('Vui lòng điền đầy đủ ngày sản xuất và ngày hết hạn!');
            return false;
        }

        const manufactureDateObj = new Date(manufactureDate);
        const expirationDateObj = new Date(expirationDate);
        if (expirationDateObj <= manufactureDateObj) {
            alert('Ngày hết hạn phải sau ngày sản xuất!');
            return false;
        }

        return true;
    }

    // Gắn sự kiện submit cho form
    productEditForm.addEventListener('submit', function (event) {
        if (!validateForm()) {
            event.preventDefault(); // Ngăn form submit nếu validation thất bại
        }
    });
});
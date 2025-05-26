document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const customButton = document.getElementById('customButton');
    const fileNameDisplay = document.getElementById('fileName');
    const createUserForm = document.getElementById('createUserForm');
    let selectedFile = null;

    // Click vào nút tùy chỉnh để kích hoạt input file
    customButton.addEventListener('click', function () {
        imageInput.click();
    });

    // Hiển thị ảnh được chọn
    function displayImage(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                selectedFile = input.files[0];
                imagePreview.style.display = 'block';
                fileNameDisplay.textContent = input.files[0].name;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    // Khôi phục ảnh mặc định nếu không chọn file
    function restoreDefaultImage() {
        imagePreview.src = 'https://via.placeholder.com/150';
        fileNameDisplay.textContent = "Chưa có file được chọn";
    }

    // Xử lý khi file input thay đổi
    imageInput.addEventListener('change', function () {
        if (this.files.length > 0) {
            displayImage(this);
        } else {
            restoreDefaultImage();
        }
    });

    // Đặt lại input file khi nhấp
    imageInput.addEventListener('click', function () {
        setTimeout(() => {
            this.value = '';
        }, 0);
    });

    // Validation cơ bản trước khi submit
    createUserForm.addEventListener('submit', function (event) {
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Vui lòng nhập email hợp lệ!');
            event.preventDefault();
            return;
        }

        // Kiểm tra định dạng số điện thoại (ví dụ: 10 số)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            alert('Vui lòng nhập số điện thoại hợp lệ (10 chữ số)!');
            event.preventDefault();
            return;
        }

        // Kiểm tra mật khẩu (ít nhất 6 ký tự)
        const password = document.getElementById('password').value;
        if (password.length < 6) {
            alert('Mật khẩu phải có ít nhất 6 ký tự!');
            event.preventDefault();
            return;
        }
    });
});
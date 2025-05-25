document.addEventListener('DOMContentLoaded', function () {
    // Tab switching
    function toggleTab(event, tabId) {
        event.preventDefault();
        const tabs = document.querySelectorAll(".myaccount-tab-menu a");
        tabs.forEach(tab => tab.classList.remove("active"));
        const tabContents = document.querySelectorAll(".tab-pane");
        tabContents.forEach(content => content.classList.remove("active"));
        event.currentTarget.classList.add("active");
        document.getElementById(tabId).classList.add("active");
    }

    // Expose toggleTab to global scope for inline onclick
    window.toggleTab = toggleTab;

    // Image upload handling
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const customButton = document.getElementById('customButton');
    const fileNameDisplay = document.getElementById('fileName');
    let selectedFile = null;
    let previousImageUrl = imagePreview.src === "#" ? null : imagePreview.src;

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
                imagePreview.style.display = 'block';
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

    // Xử lý khi người dùng nhấp vào input file
    imageInput.addEventListener('click', function () {
        setTimeout(() => {
            this.value = '';
        }, 0);
    });

    // Xử lý xóa địa chỉ
    function confirmDelete(addressId) {
        if (confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) {
            fetch(`/customer/personal-info/address/delete/${addressId}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        alert("Địa chỉ đã được xóa thành công!");
                        location.reload();
                    } else {
                        alert("Đã xảy ra lỗi khi xóa địa chỉ.");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Không thể xóa địa chỉ. Vui lòng thử lại.");
                });
        }
    }

    // Expose confirmDelete to global scope for inline onclick
    window.confirmDelete = confirmDelete;
});

document.querySelector('.myaccount-tab-menu').addEventListener('click', function (e) {
    const target = e.target.closest('a');
    if (target) {
        const tabId = target.getAttribute('href').substring(1);
        toggleTab(e, tabId);
    }
});

document.querySelector('.address-cards').addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-delete')) {
        const addressId = e.target.getAttribute('data-address-id');
        confirmDelete(addressId);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const voucherAddForm = document.getElementById("voucherAddForm");
    const voucherCodeInput = document.getElementById("voucherCode");
    const codeError = document.getElementById("codeError");
    let isCodeValid = true; // Biến để theo dõi trạng thái mã giảm giá

    // Kiểm tra mã giảm giá có trùng hay không
    function checkDuplicateCode() {
        const voucherCode = voucherCodeInput.value.trim();

        if (voucherCode === "") {
            codeError.style.display = "none"; // Không cần kiểm tra nếu chưa nhập
            isCodeValid = true;
            return;
        }

        fetch(`/admin/vouchers/check-duplicate?code=${voucherCode}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.exists) {
                    codeError.style.display = "block";
                    isCodeValid = false;
                } else {
                    codeError.style.display = "none";
                    isCodeValid = true;
                }
            })
            .catch(error => {
                console.error('Có lỗi khi kiểm tra mã giảm giá:', error);
                codeError.textContent = "Lỗi kiểm tra mã giảm giá!";
                codeError.style.display = "block";
                isCodeValid = false;
            });
    }

    // Gắn sự kiện onblur cho input mã giảm giá
    voucherCodeInput.addEventListener("blur", checkDuplicateCode);

    // Kiểm tra các điều kiện trước khi gửi form
    function validateForm() {
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;
        const startDateError = document.getElementById("startDateError");
        const endDateError = document.getElementById("endDateError");
        const dateError = document.getElementById("dateError");

        let isValid = true;

        // Kiểm tra ngày hiệu lực không để trống
        if (!startDate) {
            startDateError.style.display = "block";
            isValid = false;
        } else {
            startDateError.style.display = "none";
        }

        // Kiểm tra ngày hết hạn không để trống
        if (!endDate) {
            endDateError.style.display = "block";
            isValid = false;
        } else {
            endDateError.style.display = "none";
        }

        // Kiểm tra ngày hiệu lực phải nhỏ hơn ngày hết hạn
        if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
            dateError.style.display = "block";
            isValid = false;
        } else {
            dateError.style.display = "none";
        }

        // Kiểm tra mã giảm giá trùng lặp
        if (!isCodeValid) {
            alert("Mã giảm giá đã tồn tại! Vui lòng chọn mã khác.");
            isValid = false;
        }

        return isValid;
    }

    // Gắn sự kiện submit cho form
    voucherAddForm.addEventListener("submit", function (event) {
        if (!validateForm()) {
            event.preventDefault(); // Ngăn form submit nếu validation thất bại
        }
    });
});
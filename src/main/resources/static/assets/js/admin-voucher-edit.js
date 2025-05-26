document.addEventListener("DOMContentLoaded", function () {
    const voucherEditForm = document.getElementById("voucherEditForm");
    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");
    const startDateError = document.getElementById("startDateError");
    const endDateError = document.getElementById("endDateError");
    const dateError = document.getElementById("dateError");

    // Khởi tạo flatpickr cho ngày hiệu lực
    flatpickr("#startDate", {
        enableTime: true,
        time_24hr: true,
        dateFormat: "Y-m-d H:i", // Định dạng phù hợp với input type="text"
        defaultDate: startDateInput.value || new Date(), // Sử dụng giá trị từ Thymeleaf hoặc ngày hiện tại
        allowInput: true // Cho phép nhập liệu thủ công
    });

    // Khởi tạo flatpickr cho ngày hết hạn
    flatpickr("#endDate", {
        enableTime: true,
        time_24hr: true,
        dateFormat: "Y-m-d H:i", // Định dạng phù hợp với input type="text"
        defaultDate: endDateInput.value || new Date(), // Sử dụng giá trị từ Thymeleaf hoặc ngày hiện tại
        allowInput: true // Cho phép nhập liệu thủ công
    });

    // Hàm validate form
    function validateForm() {
        let isValid = true;

        // Kiểm tra ngày hiệu lực không để trống
        if (!startDateInput.value) {
            startDateError.style.display = "block";
            isValid = false;
        } else {
            startDateError.style.display = "none";
        }

        // Kiểm tra ngày hết hạn không để trống
        if (!endDateInput.value) {
            endDateError.style.display = "block";
            isValid = false;
        } else {
            endDateError.style.display = "none";
        }

        // Kiểm tra ngày hiệu lực phải nhỏ hơn ngày hết hạn
        if (startDateInput.value && endDateInput.value && new Date(startDateInput.value) >= new Date(endDateInput.value)) {
            dateError.style.display = "block";
            isValid = false;
        } else {
            dateError.style.display = "none";
        }

        return isValid;
    }

    // Gắn sự kiện submit cho form
    voucherEditForm.addEventListener("submit", function (event) {
        if (!validateForm()) {
            event.preventDefault(); // Ngăn form submit nếu validation thất bại
            alert("Vui lòng kiểm tra lại các trường ngày!");
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {

    const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');
    const csrfHeader = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');

    // Hàm cho reCAPTCHA
    window.enableBtn = function () {
        document.getElementById("sendMail").disabled = false;
    };

    function registerFormCheck() {
        const captchaResponse = grecaptcha.getResponse();
        const captchaError = document.getElementById("captchaError");
        if (!captchaResponse) {
            captchaError.style.display = "block";
            captchaError.innerText = "Please complete the CAPTCHA.";
            return false;
        }
        captchaError.style.display = "none";
        return true;
    }

    // Gắn sự kiện cho form
    const resetForm = document.getElementById('resetForm');
    if (resetForm) {
        resetForm.addEventListener('submit', function (event) {
            if (!registerFormCheck()) {
                event.preventDefault();
            }
        });
    }
});
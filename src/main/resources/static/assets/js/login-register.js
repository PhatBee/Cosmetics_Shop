document.addEventListener('DOMContentLoaded', function () {

    const csrfToken = document.querySelector('meta[name="_csrf"]').content;
    const csrfHeader = document.querySelector('meta[name="_csrf_header"]').content;

    // Xóa sessionStorage và ghi log
    sessionStorage.clear();
    console.log("messageLogin: " + sessionStorage.length);

    // Định nghĩa contextPath
    const contextPath = window.location.origin + '/';

    // Hàm cho reCAPTCHA
    window.enableBtn = function () {
        document.getElementById("registerBtn").disabled = false;
    };

    function registerFormCheck() {
        const captchaResponse = grecaptcha.getResponse();
        if (!captchaResponse) {
            const captchaError = document.getElementById("captchaError");
            captchaError.style.display = "block";
            captchaError.innerText = "Please complete the CAPTCHA.";
            return false;
        }
        document.getElementById("captchaError").style.display = "none";
        return true;
    }

    // Gắn sự kiện cho form đăng ký để kiểm tra reCAPTCHA
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            if (!registerFormCheck()) {
                event.preventDefault();
            }
        });
    }

    // AJAX cho đăng nhập (nếu bỏ comment để sử dụng)
    /*
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            $.ajax({
                url: contextPath + 'api/v1/auth/login',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ username: username, password: password }),
                success: function (response) {
                    try {
                        localStorage.setItem('token', JSON.stringify(response));
                        showModalWithMessage("Đăng nhập thành công!");
                        document.getElementById('okButton').addEventListener('click', function () {
                            window.location.href = '/';
                        });
                    } catch (e) {
                        console.log(response);
                    }
                },
                error: function (xhr, status, error) {
                    try {
                        showModalWithMessage(xhr.responseText);
                        document.getElementById('okButton').addEventListener('click', function () {
                            $('#customModal').modal('hide');
                        });
                    } catch (e) {
                        console.log(xhr.responseText);
                    }
                }
            });
        });
    }
    */

    // AJAX cho đăng ký (nếu bỏ comment để sử dụng)
    /*
    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const regFullname = document.getElementById('regFullname').value;
            const regUsername = document.getElementById('regUsername').value;
            const regEmail = document.getElementById('regEmail').value;
            const regPassword = document.getElementById('regPassword').value;
            const gresponse = document.getElementById('g-recaptcha-response').value;
            const formData = {
                fullname: regFullname,
                email: regEmail,
                username: regUsername,
                password: regPassword,
                gresponse: gresponse
            };

            $.ajax({
                url: contextPath + 'auth/register',
                type: 'POST',
                headers: { [csrfHeader]: csrfToken },
                data: formData,
                success: function (response) {
                    showModalWithMessage(response);
                },
                error: function (xhr, status, error) {
                    showModalWithMessage(xhr.responseText);
                }
            });
        });
    }
    */
});
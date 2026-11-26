const { registerCustomer } = window.RentGoStore;

const form = document.getElementById("registerForm");
const errorBox = document.getElementById("registerError");
const passwordInput = document.getElementById("registerPassword");
const togglePassword = document.getElementById("toggleRegisterPassword");
const passwordIcon = document.getElementById("registerPasswordIcon");

function showError(message) {
    errorBox.classList.remove("hidden");
    const span = errorBox.querySelector("span");
    if (span) span.textContent = message;
    else errorBox.textContent = message;
}

function resetButton(button) {
    button.disabled = false;
    button.textContent = "Create Account";
}

togglePassword?.addEventListener("click", () => {
    const hidden = passwordInput.type === "password";
    passwordInput.type = hidden ? "text" : "password";
    passwordIcon?.classList.toggle("fa-eye");
    passwordIcon?.classList.toggle("fa-eye-slash");
});

form?.addEventListener("submit", event => {
    event.preventDefault();
    errorBox.classList.add("hidden");

    const fullName = document.getElementById("registerName").value.trim();
    const phone = document.getElementById("registerPhone").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = passwordInput.value;
    const confirmPassword = document.getElementById("registerConfirmPassword").value;

    if (password.length < 6) {
        showError("Password must contain at least 6 characters.");
        return;
    }
    if (password !== confirmPassword) {
        showError("Passwords do not match.");
        return;
    }

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Creating Account...';

    const result = registerCustomer({ full_name: fullName, phone, email, password });
    if (!result.ok) {
        showError(result.error);
        resetButton(button);
        return;
    }

    localStorage.setItem("rentgo_customer_phone", phone);
    window.location.href = "../index.html";
});

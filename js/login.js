const { getSession, loginUser } = window.RentGoStore;

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("loginEmail");
const passwordInput = document.getElementById("loginPassword");
const errorBox = document.getElementById("loginError");
const togglePassword = document.getElementById("toggleLoginPassword");
const passwordIcon = document.getElementById("loginPasswordIcon");

function showError(message) {
    errorBox.classList.remove("hidden");
    const span = errorBox.querySelector("span");
    if (span) span.textContent = message;
    else errorBox.textContent = message;
}

function hideError() {
    errorBox.classList.add("hidden");
}

function routeSession(session) {
    if (!session) return;
    if (session.role === "admin") {
        window.location.replace("pages/dashboard.html");
        return;
    }
    const returnTo = sessionStorage.getItem("rentgo_return_to");
    sessionStorage.removeItem("rentgo_return_to");
    if (returnTo) {
        try {
            const url = new URL(returnTo, window.location.href);
            if (url.origin === window.location.origin && url.pathname.includes("/user/")) {
                window.location.href = url.href;
                return;
            }
        } catch {}
    }
    window.location.replace("index.html");
}

togglePassword?.addEventListener("click", () => {
    const hidden = passwordInput.type === "password";
    passwordInput.type = hidden ? "text" : "password";
    passwordIcon?.classList.toggle("fa-eye");
    passwordIcon?.classList.toggle("fa-eye-slash");
});

loginForm?.addEventListener("submit", event => {
    event.preventDefault();
    hideError();
    const button = loginForm.querySelector('button[type="submit"]');
    if (button) {
        button.disabled = true;
        button.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Signing In...';
    }

    const result = loginUser(emailInput.value, passwordInput.value);
    if (!result.ok) {
        showError(result.error);
        if (button) {
            button.disabled = false;
            button.textContent = "Sign In";
        }
        return;
    }
    routeSession(result.user);
});

const existing = getSession();
if (existing) routeSession(existing);

const { loginUser } = window.RentGoStore;

const form = document.getElementById("customerLoginForm");
const email = document.getElementById("customerLoginEmail");
const password = document.getElementById("customerLoginPassword");
const errorBox = document.getElementById("customerLoginError");
const toggle = document.getElementById("toggleCustomerPassword");
const icon = document.getElementById("customerPasswordIcon");

toggle?.addEventListener("click", () => {
    const hidden = password.type === "password";
    password.type = hidden ? "text" : "password";
    icon?.classList.toggle("fa-eye");
    icon?.classList.toggle("fa-eye-slash");
});

form?.addEventListener("submit", event => {
    event.preventDefault();
    errorBox?.classList.add("hidden");
    const result = loginUser(email.value, password.value);
    if (!result.ok || result.user.role !== "customer") {
        if (result.user?.role === "admin") localStorage.removeItem("rentgo_local_session_v3");
        errorBox?.classList.remove("hidden");
        const span = errorBox?.querySelector("span");
        if (span) span.textContent = "Invalid customer email or password.";
        return;
    }
    window.location.replace("../index.html");
});

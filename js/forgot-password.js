const { ADMIN_CREDENTIALS, getDB, setResetEmail } = window.RentGoStore;

const form = document.getElementById("forgotPasswordForm");
const emailInput = document.getElementById("forgotEmail");
const messageBox = document.getElementById("forgotMessage");

function message(text, ok = true) {
    messageBox.className = `rounded-xl px-4 py-3 text-sm mb-5 ${ok ? "bg-lime-50 border border-lime-200 text-lime-800" : "bg-red-50 border border-red-200 text-red-700"}`;
    messageBox.textContent = text;
}

form?.addEventListener("submit", event => {
    event.preventDefault();
    const email = emailInput.value.trim().toLowerCase();
    if (email === ADMIN_CREDENTIALS.email.toLowerCase()) {
        message("The demo administrator password is fixed and cannot be reset here.", false);
        return;
    }
    const exists = getDB().users.some(u => String(u.email).toLowerCase() === email);
    if (!exists) {
        message("No customer account was found for this email.", false);
        return;
    }
    setResetEmail(email);
    message("Account found. Continue to create a new password.");
    setTimeout(() => window.location.href = "reset-password.html", 500);
});

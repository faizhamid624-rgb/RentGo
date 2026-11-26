const { clearResetEmail, getResetEmail, updatePassword } = window.RentGoStore;

const form = document.getElementById("resetPasswordForm");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmNewPassword");
const messageBox = document.getElementById("resetMessage");

function message(text, ok = false) {
    messageBox.className = `rounded-xl px-4 py-3 text-sm mb-5 ${ok ? "bg-lime-50 border border-lime-200 text-lime-800" : "bg-red-50 border border-red-200 text-red-700"}`;
    messageBox.textContent = text;
}

form?.addEventListener("submit", event => {
    event.preventDefault();
    const email = getResetEmail();
    if (!email) {
        message("Please start from Forgot Password first.");
        return;
    }
    if (newPassword.value.length < 6) {
        message("Password must contain at least 6 characters.");
        return;
    }
    if (newPassword.value !== confirmPassword.value) {
        message("Passwords do not match.");
        return;
    }
    const result = updatePassword(email, newPassword.value);
    if (!result.ok) {
        message(result.error);
        return;
    }
    clearResetEmail();
    message("Password updated. You can sign in now.", true);
    setTimeout(() => window.location.href = "login.html", 600);
});

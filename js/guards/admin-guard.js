const { getSession, logout } = window.RentGoStore;

const session = getSession();
if (!session || session.role !== "admin") {
    window.location.replace("../login.html");
} else {
    document.querySelectorAll("[data-admin-name]").forEach(el => {
        el.textContent = session.full_name || "Administrator";
    });
}

document.addEventListener("click", event => {
    const button = event.target.closest("[data-logout]");
    if (!button) return;
    logout();
    window.location.replace("../login.html");
});

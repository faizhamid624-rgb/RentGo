const { getSession, logout } = window.RentGoStore;

const isUserPage = window.location.pathname.includes("/user/");
const rootPath = file => isUserPage ? `../${file}` : file;
const session = getSession();

const guestAreas = document.querySelectorAll("[data-customer-guest], [data-auth-guest]");
const accountAreas = document.querySelectorAll("[data-customer-account], [data-auth-user]");

if (session?.role === "customer") {
    guestAreas.forEach(el => el.classList.add("hidden"));
    accountAreas.forEach(el => {
        el.classList.remove("hidden");
        if (el.hasAttribute("data-customer-account")) el.classList.add("flex");
    });
    document.querySelectorAll("[data-customer-name]").forEach(el => {
        el.textContent = (session.full_name || "Customer").trim().split(/\s+/)[0];
    });
} else {
    guestAreas.forEach(el => el.classList.remove("hidden"));
    accountAreas.forEach(el => {
        el.classList.add("hidden");
        el.classList.remove("flex");
    });
}

document.addEventListener("click", event => {
    const button = event.target.closest("[data-customer-logout]");
    if (!button) return;
    logout();
    localStorage.removeItem("rentgo_customer_phone");
    window.location.replace(rootPath("index.html"));
});

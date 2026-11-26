const { getDB } = window.RentGoStore;

const db = getDB();
const modelDropdown = document.getElementById("modelDropdown");
const modelDropdownBtn = document.getElementById("modelDropdownBtn");
const modelDropdownMenu = document.getElementById("modelDropdownMenu");
const modelDropdownList = document.getElementById("modelDropdownList");
const selectedModelText = document.getElementById("selectedModelText");
const heroSearchForm = document.getElementById("heroSearchForm");
const heroSearchInput = document.getElementById("heroSearchInput");
let selectedModel = "";

function loadModels() {
    if (!modelDropdownList) return;
    const models = [...new Set(db.cars.filter(c => c.status === "available").map(c => c.model).filter(Boolean))].sort();
    modelDropdownList.innerHTML = `
        <button type="button" class="hero-model-option" data-model="">All Models</button>
        ${models.map(model => `<button type="button" class="hero-model-option" data-model="${model}">${model}</button>`).join("")}
    `;
}

modelDropdownBtn?.addEventListener("click", event => {
    event.stopPropagation();
    modelDropdownMenu?.classList.toggle("hidden");
    modelDropdownBtn.classList.toggle("open");
});

modelDropdownList?.addEventListener("click", event => {
    const option = event.target.closest(".hero-model-option");
    if (!option) return;
    selectedModel = option.dataset.model || "";
    if (selectedModelText) selectedModelText.textContent = selectedModel || "Models";
    modelDropdownList.querySelectorAll(".hero-model-option").forEach(el => el.classList.remove("active"));
    option.classList.add("active");
    modelDropdownMenu?.classList.add("hidden");
    modelDropdownBtn?.classList.remove("open");
});

document.addEventListener("click", event => {
    if (modelDropdown && !modelDropdown.contains(event.target)) {
        modelDropdownMenu?.classList.add("hidden");
        modelDropdownBtn?.classList.remove("open");
    }
});

heroSearchForm?.addEventListener("submit", event => {
    event.preventDefault();
    const params = new URLSearchParams();
    const search = heroSearchInput?.value.trim() || "";
    if (selectedModel) params.set("model", selectedModel);
    if (search) params.set("search", search);
    window.location.href = `user/cars.html${params.toString() ? `?${params}` : ""}`;
});

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

setText("aboutTotalBookings", db.bookings.length);
setText("aboutTotalCars", db.cars.length);
setText("aboutTotalCustomers", db.customers.length);
setText("aboutAvailableCars", db.cars.filter(c => c.status === "available").length);

loadModels();

const { getDB, resolveCarImage } = window.RentGoStore;

const carGrid = document.getElementById("carGrid");
const carSearch = document.getElementById("carSearch");
const categoryFilter = document.getElementById("categoryFilter");
const transmissionFilter = document.getElementById("transmissionFilter");
const priceFilter = document.getElementById("priceFilter");
const sortCars = document.getElementById("sortCars");
const carResultCount = document.getElementById("carResultCount");

const params = new URLSearchParams(window.location.search);
carSearch.value = [params.get("search") || "", params.get("model") || ""].filter(Boolean).join(" ");

let cars = getDB().cars.filter(car => car.status === "available");

function applyFilters() {
    const searchValue = carSearch.value.trim().toLowerCase();
    const terms = searchValue.split(/\s+/).filter(Boolean);
    const category = categoryFilter.value;
    const transmission = transmissionFilter.value;
    const maxPrice = Number(priceFilter.value);

    let filtered = cars.filter(car => {
        const haystack = `${car.brand} ${car.model} ${car.plate_number} ${car.category} ${car.transmission} ${car.color}`.toLowerCase();
        return terms.every(term => haystack.includes(term)) &&
            (!category || car.category === category) &&
            (!transmission || car.transmission === transmission) &&
            (!maxPrice || Number(car.price_per_day) <= maxPrice);
    });

    if (sortCars.value === "price-low") filtered.sort((a,b) => a.price_per_day - b.price_per_day);
    if (sortCars.value === "price-high") filtered.sort((a,b) => b.price_per_day - a.price_per_day);
    if (sortCars.value === "newest") filtered.sort((a,b) => b.year - a.year);
    renderCars(filtered);
}

function renderCars(data) {
    carResultCount.textContent = `${data.length} vehicle${data.length === 1 ? "" : "s"} available`;
    if (!data.length) {
        carGrid.innerHTML = `<div class="col-span-full border border-white/10 bg-white/[0.04] rounded-2xl py-16 text-center"><h4 class="font-semibold text-white">No cars found</h4><p class="text-sm text-white/50 mt-2">Try changing your search or filters.</p></div>`;
        return;
    }

    carGrid.innerHTML = data.map(car => {
        const image = resolveCarImage(car, "../images/");
        return `<article class="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 transition">
            <div class="h-56 bg-black/40 overflow-hidden flex items-center justify-center">
                ${image ? `<img src="${image}" alt="${car.brand} ${car.model}" class="w-full h-full object-cover">` : `<i class="fa-solid fa-car-side text-6xl text-white/20"></i>`}
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start gap-4">
                    <div><p class="text-xs uppercase font-semibold text-[#d7df00]">${car.category}</p><h4 class="text-xl font-bold text-white mt-1">${car.brand} ${car.model}</h4><p class="text-xs text-white/40 mt-1">${car.plate_number}</p></div>
                    <span class="status-badge status-available">Available</span>
                </div>
                <div class="grid grid-cols-3 gap-3 mt-5 border-y border-white/10 py-4 text-sm">
                    <div><p class="text-white/40 text-xs">Transmission</p><p class="font-medium mt-1">${car.transmission}</p></div>
                    <div><p class="text-white/40 text-xs">Seats</p><p class="font-medium mt-1">${car.seats}</p></div>
                    <div><p class="text-white/40 text-xs">Year</p><p class="font-medium mt-1">${car.year}</p></div>
                </div>
                <div class="flex items-end justify-between mt-5">
                    <div><p class="text-xs text-white/40">Rental rate</p><p class="text-2xl font-bold text-white">RM ${Number(car.price_per_day).toFixed(2)} <span class="text-sm font-normal text-white/40">/ day</span></p></div>
                    <a href="car-details.html?id=${car.id}" class="bg-[#d7df00] text-black px-5 py-2.5 rounded-lg text-sm font-semibold">View Details</a>
                </div>
            </div>
        </article>`;
    }).join("");
}

[carSearch, categoryFilter, transmissionFilter, priceFilter, sortCars].forEach(el => {
    el?.addEventListener(el === carSearch ? "input" : "change", applyFilters);
});

applyFilters();

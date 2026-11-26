const { getDB, saveDB, nextId, resolveCarImage, formatMoney } = window.RentGoStore;

const body = document.getElementById("vehicleTableBody");
const search = document.getElementById("vehicleSearch");
const filter = document.getElementById("statusFilter");
const modal = document.getElementById("vehicleModal");
const form = document.getElementById("vehicleForm");

const openModal = () => { modal.classList.remove("hidden"); modal.classList.add("flex"); };
const closeModal = () => { modal.classList.add("hidden"); modal.classList.remove("flex"); form.reset(); };

document.getElementById("addVehicleBtn")?.addEventListener("click", openModal);
document.getElementById("closeVehicleModal")?.addEventListener("click", closeModal);
document.getElementById("cancelVehicleBtn")?.addEventListener("click", closeModal);
modal?.addEventListener("click", e => { if (e.target === modal) closeModal(); });

function render() {
    const db = getDB();
    const q = (search.value || "").toLowerCase();
    const status = (filter.value || "").toLowerCase();
    const rows = db.cars.filter(c => `${c.brand} ${c.model} ${c.plate_number} ${c.category}`.toLowerCase().includes(q) && (!status || c.status === status));
    document.getElementById("fleetTotalCount").textContent = db.cars.length;
    document.getElementById("fleetAvailableSummary").textContent = db.cars.filter(c => c.status === "available").length;
    document.getElementById("fleetRentedSummary").textContent = db.cars.filter(c => c.status === "rented").length;
    document.getElementById("fleetMaintenanceSummary").textContent = db.cars.filter(c => c.status === "maintenance").length;
    body.innerHTML = rows.map(c => {
        const image = resolveCarImage(c, "../images/");
        return `<tr class="hover:bg-slate-50/5"><td class="px-6 py-4"><div class="flex items-center gap-3"><div class="w-14 h-10 rounded-lg overflow-hidden bg-black/20">${image ? `<img src="${image}" class="w-full h-full object-cover">` : ""}</div><div><p class="font-semibold">${c.brand} ${c.model}</p><p class="text-xs opacity-50">${c.transmission} · ${c.seats} seats</p></div></div></td><td class="px-6 py-4">${c.plate_number}</td><td class="px-6 py-4">${c.category}</td><td class="px-6 py-4">${c.year}</td><td class="px-6 py-4 font-semibold">${formatMoney(c.price_per_day)}</td><td class="px-6 py-4"><select data-car-status="${c.id}" class="form-input py-2"><option value="available" ${c.status==='available'?'selected':''}>Available</option><option value="reserved" ${c.status==='reserved'?'selected':''}>Reserved</option><option value="rented" ${c.status==='rented'?'selected':''}>Rented</option><option value="maintenance" ${c.status==='maintenance'?'selected':''}>Maintenance</option><option value="inactive" ${c.status==='inactive'?'selected':''}>Inactive</option></select></td><td class="px-6 py-4 text-right"><button data-delete-car="${c.id}" class="text-sm text-red-400 hover:text-red-300">Delete</button></td></tr>`;
    }).join("") || `<tr><td colspan="7" class="px-6 py-10 text-center opacity-50">No vehicles found.</td></tr>`;
}

form?.addEventListener("submit", e => {
    e.preventDefault();
    const fields = [...form.querySelectorAll("input, select, textarea")];
    const [brand, model, plate, year, category, transmission, seats, rate, status, color, notes] = fields.map(x => x.value.trim());
    if (!brand || !model || !plate || !rate) return alert("Please complete the required vehicle information.");
    const db = getDB();
    if (db.cars.some(c => c.plate_number.toLowerCase() === plate.toLowerCase())) return alert("Plate number already exists.");
    db.cars.push({id:nextId(db.cars),brand,model,plate_number:plate.toUpperCase(),year:Number(year)||new Date().getFullYear(),category:category||"Sedan",transmission:transmission||"Automatic",seats:Number(seats)||5,color,price_per_day:Number(rate)||0,status:(status||"Available").toLowerCase(),image_url:"",notes,created_at:new Date().toISOString()});
    saveDB(db); closeModal(); render();
});

body?.addEventListener("change", e => {
    const id = Number(e.target.dataset.carStatus); if (!id) return;
    const db = getDB(); const car = db.cars.find(c => c.id === id); if (!car) return;
    car.status = e.target.value; saveDB(db); render();
});
body?.addEventListener("click", e => {
    const id = Number(e.target.dataset.deleteCar); if (!id) return;
    if (!confirm("Delete this vehicle?")) return;
    const db = getDB(); db.cars = db.cars.filter(c => c.id !== id); saveDB(db); render();
});
search?.addEventListener("input", render); filter?.addEventListener("change", render); render();

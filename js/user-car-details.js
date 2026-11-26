const { getDB, resolveCarImage } = window.RentGoStore;

const params = new URLSearchParams(window.location.search);
const carId = Number(params.get("id"));
const db = getDB();
const car = db.cars.find(c => c.id === carId);

const ids = id => document.getElementById(id);
const pickupDate = ids("detailPickupDate");
const returnDate = ids("detailReturnDate");

if (!car) {
    ids("carName").textContent = "Vehicle not found";
} else {
    ids("carCategory").textContent = car.category || "Vehicle";
    ids("carName").textContent = `${car.brand} ${car.model}`;
    ids("carPlate").textContent = car.plate_number;
    ids("carTransmission").textContent = car.transmission || "-";
    ids("carSeats").textContent = `${car.seats || "-"} Seats`;
    ids("carYear").textContent = car.year || "-";
    ids("carColor").textContent = car.color || "-";
    ids("carNotes").textContent = car.notes || "No additional vehicle notes available.";
    ids("carPrice").textContent = Number(car.price_per_day).toFixed(2);
    ids("detailRate").textContent = `RM ${Number(car.price_per_day).toFixed(2)}`;
    const image = resolveCarImage(car, "../images/");
    if (image) ids("carImageContainer").innerHTML = `<img src="${image}" alt="${car.brand} ${car.model}" class="w-full h-full object-cover">`;
}

function calculateTotal() {
    if (!car || !pickupDate.value || !returnDate.value) {
        ids("detailDays").textContent = "0 days";
        ids("detailTotal").textContent = "RM 0.00";
        return;
    }
    const days = Math.ceil((new Date(returnDate.value) - new Date(pickupDate.value)) / 86400000);
    if (days <= 0) {
        ids("detailDays").textContent = "Invalid dates";
        ids("detailTotal").textContent = "RM 0.00";
        return;
    }
    ids("detailDays").textContent = `${days} ${days === 1 ? "day" : "days"}`;
    ids("detailTotal").textContent = `RM ${(days * Number(car.price_per_day)).toFixed(2)}`;
}

pickupDate?.addEventListener("change", calculateTotal);
returnDate?.addEventListener("change", calculateTotal);
ids("detailBookingForm")?.addEventListener("submit", event => {
    event.preventDefault();
    if (!car || !pickupDate.value || !returnDate.value || new Date(returnDate.value) <= new Date(pickupDate.value)) {
        alert("Please select valid rental dates.");
        return;
    }
    const p = new URLSearchParams({ car: car.id, pickup: pickupDate.value, return: returnDate.value });
    window.location.href = `booking.html?${p}`;
});

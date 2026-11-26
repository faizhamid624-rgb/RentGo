const { getDB, saveDB, getSession, getCurrentCustomer, nextId, nextBookingCode, resolveCarImage } = window.RentGoStore;

const params = new URLSearchParams(window.location.search);
const carId = Number(params.get("car"));
const pickupDate = params.get("pickup");
const returnDate = params.get("return");
const db = getDB();
const car = db.cars.find(c => c.id === carId);
const session = getSession();
const form = document.getElementById("customerBookingForm");
const el = id => document.getElementById(id);

if (!session || session.role !== "customer") {
    sessionStorage.setItem("rentgo_return_to", window.location.href);
    window.location.replace("../login.html");
}

if (!car || !pickupDate || !returnDate) window.location.replace("cars.html");

const days = Math.ceil((new Date(returnDate) - new Date(pickupDate)) / 86400000);
const total = days * Number(car.price_per_day);
const existingCustomer = getCurrentCustomer(db);

el("summaryCarCategory").textContent = car?.category || "Vehicle";
el("summaryCarName").textContent = car ? `${car.brand} ${car.model}` : "-";
el("summaryCarPlate").textContent = car?.plate_number || "-";
el("summaryPickup").textContent = pickupDate || "-";
el("summaryReturn").textContent = returnDate || "-";
el("summaryDays").textContent = `${days} ${days === 1 ? "day" : "days"}`;
el("summaryRate").textContent = `RM ${Number(car?.price_per_day || 0).toFixed(2)}`;
el("summaryTotal").textContent = `RM ${Number(total || 0).toFixed(2)}`;
const image = resolveCarImage(car, "../images/");
if (image) el("summaryCarImage").innerHTML = `<img src="${image}" alt="${car.brand} ${car.model}" class="w-full h-full object-cover">`;

el("bookingName").value = existingCustomer?.full_name || session?.full_name || "";
el("bookingPhone").value = existingCustomer?.phone || session?.phone || "";
el("bookingEmail").value = existingCustomer?.email || session?.email || "";
el("bookingIdentity").value = existingCustomer?.identity_number || "";
el("bookingLicence").value = existingCustomer?.driving_license_number || "";
el("bookingAddress").value = existingCustomer?.address || "";

form?.addEventListener("submit", event => {
    event.preventDefault();
    const latest = getDB();
    let customer = latest.customers.find(c => c.user_id === session.id) || latest.customers.find(c => c.email.toLowerCase() === session.email.toLowerCase());
    const payload = {
        full_name: el("bookingName").value.trim(),
        phone: el("bookingPhone").value.trim(),
        email: el("bookingEmail").value.trim(),
        identity_number: el("bookingIdentity").value.trim(),
        driving_license_number: el("bookingLicence").value.trim(),
        address: el("bookingAddress").value.trim(),
        status: "active"
    };

    if (!customer) {
        customer = { id: nextId(latest.customers), user_id: session.id, ...payload, notes: "", created_at: new Date().toISOString() };
        latest.customers.push(customer);
    } else {
        Object.assign(customer, payload, { user_id: session.id });
    }

    const code = nextBookingCode(latest);
    latest.bookings.push({
        id: nextId(latest.bookings), booking_code: code, customer_id: customer.id, car_id: car.id,
        pickup_date: pickupDate, return_date: returnDate, total_days: days,
        price_per_day: Number(car.price_per_day), total_amount: total,
        booking_status: "pending", payment_status: "unpaid",
        pickup_location: el("bookingPickupLocation").value,
        pickup_time: el("bookingPickupTime").value,
        notes: el("bookingNotes").value.trim(), created_at: new Date().toISOString()
    });
    const latestCar = latest.cars.find(c => c.id === car.id);
    if (latestCar) latestCar.status = "reserved";
    saveDB(latest);
    localStorage.setItem("rentgo_customer_phone", customer.phone);
    localStorage.setItem("rentgo_last_booking", code);
    window.location.href = `booking-success.html?code=${encodeURIComponent(code)}`;
});

const { getDB, formatDate } = window.RentGoStore;

const code = new URLSearchParams(window.location.search).get("code");
const db = getDB();
const booking = db.bookings.find(b => b.booking_code === code);
const el = id => document.getElementById(id);
if (!booking) {
    el("successBookingCode").textContent = "Booking not found";
} else {
    const car = db.cars.find(c => c.id === booking.car_id);
    const customer = db.customers.find(c => c.id === booking.customer_id);
    el("successBookingCode").textContent = booking.booking_code;
    el("successBookingStatus").textContent = booking.booking_status[0].toUpperCase() + booking.booking_status.slice(1);
    el("successVehicle").textContent = `${car?.brand || ""} ${car?.model || ""}`;
    el("successPlate").textContent = car?.plate_number || "-";
    el("successCustomer").textContent = customer?.full_name || "-";
    el("successPickup").textContent = formatDate(booking.pickup_date);
    el("successReturn").textContent = formatDate(booking.return_date);
    el("successDays").textContent = `${booking.total_days} ${booking.total_days === 1 ? "day" : "days"}`;
    el("successTotal").textContent = `RM ${Number(booking.total_amount).toFixed(2)}`;
}

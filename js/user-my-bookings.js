const { getDB, getSession, getCurrentCustomer, resolveCarImage, formatDate } = window.RentGoStore;

const db = getDB();
const session = getSession();
if (!session || session.role !== "customer") window.location.replace("../login.html");
const customer = getCurrentCustomer(db);
const container = document.getElementById("myBookingsContainer");
const summary = document.getElementById("customerSummary");
const bookings = customer ? db.bookings.filter(b => b.customer_id === customer.id).sort((a,b) => new Date(b.created_at) - new Date(a.created_at)) : [];
summary?.classList.remove("hidden");
document.getElementById("bookingCustomerName").textContent = customer?.full_name || session.full_name || "Customer";
document.getElementById("bookingCustomerPhone").textContent = customer?.phone || session.phone || "-";
document.getElementById("bookingCustomerCount").textContent = bookings.length;

const statusClass = status => ({pending:"booking-pending",confirmed:"booking-confirmed",active:"booking-active",completed:"booking-completed",cancelled:"booking-cancelled"}[status] || "");
const title = value => value ? value[0].toUpperCase() + value.slice(1) : "-";

if (!bookings.length) {
    container.innerHTML = `<div class="border border-white/10 bg-white/[0.04] rounded-2xl py-16 text-center"><h3 class="font-semibold text-white">No bookings yet</h3><p class="text-sm text-white/50 mt-2">Your bookings will appear here after you reserve a car.</p><a href="cars.html" class="inline-flex mt-5 bg-[#d7df00] text-black px-5 py-2.5 rounded-lg text-sm font-semibold">Browse Cars</a></div>`;
} else {
    container.innerHTML = bookings.map(b => {
        const car = db.cars.find(c => c.id === b.car_id);
        const image = resolveCarImage(car, "../images/");
        return `<article class="border border-white/10 bg-white/[0.04] rounded-2xl overflow-hidden"><div class="p-6 flex flex-col lg:flex-row gap-6">
            <div class="w-full lg:w-48 h-36 bg-black/30 rounded-xl overflow-hidden flex items-center justify-center">${image ? `<img src="${image}" class="w-full h-full object-cover">` : `<i class="fa-solid fa-car-side text-4xl text-white/20"></i>`}</div>
            <div class="flex-1"><div class="flex flex-col md:flex-row md:items-start justify-between gap-4"><div><p class="text-xs text-[#d7df00] font-semibold">${b.booking_code}</p><h3 class="text-xl font-bold text-white mt-1">${car?.brand || ""} ${car?.model || ""}</h3><p class="text-sm text-white/40 mt-1">${car?.plate_number || "-"}</p></div><span class="status-badge ${statusClass(b.booking_status)}">${title(b.booking_status)}</span></div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6"><div><p class="text-xs text-white/40">Pickup</p><p class="font-medium mt-1">${formatDate(b.pickup_date)}</p></div><div><p class="text-xs text-white/40">Return</p><p class="font-medium mt-1">${formatDate(b.return_date)}</p></div><div><p class="text-xs text-white/40">Duration</p><p class="font-medium mt-1">${b.total_days} days</p></div><div><p class="text-xs text-white/40">Total</p><p class="font-bold mt-1">RM ${Number(b.total_amount).toFixed(2)}</p></div></div>
            <div class="mt-6 pt-5 border-t border-white/10"><span class="text-xs text-white/40">Payment:</span><span class="text-sm font-medium ml-1">${title(b.payment_status)}</span></div></div>
        </div></article>`;
    }).join("");
}

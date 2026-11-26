const { getDB, formatMoney, formatDate } = window.RentGoStore;

const db = getDB();
const byId = id => document.getElementById(id);

byId("dashboardTotalVehicles").textContent = db.cars.length;
byId("dashboardAvailableVehicles").textContent = db.cars.filter(c => c.status === "available").length;
byId("dashboardActiveRentals").textContent = db.bookings.filter(b => b.booking_status === "active").length;

const now = new Date();
const monthPayments = db.payments.filter(p => {
    const d = new Date(p.payment_date);
    return p.payment_status === "paid" && d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
});
const monthlyRevenue = monthPayments.reduce((s,p)=>s+Number(p.amount||0),0);
byId("dashboardMonthlyRevenue").textContent = formatMoney(monthlyRevenue);
byId("dashboardRevenueMonth").textContent = now.toLocaleDateString("en-MY", {month:"long",year:"numeric"});

const statuses = ["available","reserved","rented","maintenance","inactive"];
statuses.forEach(status => {
    const label = status[0].toUpperCase()+status.slice(1);
    const count = db.cars.filter(c => c.status === status).length;
    const countEl = byId(`fleet${label}Count`);
    const barEl = byId(`fleet${label}Bar`);
    if (countEl) countEl.textContent = count;
    if (barEl) barEl.style.width = `${db.cars.length ? count/db.cars.length*100 : 0}%`;
});

const recent = [...db.bookings].sort((a,b)=>new Date(b.created_at)-new Date(a.created_at)).slice(0,5);
byId("dashboardRecentBookings").innerHTML = recent.map(b => {
    const customer = db.customers.find(c=>c.id===b.customer_id);
    const car = db.cars.find(c=>c.id===b.car_id);
    return `<tr><td class="px-6 py-4"><p class="font-semibold">${b.booking_code}</p><p class="text-xs opacity-50 mt-1">${formatDate((b.created_at||'').slice(0,10))}</p></td><td class="px-6 py-4">${customer?.full_name||'-'}</td><td class="px-6 py-4"><p>${car?.brand||''} ${car?.model||''}</p><p class="text-xs opacity-50">${car?.plate_number||'-'}</p></td><td class="px-6 py-4"><span class="status-badge">${b.booking_status}</span></td><td class="px-6 py-4 font-semibold">${formatMoney(b.total_amount)}</td></tr>`;
}).join("") || `<tr><td colspan="5" class="px-6 py-8 text-center opacity-50">No bookings yet.</td></tr>`;

const upcoming = db.bookings.filter(b => b.booking_status === "active" && new Date(`${b.return_date}T23:59:59`) >= new Date()).sort((a,b)=>new Date(a.return_date)-new Date(b.return_date)).slice(0,5);
byId("dashboardUpcomingReturns").innerHTML = upcoming.map(b => {
    const customer = db.customers.find(c=>c.id===b.customer_id), car=db.cars.find(c=>c.id===b.car_id);
    const days=Math.max(0,Math.ceil((new Date(`${b.return_date}T00:00:00`)-new Date(new Date().toDateString()))/86400000));
    return `<div class="p-5"><div class="flex justify-between gap-3"><div><p class="font-semibold">${car?.brand||''} ${car?.model||''}</p><p class="text-xs opacity-50 mt-1">${car?.plate_number||'-'}</p></div><span class="text-xs font-semibold text-[#d7df00]">${days===0?'Today':days===1?'Tomorrow':`${days} days`}</span></div><p class="text-sm opacity-50 mt-4">${customer?.full_name||'-'}</p><p class="text-sm opacity-50 mt-2">Return: ${formatDate(b.return_date)}</p></div>`;
}).join("") || `<div class="p-8 text-center opacity-50">No upcoming returns.</div>`;

if (window.Chart && byId("dashboardRevenueChart")) {
    const labels=[], data=[];
    for(let offset=5; offset>=0; offset--){
        const d=new Date(now.getFullYear(),now.getMonth()-offset,1);
        labels.push(d.toLocaleDateString("en-MY",{month:"short",year:"2-digit"}));
        data.push(db.payments.filter(p=>{const pd=new Date(p.payment_date);return p.payment_status==='paid'&&pd.getFullYear()===d.getFullYear()&&pd.getMonth()===d.getMonth()}).reduce((s,p)=>s+Number(p.amount),0));
    }
    new Chart(byId("dashboardRevenueChart"),{type:"line",data:{labels,datasets:[{data,label:"Revenue",borderColor:"#d7df00",backgroundColor:"rgba(215,223,0,.08)",fill:true,tension:.35,borderWidth:3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{callback:v=>`RM ${v}`}},x:{grid:{display:false}}}}});
}

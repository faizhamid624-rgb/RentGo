const { getDB, saveDB, nextId, formatMoney } = window.RentGoStore;

const body = document.getElementById("customerTableBody");
const search = document.getElementById("customerSearch");
const filter = document.getElementById("customerStatusFilter");
const modal = document.getElementById("customerModal");
const form = document.getElementById("customerForm");
const open = () => { modal.classList.remove("hidden"); modal.classList.add("flex"); };
const close = () => { modal.classList.add("hidden"); modal.classList.remove("flex"); form.reset(); };

document.getElementById("addCustomerBtn")?.addEventListener("click", open);
document.getElementById("closeCustomerModal")?.addEventListener("click", close);
document.getElementById("cancelCustomerBtn")?.addEventListener("click", close);
modal?.addEventListener("click", e => { if (e.target === modal) close(); });

function render() {
    const db = getDB(); const q = (search.value||"").toLowerCase(); const status=(filter.value||"").toLowerCase();
    const list = db.customers.filter(c => `${c.full_name} ${c.email} ${c.phone} ${c.identity_number}`.toLowerCase().includes(q) && (!status || c.status===status));
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    document.getElementById("customerTotalSummary").textContent = db.customers.length;
    document.getElementById("customerActiveSummary").textContent = db.customers.filter(c => c.status === "active").length;
    document.getElementById("customerNewSummary").textContent = db.customers.filter(c => { const d = new Date(c.created_at); return d.getMonth() === currentMonth && d.getFullYear() === currentYear; }).length;
    document.getElementById("customerRepeatSummary").textContent = db.customers.filter(c => db.bookings.filter(b => b.customer_id === c.id && b.booking_status !== "cancelled").length > 1).length;
    body.innerHTML = list.map(c => {
        const bookings = db.bookings.filter(b => b.customer_id === c.id && b.booking_status !== "cancelled");
        const spent = bookings.reduce((sum,b) => sum + db.payments.filter(p => p.booking_id===b.id && p.payment_status==="paid").reduce((s,p)=>s+Number(p.amount),0),0);
        return `<tr><td class="px-6 py-4"><p class="font-semibold">${c.full_name}</p><p class="text-xs opacity-50">${c.email || "-"}</p></td><td class="px-6 py-4">${c.phone}</td><td class="px-6 py-4">${c.identity_number || "-"}</td><td class="px-6 py-4">${bookings.length}</td><td class="px-6 py-4 font-semibold">${formatMoney(spent)}</td><td class="px-6 py-4"><span class="status-badge ${c.status==='active'?'status-available':''}">${c.status}</span></td><td class="px-6 py-4 text-right"><button data-delete-customer="${c.id}" class="text-red-400 text-sm">Delete</button></td></tr>`;
    }).join("") || `<tr><td colspan="7" class="px-6 py-10 text-center opacity-50">No customers found.</td></tr>`;
}

form?.addEventListener("submit", e => {
    e.preventDefault(); const db=getDB();
    const customer={id:nextId(db.customers),user_id:null,full_name:document.getElementById("customerName").value.trim(),email:document.getElementById("customerEmail").value.trim().toLowerCase(),phone:document.getElementById("customerPhone").value.trim(),identity_number:document.getElementById("customerIdentity").value.trim(),driving_license_number:document.getElementById("customerLicence").value.trim(),address:document.getElementById("customerAddress").value.trim(),status:document.getElementById("customerStatus").value.toLowerCase(),notes:document.getElementById("customerNotes").value.trim(),created_at:new Date().toISOString()};
    if (!customer.full_name || !customer.phone) return alert("Name and phone are required.");
    db.customers.push(customer); saveDB(db); close(); render();
});
body?.addEventListener("click", e => { const id=Number(e.target.dataset.deleteCustomer); if(!id)return; const db=getDB(); if(db.bookings.some(b=>b.customer_id===id)) return alert("This customer has booking records and cannot be deleted."); db.customers=db.customers.filter(c=>c.id!==id); saveDB(db); render(); });
search?.addEventListener("input",render); filter?.addEventListener("change",render); render();
